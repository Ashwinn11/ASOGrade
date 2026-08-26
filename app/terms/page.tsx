import type { Metadata } from "next";
import Legal from "../legal";

export const metadata: Metadata = {
  title: "Terms of Service — ASOGrade",
  description: "ASOGrade's terms of service. Understand your rights, responsibilities, fair use rules, and what to expect from the service — written in plain English.",
  alternates: {
    canonical: "/terms",
  },
};

export default function Terms() {
  return (
    <Legal title="Terms of Service" updated="26 August 2026">
      <p>
        By using ASOGrade you agree to what follows. If you do not agree, please do not use the
        service. These terms are written to be clear and fair — if something seems unreasonable,
        email us and we will explain the reasoning.
      </p>

      <h2>What ASOGrade is</h2>
      <p>
        ASOGrade scores App Store keywords for popularity, ranking difficulty, and the number of
        competing apps, storefront by storefront, across 109 App Store markets. It is a research and
        analysis tool. It does not submit anything to the App Store on your behalf, does not modify
        your app&apos;s metadata, and does not interact with Apple&apos;s developer tools in any way.
      </p>

      <h2>Who can use ASOGrade</h2>
      <p>
        ASOGrade is intended for app developers, indie studios, marketing professionals, and growth
        teams conducting App Store keyword research. You must be at least 13 years old to create an
        account. If you are using ASOGrade on behalf of a company, you represent that you have the
        authority to bind that company to these terms.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for all activity that occurs under your account and for keeping your
        email address accessible and secure. One account may be used by one person or one team
        internally. You may not share login credentials with people outside your team, resell
        account access, or use a single account on behalf of multiple unrelated companies.
      </p>
      <p>
        If you believe your account has been compromised, contact us immediately at{" "}
        <a href="mailto:support@asograde.com">support@asograde.com</a>.
      </p>

      <h2>Acceptable use</h2>
      <p>You may use ASOGrade to:</p>
      <ul>
        <li>Research keywords for apps you own, develop, or market professionally.</li>
        <li>Analyse competitor keyword strategies as part of legitimate market research.</li>
        <li>Export your keyword list for use in your own ASO workflow.</li>
      </ul>
      <p>You may not:</p>
      <ul>
        <li>Automate, scrape, or bulk-extract data from the service using scripts, bots, or crawlers.</li>
        <li>Resell, redistribute, or sublicense keyword data as a standalone feed or product.</li>
        <li>Integrate ASOGrade&apos;s data into another product or service offered to third parties without written permission.</li>
        <li>Attempt to reverse-engineer, decompile, or circumvent the service&apos;s rate limits or authentication.</li>
        <li>Use the service in any way that violates applicable law or infringes on the rights of others.</li>
      </ul>
      <p>
        We may rate-limit, suspend, or terminate accounts that breach these rules, with or without
        prior notice depending on the severity.
      </p>

      <h2>Data accuracy and limitations</h2>
      <p>
        Keyword scores — popularity, difficulty, and competing-app counts — are estimates derived
        from third-party data sources and Apple Search Ads signals. They change over time as the App
        Store evolves. All data is provided as-is, without warranty of accuracy or completeness.
      </p>
      <p>
        App Store ranking outcomes depend on many factors beyond keywords, including app quality,
        ratings, localisation, update cadence, and Apple&apos;s own algorithmic decisions. Nothing
        in ASOGrade constitutes a guarantee of ranking improvement. Decisions you make using this
        data are your own responsibility.
      </p>

      <h2>Service availability</h2>
      <p>
        Keywords that have been previously scored are served from our own cache and are available
        continuously. Scoring a keyword for the first time requires a call to an upstream provider,
        which can occasionally be briefly unavailable. When this happens, the app tells you plainly
        and fills the score in once the upstream recovers. We target high availability but do not
        guarantee uninterrupted access.
      </p>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the service at any time
        with reasonable notice. We will not discontinue the service without giving free-plan users
        at least 30 days&apos; notice and paid users at least 60 days&apos; notice.
      </p>

      <h2>Payments and billing</h2>
      <p>
        Paid plans, when active, are billed in advance for the stated period (monthly or annual).
        All prices are listed in USD and are exclusive of any applicable taxes, which are your
        responsibility. Charges already incurred are non-refundable except where required by law.
      </p>
      <p>
        You may cancel your paid plan at any time. Cancellation takes effect at the end of the
        current billing period; you retain access until then. Prices may change with at least
        30 days&apos; notice and will never apply retroactively to an already-paid period.
      </p>

      <h2>Intellectual property</h2>
      <p>
        ASOGrade and its associated software, design, trademarks, and content are owned by or
        licensed to ASOGrade. Nothing in these terms transfers ownership of any intellectual
        property to you. You retain full ownership of the keyword lists you create using the
        service.
      </p>

      <h2>Ending your use</h2>
      <p>
        You may stop using ASOGrade at any time. To delete your account and all associated data,
        email <a href="mailto:support@asograde.com">support@asograde.com</a> from your account
        address. Deletion is completed within 30 days. You may export your keyword list before
        requesting deletion — just ask.
      </p>
      <p>
        We may suspend or terminate your account for material breach of these terms, non-payment,
        or conduct that harms other users or the service. Where possible, we will give you notice
        and an opportunity to remedy the breach before terminating.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, ASOGrade is not liable for indirect,
        incidental, consequential, or punitive damages, including lost revenue, lost rankings, or
        lost data arising from your use of or inability to use the service. Our total liability for
        any claim arising under these terms is limited to the amount you paid us in the twelve
        months preceding the claim.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes that cannot be resolved
        informally will be subject to the exclusive jurisdiction of the courts of India. If you are
        a consumer in the EU or UK, mandatory consumer protection rights in your jurisdiction
        apply in addition to these terms.
      </p>

      <h2>Not affiliated with Apple</h2>
      <p>
        ASOGrade is an independent product and is not endorsed by, affiliated with, or sponsored
        by Apple Inc. &ldquo;App Store&rdquo; and &ldquo;Apple&rdquo; are registered trademarks of
        Apple Inc. Use of these terms is for descriptive purposes only.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. For material changes, we will notify account
        holders by email at least 14 days before the new terms take effect. Continued use of
        ASOGrade after the effective date constitutes acceptance. If you disagree with the updated
        terms, you may terminate your account before they take effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:support@asograde.com">support@asograde.com</a>
      </p>
    </Legal>
  );
}
