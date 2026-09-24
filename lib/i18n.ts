/**
 * Trilingual copy for the coming-soon page.
 *
 * No routing and no i18n library: a single page with no navigable sub-routes
 * gains nothing from locale segments, and the brief calls for an instant,
 * reload-free swap persisted in localStorage. The locale therefore lives in
 * React state (see `components/language-provider.tsx`) and the dictionaries
 * below are the single source of truth for every visible string.
 *
 * Brand tokens — the KARABULUT wordmark, karabulut.ch, the email address —
 * are deliberately absent: they read the same in all three languages.
 */

/** Menu order, EN · DE · FR. */
export const LOCALES = ["en", "de", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

export const LOCALE_STORAGE_KEY = "karabulut.locale";

/** Code shown in the register, endonym shown in the menu. */
export const LOCALE_META: Record<Locale, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  de: { code: "DE", name: "Deutsch" },
  fr: { code: "FR", name: "Français" },
};

export type Dictionary = {
  /** Top register, next to the live Zürich time. */
  city: string;
  localTime: string;
  /** Hero. */
  lead: string;
  copy: string;
  /** Contact card. */
  contactEyebrow: string;
  contactAction: (email: string) => string;
  /** Status line under the card. */
  statusDomain: string;
  statusContact: string;
  /** Bottom register. */
  origin: string;
  rights: string;
  /** Language switcher. */
  language: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    city: "Zurich",
    localTime: "Local time in Zurich",
    lead: "New website in preparation.",
    copy: "This website is currently being redesigned. For enquiries, reach Ferhat Karabulut directly by email.",
    contactEyebrow: "Direct contact",
    contactAction: (email) => `Send an email to ${email}`,
    statusDomain: "Domain active",
    statusContact: "Contact available",
    origin: "Zurich, Switzerland",
    rights: "All rights reserved.",
    language: "Language",
  },
  de: {
    city: "Zürich",
    localTime: "Ortszeit in Zürich",
    lead: "Neue Website in Vorbereitung.",
    copy: "Diese Website wird derzeit neu gestaltet. Für Anfragen erreichen Sie Ferhat Karabulut direkt per E-Mail.",
    contactEyebrow: "Direkter Kontakt",
    contactAction: (email) => `E-Mail an ${email} senden`,
    statusDomain: "Domain aktiv",
    statusContact: "Kontakt verfügbar",
    origin: "Zürich, Schweiz",
    rights: "Alle Rechte vorbehalten.",
    language: "Sprache",
  },
  fr: {
    city: "Zurich",
    localTime: "Heure locale à Zurich",
    lead: "Nouveau site web en préparation.",
    copy: "Ce site est en cours de refonte. Pour toute demande, contactez Ferhat Karabulut directement par e-mail.",
    contactEyebrow: "Contact direct",
    contactAction: (email) => `Envoyer un e-mail à ${email}`,
    statusDomain: "Domaine actif",
    statusContact: "Contact disponible",
    origin: "Zurich, Suisse",
    rights: "Tous droits réservés.",
    language: "Langue",
  },
};

/** Narrows an unknown value — a localStorage read — to a supported locale. */
export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
