import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const title = "Privacy Policy & Terms of Use — Build Financial Wellness";
const description =
  "How Build Financial Wellness collects, uses, and protects your information, plus the terms that govern use of our website and coaching services.";

export const Route = createFileRoute("/privacy-terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyTerms,
});

function H2({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-10 text-xl font-semibold text-navy-blue lg:text-2xl">{children}</h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-[1.9] text-[#6d7d8b] lg:text-lg">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-[1.9] text-[#6d7d8b] lg:text-lg">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Contact() {
  return (
    <div className="mt-4 text-base leading-[1.9] text-[#6d7d8b] lg:text-lg">
      <p>Build Financial Wellness, LLC</p>
      <p>
        Email:{" "}
        <a
          className="text-sky-blue underline"
          href="mailto:info@buildyourfinancialwellness.com"
        >
          info@buildyourfinancialwellness.com
        </a>
      </p>
      <p>
        Phone:{" "}
        <a className="text-sky-blue underline" href="tel:18882250352">
          1-888-225-0352
        </a>
      </p>
      <p>Address: 429 E. Dupont Rd, Unit 2052, Fort Wayne, IN 46825</p>
    </div>
  );
}

function PrivacyTerms() {
  return (
    <div className="flex min-h-screen flex-col bg-color-white font-cabin">
      <Header />
      <main className="flex-1 px-5 py-14 lg:px-[60px] lg:py-[85px] 2xl:px-[140px]">
        <div className="mx-auto w-full max-w-[1160px]">
          <section id="privacy-policy" className="scroll-mt-[110px]">
            <p className="text-lg font-semibold text-navy-blue">Build Financial Wellness, LLC</p>
            <h1 className="mt-2 text-3xl leading-tight text-navy-blue sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-base font-semibold text-[#6d7d8b]">
              Effective Date: August 1, 2025
            </p>

            <P>
              At Build Financial Wellness, LLC (“we,” “our,” or “us”), your privacy is important to
              us. This Privacy Policy explains how we collect, use, and protect your personal
              information when you visit our website
              (https://www.buildyourfinancialwellness.com) or use our financial coaching services.
            </P>
            <P>
              By using our website or services, you consent to the practices described in this
              Privacy Policy.
            </P>

            <H2>1. Information We Collect</H2>
            <P>We collect two types of information:</P>
            <P>A. Personal Information</P>
            <P>
              When you sign up for our services, request information, or interact with us through
              our website, we may collect information such as:
            </P>
            <List items={["Name", "Email address", "Other information you voluntarily submit"]} />
            <P>B. Non-Personal Information</P>
            <P>We may also collect technical and usage data, including:</P>
            <List items={["IP address", "Browser type", "Device information", "Pages visited"]} />
            <P>
              This information helps us improve our website and enhance your user experience.
            </P>

            <H2>2. How We Use Your Information</H2>
            <P>We may use your information for the following purposes:</P>
            <List
              items={[
                "To deliver and manage our financial coaching services",
                "To respond to inquiries and provide customer support",
                "To send emails related to our services, promotions, updates, and newsletters",
                "To analyze website usage and improve content and functionality",
                "To comply with applicable laws and regulations",
              ]}
            />
            <P>
              By submitting your name and email address on our website, you consent to being added
              to our email list. This may include receiving marketing content, business updates, or
              other communications from us.
            </P>
            <P>
              You can unsubscribe at any time by clicking the “Unsubscribe” link in any email or by
              contacting us directly.
            </P>

            <H2>3. How We Protect Your Information</H2>
            <P>
              We use reasonable administrative, technical, and physical security measures to protect
              your information. However, please note that no data transmission or storage system can
              be guaranteed to be 100% secure.
            </P>

            <H2>4. Sharing Your Information</H2>
            <P>
              We do not sell or rent your personal information. We may share your information only:
            </P>
            <List
              items={[
                "With trusted service providers (e.g., payment processors, email platforms) under confidentiality agreements",
                "If required by law (e.g., in response to a subpoena or government request)",
                "In the event of a business transfer, merger, or sale of assets",
              ]}
            />

            <H2>5. Cookies and Tracking Technologies</H2>
            <P>
              We use cookies and similar technologies to enhance your browsing experience. You may
              disable cookies in your browser settings, but some website features may not function
              properly without them.
            </P>

            <H2>6. Your Rights and Choices</H2>
            <P>You have the right to:</P>
            <List
              items={[
                "Access or update your personal information",
                "Request deletion of your personal data, where legally permissible",
                "Unsubscribe from marketing communications at any time",
              ]}
            />

            <H2>7. Children’s Privacy</H2>
            <P>
              Our services are not intended for individuals under the age of 18 (“child” or
              “children”). We do not knowingly collect personal information from children. If we
              learn that a child has submitted personal data, we will take steps to delete it.
            </P>

            <H2>8. California Privacy Rights (If Applicable)</H2>
            <P>
              If you are a California resident, you may have additional rights under the California
              Consumer Privacy Act (CCPA), such as the right to:
            </P>
            <List
              items={[
                "Request access to your personal data",
                "Request deletion of your personal data",
              ]}
            />

            <H2>9. Changes to This Policy</H2>
            <P>
              We may update this Privacy Policy periodically. Changes will be posted on this page
              with a revised “Effective Date.” Your continued use of our website or services
              constitutes your acceptance of the updated policy.
            </P>

            <H2>10. Contact Information</H2>
            <P>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </P>
            <Contact />
          </section>

          <hr className="my-14 border-light-gray" />

          <section id="terms-of-use" className="scroll-mt-[110px]">
            <h2 className="text-3xl leading-tight text-navy-blue sm:text-4xl lg:text-5xl">
              Terms of Use Policy
            </h2>
            <p className="mt-3 text-base font-semibold text-[#6d7d8b]">
              Effective Date: August 1, 2025
            </p>

            <P>
              These Terms of Use (“Terms”) govern your use of the website
              https://www.buildyourfinancialwellness.com and the services offered by Build Financial
              Wellness, LLC (“we,” “our,” or “us”), including financial coaching services.
            </P>
            <P>
              By using our website or purchasing services, you agree to these Terms. If you do not
              agree, please do not use the site.
            </P>

            <H2>1. Use of Our Website</H2>
            <P>
              You agree to use our website and services for lawful purposes only. You must not use
              our services to:
            </P>
            <List
              items={[
                "Violate any applicable laws or regulations",
                "Infringe upon the rights, privacy, or intellectual property of others",
                "Disrupt or interfere with the security or functionality of the website",
              ]}
            />

            <H2>2. Coaching Services</H2>
            <List
              items={[
                "Our services include financial coaching designed to help individuals improve their financial well-being.",
                "Coaching is not legal, investment, or tax advice. We recommend consulting licensed professionals for those needs.",
                "Sessions must be booked via our website and paid in advance through secure third-party systems.",
              ]}
            />

            <H2>3. Email Communications and Consent</H2>
            <P>
              By submitting your name and email address through any form on our website, you consent
              to receive communications from us, including promotional content, newsletters, and
              updates.
            </P>
            <P>
              You may unsubscribe at any time by clicking the “Unsubscribe” link in our emails or by
              contacting us directly.
            </P>

            <H2>4. Account Registration</H2>
            <P>If account creation is required to access services, you agree to:</P>
            <List
              items={[
                "Provide accurate and complete information",
                "Maintain the confidentiality of your login credentials",
                "Notify us immediately of any unauthorized use of your account",
              ]}
            />
            <P>You are responsible for all activities under your account.</P>

            <H2>5. Payment and Refund Policy</H2>
            <List
              items={[
                "Payment is required prior to scheduling any coaching session.",
                "Refunds may be issued according to our refund policy, which is available upon request or as posted separately on our website.",
                "Cancellations must be made at least 24 hours before the start of the first session to qualify for a refund or reschedule.",
              ]}
            />

            <H2>6. Intellectual Property</H2>
            <P>
              All content on this website — including text, graphics, logos, trademarks, images,
              videos, and other materials — is the intellectual property of Build Financial
              Wellness, LLC or its content suppliers.
            </P>
            <P>
              You may not copy, reproduce, distribute, or use any content without prior written
              permission.
            </P>

            <H2>7. Limitation of Liability</H2>
            <P>
              To the fullest extent permitted by Indiana law, Build Financial Wellness, LLC is not
              liable for any direct, indirect, incidental, consequential, or special damages arising
              from or related to your use of the website or our services.
            </P>

            <H2>8. Indemnification</H2>
            <P>
              You agree to indemnify, defend, and hold harmless Build Financial Wellness, LLC, its
              employees, contractors, and partners from any claims, losses, damages, or expenses
              (including legal fees) resulting from:
            </P>
            <List
              items={[
                "Your use of our website or services",
                "Your violation of these Terms",
                "Your infringement of any third-party rights",
              ]}
            />

            <H2>9. Termination</H2>
            <P>
              We reserve the right to suspend or terminate access to our website or services at our
              discretion, especially if you violate these Terms or engage in unlawful activity.
            </P>

            <H2>10. Governing Law</H2>
            <P>
              These Terms are governed by the laws of the State of Indiana, without regard to
              conflict of law principles.
            </P>
            <P>
              To the extent permitted by law, any disputes shall be resolved in the state courts of
              Allen County, Indiana.
            </P>

            <H2>11. Updates to These Terms</H2>
            <P>
              We may update or modify these Terms at any time. Updates will be posted on this page
              with a new Effective Date.
            </P>
            <P>
              Your continued use of the website or services after such updates constitutes
              acceptance of the revised Terms.
            </P>

            <H2>12. Contact Information</H2>
            <P>If you have any questions about these Terms, please contact us:</P>
            <Contact />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
