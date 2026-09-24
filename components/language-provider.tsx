"use client";

import * as React from "react";

import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  dictionaries,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

/* ---------------------------------------------------------------------------
   Locale store.

   The saved preference is an external store, so it is read through
   useSyncExternalStore rather than mirrored into state: the server pass and the
   hydration pass both see DEFAULT_LOCALE, React swaps in the stored value right
   after hydration, and no render is wasted reconciling a mismatch. A tab-level
   singleton also keeps every consumer — and every other tab — in step.
--------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

/** Lazily seeded from localStorage on the first client read. */
let currentLocale: Locale | null = null;

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    // Private mode or blocked storage: fall back to the default locale.
    return null;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Another tab changed the preference; re-seed and re-render.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== LOCALE_STORAGE_KEY) return;
    currentLocale = isLocale(event.newValue) ? event.newValue : DEFAULT_LOCALE;
    emit();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Locale {
  currentLocale ??= readStoredLocale() ?? DEFAULT_LOCALE;
  return currentLocale;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function writeLocale(next: Locale) {
  if (currentLocale === next) return;

  currentLocale = next;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  } catch {
    // Preference simply does not persist; the swap still happens.
  }

  emit();
}

/* ------------------------------------------------------------------------- */

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Dictionary for the active locale. */
  t: Dictionary;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Keep the document language in step for screen readers and hyphenation.
  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo<LanguageContextValue>(
    () => ({ locale, setLocale: writeLocale, t: dictionaries[locale] }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a <LanguageProvider>.");
  }

  return context;
}

export { LanguageProvider, useLanguage };
