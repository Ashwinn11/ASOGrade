import type { Metadata } from "next";
import Legal from "../legal";

export const metadata: Metadata = {
  title: "Privacy Policy — ASOGrade",
  description: "ASOGrade's privacy policy. Understand exactly what data we collect, how it's used, who processes it, and how to request deletion — written in plain English.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function Privacy() {
  return (
    <Legal title="Privacy Policy" updated="26 August 2026">
      <p>
        ASOGrade is a keyword research tool for the App Store. This page describes exactly what it
        stores, why it stores it, who can access it, and how you can have it removed. It is written
        to be read, not to be survived.
      </p>

      <h2>What we collect and why</h2>
      <p>We collect only what is needed to run the service. Nothing more.</p>
      <ul>
        <li>
          <b>Your email address and Google profile info.</b> When you sign in with Google, we
          receive your email address, name, and avatar from Google and use them to identify your
          account and tie your keyword list to you. We do not send marketing emails unless you
          explicitly opt in. Authentication is handled by Supabase.
        </li>
        <li>
          <b>The keywords you look up.</b> Stored against your account so your list persists
          between sessions and across storefronts. You own this list — you can delete individual
          keywords at any time inside the app, or request full deletion by email.
        </li>
        <li>
          <b>Keyword scores.</b> Popularity, difficulty, and competing-app counts are cached per
          keyword and storefront. This cache is shared across all accounts and contains no personal
          information — it is simply a performance optimisation so a keyword scored yesterday
          does not need to be re-fetched today.
        </li>
        <li>
          <b>Basic request logs.</b> Our hosting provider (Vercel) retains standard server logs
          (IP address, timestamp, path, response code) for a short period for security and
          debugging purposes. These logs are not analysed for marketing or advertising.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <ul>
        <li>No payment card details. If billing is added, card data goes directly to the payment processor (Stripe) and never reaches our servers.</li>
        <li>No passwords — sign-in is exclusively via Google OAuth. We never see, receive, or store a password.</li>
        <li>No advertising, analytics, or cross-site tracking cookies. The only cookie is the one Supabase sets to keep you signed in.</li>
        <li>No selling, renting, or sharing of your keyword list or email address with third parties for commercial purposes.</li>
        <li>No profiling or automated decision-making that produces legal or similarly significant effects.</li>
      </ul>

      <h2>Who processes your data</h2>
      <p>Your data passes through a small number of carefully chosen sub-processors:</p>
      <ul>
        <li><b>Vercel</b> — hosting, CDN, and edge request logs. Data centres in the US and EU.</li>
        <li><b>Supabase</b> — relational database and authentication. Your email and keyword list live here. Supabase is SOC 2 Type II certified.</li>
        <li>
          <b>Apple</b> — public App Store lookups are made to resolve app names and icons when you
          analyse a competitor. These requests contain an App Store app ID, never anything that
          identifies you.
        </li>
      </ul>
      <p>
        Keyword scores are sourced through a licensed third-party desktop tool running on hardware
        we control. It receives a keyword string and a storefront code — nothing that identifies you
        or your account.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        ASOGrade uses a single session cookie set by Supabase to keep you signed in. No third-party
        advertising cookies are set. No analytics scripts (Google Analytics, Mixpanel, etc.) are
        loaded. If you block all cookies, you will not be able to sign in, but the public marketing
        pages will still work.
      </p>

      <h2>Data transfers</h2>
      <p>
        ASOGrade is incorporated and operated from India. Supabase and Vercel may store data in the
        United States or European Union depending on region configuration. By using ASOGrade you
        acknowledge that your data may be transferred to and processed in these jurisdictions. We
        apply standard contractual clauses and rely on sub-processors that maintain adequate
        protection under applicable data protection law.
      </p>

      <h2>How long we keep your data</h2>
      <p>
        Your keyword list and account remain active until you delete them or ask us to close your
        account. Cached keyword scores are refreshed on a rolling daily basis and are not personal
        data. Server logs are retained by Vercel for up to 30 days. Ask us to delete your account
        and everything tied to your email — keywords, scores linked to your user ID, and the account
        record itself — is permanently removed within 30 days.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you are located, you may have rights under applicable law including:
      </p>
      <ul>
        <li><b>Access:</b> Request a copy of the personal data we hold about you.</li>
        <li><b>Correction:</b> Ask us to fix inaccurate data.</li>
        <li><b>Deletion:</b> Request that your account and associated data be permanently erased.</li>
        <li><b>Portability:</b> Ask for your keyword list in a machine-readable format (CSV).</li>
        <li><b>Objection:</b> Object to processing in certain circumstances.</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:support@asograde.com">support@asograde.com</a> from your account address.
        We will respond within 30 days.
      </p>

      <h2>Children</h2>
      <p>
        ASOGrade is not directed at children under the age of 13. We do not knowingly collect
        personal information from anyone under 13. If you believe a child has provided us with
        personal data, contact us and we will delete it promptly.
      </p>

      <h2>Security</h2>
      <p>
        All data is transmitted over HTTPS. Supabase encrypts data at rest. We follow
        industry-standard practices including access controls, least-privilege principles, and
        dependency audits. No system is perfectly secure; if you discover a vulnerability, please
        disclose it responsibly to{" "}
        <a href="mailto:support@asograde.com">support@asograde.com</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes in a way that affects what we collect or how we use it, the date at
        the top of this page updates and all account holders are notified by email at least 14 days
        before the change takes effect. Minor clarifications (grammar, formatting) will not trigger
        a notification.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, deletion requests, or data access requests:{" "}
        <a href="mailto:support@asograde.com">support@asograde.com</a>
      </p>
    </Legal>
  );
}
