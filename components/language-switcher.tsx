"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { useLanguage } from "@/components/language-provider";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Minimal EN · DE · FR selector for the top register.
 *
 * Hand-rolled rather than pulled from a component library: the register strip
 * needs a bare mono trigger, not a boxed control, and the menu is three static
 * options. Menu semantics (menuitemradio) fit a one-of-three choice and let the
 * options stay real buttons.
 */
function LanguageSwitcher({ className, ...props }: React.ComponentProps<"div">) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = React.useId();

  const close = React.useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const openAt = React.useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  // Dismiss on an outside pointer or Escape. The menu is positioned against
  // the trigger, so it travels with it and needs no scroll handling.
  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Roving focus follows the active option while the menu is open.
  React.useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const select = (next: Locale) => {
    setLocale(next);
    close();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openAt(event.key === "ArrowDown" ? 0 : LOCALES.length - 1);
    }
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % LOCALES.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + LOCALES.length) % LOCALES.length,
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(LOCALES.length - 1);
        break;
      case "Tab":
        close();
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("lang", className)} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="lang-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`${t.language}: ${LOCALE_META[locale].name}`}
        onClick={() => (open ? close(false) : openAt(LOCALES.indexOf(locale)))}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="lang-code">{LOCALE_META[locale].code}</span>
        <ChevronDown className="lang-chevron" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={t.language}
          className="lang-menu"
          onKeyDown={onMenuKeyDown}
        >
          {LOCALES.map((option, index) => (
            <button
              key={option}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={option === locale}
              tabIndex={index === activeIndex ? 0 : -1}
              className="lang-option"
              lang={option}
              onClick={() => select(option)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="lang-option-name">
                {LOCALE_META[option].name}
              </span>
              <span className="lang-option-code" aria-hidden="true">
                {LOCALE_META[option].code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { LanguageSwitcher };
