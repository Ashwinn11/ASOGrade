import type { Metadata } from "next";
import Legal from "../legal";

export const metadata: Metadata = {
  title: "Terms — ASOGrade",
  description: "The terms you agree to by using ASOGrade.",
};

export default function Terms() {
  return (
    <Legal title="Terms of Service" updated="26 August 2026">
      <p>
        By using ASOGrade you agree to what follows. If you do not, please do not
        use the service.
      </p>

      <h2>What ASOGrade is</h2>
      <p>
        ASOGrade scores App Store keywords for popularity, ranking difficulty and
        the number of competing apps, storefront by storefront. It is a research
        aid. It does not submit anything to the App Store on your behalf and it
        does not change your app&apos;s metadata.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for what happens under your account and for keeping
        access to your email address secure. One account is for one person or
        team; please do not share credentials or resell access.
      </p>

      <h2>Fair use</h2>
      <p>
        Keyword data is fetched from a rate-limited upstream source. You may look
        up keywords for your own products and research. You may not scrape the
        service, automate bulk extraction, resell the data as your own feed, or
        run it through another product as a data source. We may rate-limit or
        suspend accounts that do.
      </p>

      <h2>Accuracy</h2>
      <p>
        Scores are estimates derived from third-party data and change over time.
        They are provided as-is. Ranking outcomes depend on far more than
        keywords, and nothing here is a guarantee of App Store performance.
        Decisions you make with this data are yours.
      </p>

      <h2>Availability</h2>
      <p>
        Already-scored keywords are served from our own cache and stay available
        continuously. Scoring a keyword for the first time depends on an upstream
        provider, which can be briefly unavailable; when it is, the app tells you
        plainly and fills the score in once it returns. We do not promise
        uninterrupted service.
      </p>

      <h2>Payment</h2>
      <p>
        Paid plans, when active, are billed in advance for the stated period.
        Charges already incurred are not refundable except where the law requires
        it. You can cancel at any time and keep access until the end of the paid
        period. Prices can change with notice, never retroactively.
      </p>

      <h2>Ending it</h2>
      <p>
        You may stop using ASOGrade and request deletion at any time. We may
        suspend an account for breach of these terms, non-payment, or abuse of
        the service. Your keyword list can be exported before deletion — just
        ask.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, ASOGrade is not liable for indirect or
        consequential loss, including lost revenue or rankings. Any liability is
        limited to what you paid in the twelve months before the claim.
      </p>

      <h2>Not affiliated with Apple</h2>
      <p>
        ASOGrade is an independent product. App Store and Apple are trademarks of
        Apple Inc. ASOGrade is not endorsed by or affiliated with Apple Inc.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:support@asograde.com">support@asograde.com</a>
      </p>
    </Legal>
  );
}
