"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LocalTime } from "@/components/local-time";
import { Card, CardContent } from "@/components/ui/card";

const MONOGRAM = "F. K.";
const GIVEN_NAME = "FERHAT";
const FAMILY_NAME = "KARABULUT";
const EMAIL = "info@karabulut.ch";

/** Entrance choreography, in ms. One arrival, front to back. */
const CUE = {
  ruleTop: 80,
  ruleBottom: 140,
  registerStart: 180,
  registerEnd: 230,
  monogram: 260,
  monogramRing: 300,
  monogramLetter: 520,
  givenName: 545,
  givenNameStep: 40,
  wordmark: 580,
  wordmarkStep: 50,
  goldRule: 1000,
  lead: 1070,
  copy: 1140,
  contact: 1220,
  status: 1310,
  colophon: 1360,
  ping: 1380,
} as const;

export default function Home() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="brand-shell">
      <div className="brand-atmosphere a-bloom" aria-hidden="true" />
      <div className="brand-grain" aria-hidden="true" />

      <div className="flex min-h-[100dvh] flex-col px-5 py-[calc(1.75rem*var(--r))] sm:px-8 md:min-h-0 md:h-full lg:px-18 2xl:px-30">
        <header className="flex flex-col gap-[calc(0.875rem*var(--r))]">
          <div className="flex items-center justify-between gap-4">
            <p
              className="register-text a-rise flex items-center gap-2.5"
              style={{ animationDelay: `${CUE.registerStart}ms` }}
            >
              <span
                className="size-1.5 flex-none rounded-full bg-gold"
                aria-hidden="true"
              />
              karabulut.ch
            </p>

            <div className="flex items-center gap-1.5 min-[400px]:gap-2 sm:gap-3">
              <p
                className="register-text a-rise"
                style={{ animationDelay: `${CUE.registerEnd}ms` }}
              >
                {t.city} <span aria-hidden="true">·</span>{" "}
                <LocalTime aria-label={t.localTime} />
              </p>

              <LanguageSwitcher
                className="a-rise"
                style={{ animationDelay: `${CUE.registerEnd}ms` }}
              />
            </div>
          </div>

          <div
            className="register-rule a-rule"
            style={{ animationDelay: `${CUE.ruleTop}ms` }}
            aria-hidden="true"
          />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center pb-[3vh] pt-[calc(3rem*var(--r))] text-center md:pb-[5vh] md:pt-0">
          <span
            className="monogram a-rise"
            style={{ animationDelay: `${CUE.monogram}ms` }}
            aria-hidden="true"
          >
            <svg className="monogram-ring" viewBox="0 0 48 48">
              <circle
                className="a-draw"
                cx="24"
                cy="24"
                r="23"
                style={{ animationDelay: `${CUE.monogramRing}ms` }}
              />
            </svg>
            <span
              className="monogram-letter a-rise"
              style={{ animationDelay: `${CUE.monogramLetter}ms` }}
            >
              {MONOGRAM}
            </span>
          </span>

          <h1 className="wordmark">
            <span className="sr-only">
              {GIVEN_NAME} {FAMILY_NAME}
            </span>

            <span className="wordmark-given" aria-hidden="true">
              {Array.from(GIVEN_NAME).map((letter, index) => (
                <span
                  key={`given-${letter}-${index}`}
                  className="wordmark-letter a-glyph"
                  style={{
                    animationDelay: `${CUE.givenName + index * CUE.givenNameStep}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>

            <span className="wordmark-family" aria-hidden="true">
              {Array.from(FAMILY_NAME).map((letter, index) => (
                <span
                  key={`family-${letter}-${index}`}
                  className="wordmark-letter a-glyph"
                  style={{
                    animationDelay: `${CUE.wordmark + index * CUE.wordmarkStep}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <span
            className="gold-rule a-rule"
            style={{ animationDelay: `${CUE.goldRule}ms` }}
            aria-hidden="true"
          />

          <p
            className="lead a-rise"
            style={{ animationDelay: `${CUE.lead}ms` }}
          >
            {t.lead}
          </p>

          <p className="copy a-rise" style={{ animationDelay: `${CUE.copy}ms` }}>
            {t.copy}
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="contact a-rise group text-left"
            style={{ animationDelay: `${CUE.contact}ms` }}
            aria-label={t.contactAction(EMAIL)}
          >
            <Card className="gap-0 ring-approval/25 transition-[background-color,box-shadow,transform] duration-200 ease-out [--card-spacing:--spacing(5)] group-hover:-translate-y-px group-hover:bg-[var(--mint-lift)] group-hover:ring-approval/60 sm:[--card-spacing:--spacing(6)]">
              <CardContent className="flex flex-col gap-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-emerald">
                  {t.contactEyebrow}
                </span>
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-base leading-none text-ink">
                    {EMAIL}
                  </span>
                  <ArrowUpRight
                    className="size-4 flex-none text-emerald transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </CardContent>
            </Card>
          </a>

          <p
            className="status a-rise"
            style={{ animationDelay: `${CUE.status}ms` }}
          >
            <span className="status-dot" aria-hidden="true">
              <span
                className="status-ping a-ping"
                style={{ animationDelay: `${CUE.ping}ms` }}
              />
            </span>
            {t.statusDomain}
            <span className="text-sage-muted" aria-hidden="true">
              ·
            </span>
            {t.statusContact}
          </p>
        </main>

        <footer className="flex flex-col gap-[calc(0.875rem*var(--r))]">
          <div
            className="register-rule a-rule"
            style={{ animationDelay: `${CUE.ruleBottom}ms` }}
            aria-hidden="true"
          />

          <div
            className="a-rise flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            style={{ animationDelay: `${CUE.colophon}ms` }}
          >
            <address className="register-text not-italic">
              Ferhat Karabulut <span aria-hidden="true">·</span> {t.origin}
            </address>

            <p className="register-text">
              © {year} Ferhat Karabulut. {t.rights}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
