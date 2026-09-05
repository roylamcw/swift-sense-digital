import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  summary: string;
  lastUpdated: string;
  children: ReactNode;
};

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-white/75 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-blue-300">
      {children}
    </ul>
  );
}

export default function LegalPageShell({
  eyebrow,
  title,
  summary,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[#0a1628] font-sans text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0a1628]"
      >
        Skip to main content
      </a>

      <header className="border-b border-white/10 bg-[#0a1628]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            aria-label="Swift Sense Digital home"
          >
            Swift Sense <span className="text-blue-300">Digital</span>
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
          >
            Back to website
          </Link>
        </div>
      </header>

      <main id="main-content" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
            {summary}
          </p>
          <p className="mt-4 text-sm text-white/55">Last updated: {lastUpdated}</p>

          <div className="mt-12 space-y-10 rounded-2xl border border-white/10 bg-[#0d1f35] p-6 shadow-2xl shadow-blue-950/20 md:p-10">
            {children}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#0d1f35] px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Swift Sense Digital.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal navigation">
            <Link className="hover:text-white" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white" href="/data-deletion">
              Data deletion
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
