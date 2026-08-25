import type { Metadata } from "next";
import Legal from "../legal";

export const metadata: Metadata = {
  title: "Privacy — ASOKit",
  description: "What ASOKit stores, why, and how to have it deleted.",
};

export default function Privacy() {
  return (
    <Legal title="Privacy" updated="26 August 2026">
      <p>
        ASOKit is a keyword research tool. This page describes exactly what it
        stores and why. It is written to be read, not to be survived.
      </p>

      <h2>What we store</h2>
      <p>Three things, and nothing else:</p>
      <ul>
        <li>
          <b>Your email address.</b> Used to sign you in and to tie your keyword
          list to you. Authentication is handled by Supabase.
        </li>
        <li>
          <b>The keywords you look up.</b> Stored against your account so your
          list is still there next time, and so you can switch storefronts
          without re-entering anything.
        </li>
        <li>
          <b>Keyword scores.</b> Popularity, difficulty and app counts, cached
          per keyword and storefront. This cache is shared across all accounts
          and is not linked to any user — a keyword someone looked up yesterday
          is simply already scored.
        </li>
      </ul>

      <h2>What we do not store</h2>
      <ul>
        <li>No payment card details. If and when billing is added, card data
          goes directly to the payment processor and never reaches our servers.</li>
        <li>No passwords, unless you set one — sign-in is by email link.</li>
        <li>No advertising or cross-site tracking cookies. The only cookie is
          the one that keeps you signed in.</li>
        <li>No selling or sharing of your keyword list with anyone.</li>
      </ul>

      <h2>Who processes it</h2>
      <ul>
        <li><b>Vercel</b> — hosting and request logs.</li>
        <li><b>Supabase</b> — the database and authentication.</li>
        <li><b>Apple</b> — public App Store lookups are made to resolve app
          names and icons. These requests contain an App Store ID, never
          anything about you.</li>
      </ul>
      <p>
        Keyword scores are sourced through a licensed third-party desktop tool
        running on hardware we control. Your account identity is never sent to
        it — it receives a keyword and a storefront, nothing more.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Your keyword list lives until you delete it or ask us to close your
        account. Cached scores are refreshed on a daily cadence and are not
        personal data. Ask us to delete your account and everything tied to your
        email goes with it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can delete individual keywords from inside the app at any time. For
        a full export or account deletion, email{" "}
        <a href="mailto:support@asokit.app">support@asokit.app</a> from your
        account address and it will be handled.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes in a way that affects what we collect, the date
        at the top of this page changes and account holders are emailed.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:support@asokit.app">support@asokit.app</a>
      </p>
    </Legal>
  );
}
