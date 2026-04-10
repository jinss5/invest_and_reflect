import Link from "next/link";

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#6b7280]">
          Effective Date: April 10, 2026 &middot; Last Updated: April 10, 2026
        </p>

        {/* Policy body */}
        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#374151]">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">1. Introduction</h2>
            <p className="mt-3">
              Welcome to <strong>Invest and Reflect</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;). We respect your privacy and are committed to protecting your
              personal information.
            </p>
            <p className="mt-3">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use the Invest and Reflect website, application, and related
              services (collectively, the &ldquo;Service&rdquo;).
            </p>
            <p className="mt-3">
              By using the Service, you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">2. About the Service</h2>
            <p className="mt-3">
              Invest and Reflect is a web application that allows users to sign in with Google,
              maintain a personal investment journal, record market reflections and trade decisions,
              and optionally receive reminder emails related to their journal activity.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">3. Contact Information</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy or our privacy practices, you may
              contact us at:
            </p>
            <p className="mt-2 font-medium text-[#0d1117]">jinss1145@gmail.com</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">4. Information We Collect</h2>
            <p className="mt-3">We may collect the following types of information:</p>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">
              4.1 Information You Provide Directly
            </h3>
            <p className="mt-2">When you use the Service, you may provide information such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Journal entries, reflections, notes, and observations</li>
              <li>
                Investment-related information you choose to record, including buy, sell, or hold
                activity
              </li>
              <li>Email reminder preferences</li>
              <li>Communications you send to us</li>
            </ul>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">
              4.2 Information Collected Through Google Sign-In
            </h3>
            <p className="mt-2">
              When you sign in using Google OAuth, we may receive information associated with your
              Google account, such as:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your Google account identifier</li>
              <li>Your profile image, if provided by Google</li>
            </ul>
            <p className="mt-3">
              We only collect the information reasonably necessary to authenticate your account and
              operate the Service.
            </p>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">
              4.3 Automatically Collected Information
            </h3>
            <p className="mt-2">
              When you access or use the Service, certain information may be collected
              automatically, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Dates and times of access</li>
              <li>Log and usage data</li>
            </ul>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">
              4.4 Cookies and Similar Technologies
            </h3>
            <p className="mt-2">We may use cookies, session tokens, and similar technologies to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Keep you signed in</li>
              <li>Maintain session security</li>
              <li>Remember preferences</li>
              <li>Support core functionality</li>
              <li>Improve the performance and reliability of the Service</li>
            </ul>
            <p className="mt-3">
              You may be able to control cookies through your browser settings, though disabling
              them may affect the functionality of the Service.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">5. How We Use Your Information</h2>
            <p className="mt-3">We use your information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Create and manage your account</li>
              <li>Authenticate you through Google OAuth</li>
              <li>Provide and maintain the journal functionality</li>
              <li>Store and display your journal content</li>
              <li>Send reminder emails if you choose to opt in</li>
              <li>Respond to inquiries and support requests</li>
              <li>Monitor, secure, and improve the Service</li>
              <li>Detect and prevent misuse, fraud, or security issues</li>
              <li>Comply with legal obligations</li>
              <li>Enforce our policies and terms</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">6. Reminder Emails</h2>
            <p className="mt-3">
              If you enable reminder emails, we may send you journal-related reminder messages based
              on your selected preferences.
            </p>
            <p className="mt-3">
              These emails are not marketing emails. They are limited to reminder and
              service-related communications connected to your use of Invest and Reflect.
            </p>
            <p className="mt-3">
              You can manage or disable reminder emails through the app settings, where available.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">7. How We Share Information</h2>
            <p className="mt-3">We do not sell your personal information.</p>
            <p className="mt-3">We may share information in the following limited circumstances:</p>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">7.1 Service Providers</h3>
            <p className="mt-2">
              We use trusted third-party providers to help operate the Service, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Google</strong> for authentication
              </li>
              <li>
                <strong>Supabase</strong> for backend services and database infrastructure
              </li>
              <li>
                <strong>Vercel</strong> for hosting and deployment
              </li>
              <li>
                <strong>Resend</strong> for sending reminder emails
              </li>
            </ul>
            <p className="mt-3">
              These providers may process your information only as needed to provide their services
              to us.
            </p>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">
              7.2 Legal Requirements and Protection
            </h3>
            <p className="mt-2">
              We may disclose information if required to do so by law or if we reasonably believe
              disclosure is necessary to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Comply with applicable law or legal process</li>
              <li>Protect our rights, property, or safety</li>
              <li>Investigate fraud, abuse, or security incidents</li>
              <li>Enforce our policies and agreements</li>
            </ul>

            <h3 className="mt-6 text-base font-semibold text-[#0d1117]">7.3 Business Transfers</h3>
            <p className="mt-2">
              If Invest and Reflect is involved in a merger, acquisition, asset sale, financing, or
              similar transaction, your information may be transferred as part of that transaction,
              subject to appropriate confidentiality protections.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">8. Data Retention</h2>
            <p className="mt-3">
              We retain personal information for as long as reasonably necessary to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide the Service</li>
              <li>Maintain your account</li>
              <li>Fulfill the purposes described in this Privacy Policy</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>
            <p className="mt-3">
              You may request account deletion by contacting <strong>jinss1145@gmail.com</strong>.
              Upon request, we will delete your account and associated personal information within a
              reasonable period, unless retention is required by law or for legitimate business or
              security purposes.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">9. Data Security</h2>
            <p className="mt-3">
              We use reasonable administrative, technical, and organizational safeguards designed to
              protect your information from unauthorized access, disclosure, alteration, or
              destruction.
            </p>
            <p className="mt-3">
              However, no internet-based service or electronic storage system is completely secure,
              and absolute security cannot be guaranteed.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">10. Your Rights and Choices</h2>
            <p className="mt-3">
              Depending on your location and applicable law, you may have the right to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Object to or restrict certain processing, where applicable</li>
            </ul>
            <p className="mt-3">
              To submit a request regarding your information, contact{" "}
              <strong>jinss1145@gmail.com</strong>.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">11. California Privacy Notice</h2>
            <p className="mt-3">
              If you are a California resident, you may have rights under California law, including
              rights to know, access, correct, and delete certain personal information.
            </p>
            <p className="mt-3">We do not sell personal information.</p>
            <p className="mt-3">
              To exercise applicable privacy rights, contact <strong>jinss1145@gmail.com</strong>.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">12. International Users</h2>
            <p className="mt-3">
              If you access the Service from outside the country where our service providers
              operate, your information may be transferred to, stored in, and processed in other
              countries that may have different data protection laws than your jurisdiction.
            </p>
            <p className="mt-3">
              By using the Service, you understand and consent to such transfers where permitted by
              law.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">13. Children&rsquo;s Privacy</h2>
            <p className="mt-3">
              The Service is not intended for children under the age of 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
            <p className="mt-3">
              If we learn that we have collected personal information from a child under 13 without
              appropriate authorization, we will take steps to delete that information.
            </p>
            <p className="mt-3">
              If you believe that a child has provided personal information through the Service,
              contact <strong>jinss1145@gmail.com</strong>.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">14. Third-Party Services</h2>
            <p className="mt-3">
              The Service relies on third-party services, including Google, Supabase, Vercel, and
              Resend. Their handling of data is governed by their own privacy policies and
              practices.
            </p>
            <p className="mt-3">
              We encourage users to review the privacy policies of those third-party services.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">
              15. Changes to This Privacy Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. If we make changes, we will
              revise the &ldquo;Last Updated&rdquo; date at the top of this page.
            </p>
            <p className="mt-3">
              Your continued use of the Service after an updated Privacy Policy becomes effective
              constitutes your acknowledgment of the revised policy.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-lg font-semibold text-[#0d1117]">16. Contact Us</h2>
            <p className="mt-3">
              If you have questions, concerns, or requests relating to this Privacy Policy or your
              personal information, contact:
            </p>
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
