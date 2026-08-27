import type { ReactNode } from "react";
import SiteHeader from "./ui/SiteHeader";
import SiteFooter from "./ui/SiteFooter";
import Button from "./ui/Button";
import Prose from "./ui/Prose";
import { Close } from "./components/icons";

/** Shared shell for the privacy and terms pages. */
export default function Legal({ title, updated, children }:
  { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader
        actions={
          <Button variant="icon" iconOnly size="sm" href="/" aria-label="Close and return to ASOGrade">
            <Close size={16} />
          </Button>
        }
      />

      <main className="mx-auto mt-10 w-[min(100%-1.5rem,48rem)] min-w-0 flex-1">
        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink">
          {title}
        </h1>
        <p className="mt-2 text-xs text-faint">Last updated {updated}</p>
        <Prose className="mt-8">{children}</Prose>
      </main>

      <SiteFooter />
    </div>
  );
}
