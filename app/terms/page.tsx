import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f4f4f5]">
      {/* Background light streaks */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[-10%] h-[120%] w-[6rem] rounded-full bg-gradient-to-b from-slate-300/20 via-blue-200/10 to-transparent blur-3xl" />
        <div className="absolute left-[28%] top-[-5%] h-[110%] w-[5rem] rounded-full bg-gradient-to-b from-slate-200/30 via-slate-300/15 to-transparent blur-[80px]" />
        <div className="absolute right-[28%] top-[-8%] h-[115%] w-[7rem] rounded-full bg-gradient-to-b from-blue-200/40 via-slate-300/25 to-transparent blur-[90px]" />
        <div className="absolute right-[12%] top-[-5%] h-[120%] w-[9rem] rounded-full bg-gradient-to-b from-slate-300/50 via-blue-200/30 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b7280] transition-colors duration-150 hover:text-[#0d1117]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <h1 className="mt-8 text-3xl sm:text-4xl font-bold text-[#0d1117] tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-[#6b7280]">
          Effective Date: April 10, 2026 &middot; Last Updated: April 10, 2026
        </p>

        {/* Terms body */}
        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#374151]">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">1. Acceptance of These Terms</h2>
            <p className="mt-3">
              Welcome to <strong>Invest and Reflect</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
              Invest and Reflect website, application, and related services (collectively, the
              &ldquo;Service&rdquo;).
            </p>
            <p className="mt-3">
              By accessing or using the Service, you agree to be bound by these Terms. If you do not
              agree to these Terms, do not use the Service.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">2. Eligibility</h2>
            <p className="mt-3">You must be at least 13 years old to use the Service.</p>
            <p className="mt-3">By using the Service, you represent and warrant that:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You are legally able to enter into these Terms</li>
              <li>The information you provide is accurate</li>
              <li>
                You will use the Service only in compliance with applicable law and these Terms
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">3. Description of the Service</h2>
            <p className="mt-3">
              Invest and Reflect is a personal investment journaling web application that allows
              users to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Sign in using Google OAuth</li>
              <li>Create and manage journal entries</li>
              <li>Record personal reflections, market sentiment, and investment-related notes</li>
              <li>Track self-reported buy, sell, or hold decisions</li>
              <li>Opt in to receive reminder emails related to journal activity</li>
            </ul>
            <p className="mt-3">
              The Service is intended for personal organization, reflection, and journaling
              purposes.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">
              4. No Financial, Investment, or Legal Advice
            </h2>
            <p className="mt-3">Invest and Reflect is a journaling and reflection tool only.</p>
            <p className="mt-3">
              The Service does not provide financial advice, investment advice, legal advice, tax
              advice, brokerage services, or fiduciary services. Any information stored, displayed,
              or sent through the Service is for personal informational use only and should not be
              treated as professional advice or a recommendation to buy, sell, or hold any security
              or asset.
            </p>
            <p className="mt-3">
              You are solely responsible for your own financial and investment decisions.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">
              5. Account Registration and Access
            </h2>
            <p className="mt-3">
              To use certain features of the Service, you may be required to sign in using Google
              OAuth.
            </p>
            <p className="mt-3">You agree to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Maintain accurate account information</li>
              <li>Keep your account access secure</li>
              <li>
                Notify us promptly if you believe your account has been accessed without
                authorization
              </li>
            </ul>
            <p className="mt-3">
              You are responsible for all activities that occur under your account to the extent
              permitted by law.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">6. User Content</h2>
            <p className="mt-3">
              &ldquo;User Content&rdquo; means any information, text, journal entries, notes,
              reflections, or other content that you submit, upload, store, or otherwise make
              available through the Service.
            </p>
            <p className="mt-3">You retain ownership of your User Content.</p>
            <p className="mt-3">
              By submitting User Content through the Service, you grant us a limited, non-exclusive,
              revocable license to host, store, process, display, and transmit that content solely
              as necessary to operate, maintain, and improve the Service.
            </p>
            <p className="mt-3">
              You are solely responsible for your User Content and represent that:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You have the rights necessary to submit it</li>
              <li>It does not violate any law or third-party rights</li>
              <li>It does not contain malicious code or harmful material</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">7. Acceptable Use</h2>
            <p className="mt-3">You agree not to use the Service to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the rights of others</li>
              <li>Upload or transmit viruses, malware, or harmful code</li>
              <li>Attempt to gain unauthorized access to accounts, systems, or networks</li>
              <li>Interfere with the operation or security of the Service</li>
              <li>
                Scrape, copy, reverse engineer, or exploit the Service except as permitted by law
              </li>
              <li>Use the Service for spam, fraud, abusive conduct, or deceptive activity</li>
              <li>
                Upload unlawful, defamatory, threatening, harassing, or otherwise harmful content
              </li>
            </ul>
            <p className="mt-3">
              We may suspend or terminate access to the Service if we determine that your use
              violates these Terms or creates risk to the Service, other users, or third parties.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">8. Reminder Emails</h2>
            <p className="mt-3">
              If you choose to enable reminder emails, we may send service-related reminder emails
              based on your selected settings.
            </p>
            <p className="mt-3">
              These reminder emails are not marketing communications. You may disable reminder
              emails through the Service settings if that functionality is available.
            </p>
            <p className="mt-3">
              We are not responsible for delayed, blocked, filtered, or undelivered emails caused by
              email providers, technical failures, or incorrect account information.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">9. Third-Party Services</h2>
            <p className="mt-3">
              The Service may rely on third-party providers, including but not limited to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Google</strong> for authentication
              </li>
              <li>
                <strong>Supabase</strong> for backend and database infrastructure
              </li>
              <li>
                <strong>Vercel</strong> for hosting and deployment
              </li>
              <li>
                <strong>Resend</strong> for email delivery
              </li>
            </ul>
            <p className="mt-3">
              Your use of third-party services may also be subject to those third parties&rsquo;
              terms, policies, and practices. We are not responsible for third-party services or
              their availability, security, or performance.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">10. Intellectual Property</h2>
            <p className="mt-3">
              The Service, including its design, software, branding, text, graphics, logos, and
              other non-user content, is owned by or licensed to Invest and Reflect and is protected
              by applicable intellectual property laws.
            </p>
            <p className="mt-3">
              Except as expressly permitted in these Terms, you may not copy, modify, distribute,
              sell, lease, reverse engineer, or create derivative works based on the Service.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">11. Privacy</h2>
            <p className="mt-3">
              Your use of the Service is also governed by our{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#0d1117] underline underline-offset-2 transition-colors duration-150 hover:text-[#374151]"
              >
                Privacy Policy
              </Link>
              , which explains how we collect, use, and protect your information.
            </p>
            <p className="mt-3">
              By using the Service, you acknowledge that you have reviewed the Privacy Policy.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">12. Account Deletion</h2>
            <p className="mt-3">
              You may request deletion of your account by contacting{" "}
              <strong>jinss1145@gmail.com</strong>.
            </p>
            <p className="mt-3">
              Upon receiving a valid request, we will delete your account and associated personal
              information within a reasonable period, unless we are required or permitted to retain
              certain information for legal, security, fraud prevention, or legitimate business
              purposes.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">
              13. Service Availability and Changes
            </h2>
            <p className="mt-3">
              We may modify, update, suspend, or discontinue all or part of the Service at any time,
              with or without notice.
            </p>
            <p className="mt-3">
              We do not guarantee that the Service will always be available, uninterrupted, secure,
              or error-free.
            </p>
            <p className="mt-3">We may also add, remove, or change features at our discretion.</p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">14. Disclaimers</h2>
            <p className="mt-3 uppercase font-medium text-[13px] tracking-wide">
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
              to the maximum extent permitted by law.
            </p>
            <p className="mt-3 uppercase font-medium text-[13px] tracking-wide">
              To the maximum extent permitted by law, Invest and Reflect disclaims all warranties,
              express, implied, or statutory, including any warranties of merchantability, fitness
              for a particular purpose, title, non-infringement, accuracy, and quiet enjoyment.
            </p>
            <p className="mt-3">We do not warrant that:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>The Service will meet your requirements</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>Data will always be accurate, complete, or preserved without loss</li>
              <li>Any defects will be corrected</li>
            </ul>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">15. Limitation of Liability</h2>
            <p className="mt-3 uppercase font-medium text-[13px] tracking-wide">
              To the maximum extent permitted by law, Invest and Reflect and its owner, operators,
              affiliates, service providers, and licensors will not be liable for any indirect,
              incidental, special, consequential, exemplary, or punitive damages, or for any loss of
              profits, revenue, data, goodwill, or other intangible losses, arising out of or
              related to your use of or inability to use the Service.
            </p>
            <p className="mt-3 uppercase font-medium text-[13px] tracking-wide">
              To the maximum extent permitted by law, the total liability of Invest and Reflect for
              any claims arising out of or relating to the Service or these Terms will not exceed
              the greater of:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>The amount you paid to use the Service in the 12 months before the claim, or</li>
              <li>USD $50</li>
            </ul>
            <p className="mt-3">
              Some jurisdictions do not allow certain limitations of liability, so some of the above
              may not apply to you.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">16. Indemnification</h2>
            <p className="mt-3">
              You agree to defend, indemnify, and hold harmless Invest and Reflect and its owner,
              operators, affiliates, service providers, and licensors from and against any claims,
              liabilities, damages, judgments, losses, costs, expenses, and fees arising out of or
              related to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your use of the Service</li>
              <li>Your User Content</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or third-party rights</li>
            </ul>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">17. Termination</h2>
            <p className="mt-3">
              We may suspend or terminate your access to the Service at any time, with or without
              notice, if:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You violate these Terms</li>
              <li>We believe your use poses a security, legal, or operational risk</li>
              <li>We discontinue the Service</li>
            </ul>
            <p className="mt-3">You may stop using the Service at any time.</p>
            <p className="mt-3">
              Sections of these Terms that by their nature should survive termination will survive,
              including ownership, disclaimers, limitation of liability, indemnification, and
              governing law provisions.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">18. Governing Law</h2>
            <p className="mt-3">
              These Terms are governed by and construed in accordance with the laws of the{" "}
              <strong>State of Texas</strong>, without regard to its conflict of laws principles.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">19. Dispute Resolution</h2>
            <p className="mt-3">
              Any dispute arising out of or relating to these Terms or the Service will be resolved
              exclusively in the state or federal courts located in <strong>Texas</strong>, and you
              consent to the personal jurisdiction of those courts.
            </p>
            <p className="mt-3">
              If applicable law in your jurisdiction provides you with additional consumer rights or
              prohibits certain dispute provisions, those rights will apply to the extent required
              by law.
            </p>
          </section>

          {/* 20 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">20. Changes to These Terms</h2>
            <p className="mt-3">We may revise these Terms from time to time.</p>
            <p className="mt-3">
              If we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of
              this page. Your continued use of the Service after updated Terms become effective
              constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* 21 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">21. Contact</h2>
            <p className="mt-3">If you have any questions about these Terms, contact:</p>
            <div className="mt-3 font-medium text-[#0d1117]">
              <p>Invest and Reflect</p>
              <p>jinss1145@gmail.com</p>
            </div>
          </section>
        </div>

        {/* Footer divider */}
        <div className="mt-16 border-t border-gray-300 pt-6">
          <p className="text-xs text-[#6b7280]">
            &copy; {new Date().getFullYear()} Invest and Reflect. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
