import { Metadata } from "next";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Sonexa AI",
  description:
    "Comprehensive terms of service for Sonexa AI's voice message analytics platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Back to Home Button */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto px-6 py-12 container">
        <div className="mx-auto max-w-6xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="top-24 sticky bg-white shadow-lg p-6 rounded-2xl">
                <h3 className="mb-4 font-semibold text-slate-900 text-lg">
                  Contents
                </h3>
                <nav className="space-y-2 text-sm">
                  <a
                    href="#definitions"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>1. Definitions</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#acceptance"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>2. Acceptance of Terms</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#services"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>3. Description of Services</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#registration"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>4. Registration and Accounts</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#acceptable-use"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>5. Acceptable Use Policy</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#intellectual-property"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>6. Intellectual Property</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#privacy-data"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>7. Privacy and Data</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#payment"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>8. Payment Terms</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#termination"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>9. Termination</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#disclaimers"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>10. Disclaimers</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#limitation-liability"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>11. Limitation of Liability</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#indemnification"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>12. Indemnification</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#dispute-resolution"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>13. Dispute Resolution</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a
                    href="#general-provisions"
                    className="flex justify-between items-center py-1 text-slate-600 hover:text-slate-900"
                  >
                    <span>14. General Provisions</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow-lg p-8 md:p-12 rounded-2xl">
                <div className="mb-8">
                  <h1 className="mb-4 font-bold text-slate-900 text-4xl">
                    Terms of Service
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Last updated: July 13, 2025
                  </p>
                  <p className="mt-2 text-slate-600">
                    Effective Date: July 13, 2025
                  </p>
                </div>

                <div className="space-y-12 max-w-none prose prose-slate">
                  {/* 1. Definitions */}
                  <section id="definitions">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      1. Definitions
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>"Agreement"</strong> means these Terms of
                        Service, as may be amended from time to time.
                      </p>
                      <p>
                        <strong>"Company," "we," "us," or "our"</strong> refers
                        to Sonexa AI, a Delaware corporation.
                      </p>
                      <p>
                        <strong>"Customer," "you," or "your"</strong> refers to
                        the individual or entity accessing or using our
                        Services.
                      </p>
                      <p>
                        <strong>"Content"</strong> means any information, data,
                        text, software, code, scripts, music, sound, photos,
                        graphics, videos, messages, tags, interactive features,
                        or other materials.
                      </p>
                      <p>
                        <strong>"Services"</strong> means all products and
                        services provided by Sonexa AI, including but not
                        limited to our voice message analytics platform,
                        transcription services, AI analysis tools, and related
                        software.
                      </p>
                      <p>
                        <strong>"User Content"</strong> means any Content that
                        you upload, submit, post, or otherwise transmit via the
                        Services.
                      </p>
                    </div>
                  </section>

                  {/* 2. Acceptance of Terms */}
                  <section id="acceptance">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      2. Acceptance of Terms
                    </h2>
                    <div className="space-y-4">
                      <p>
                        By accessing, browsing, or using our Services, you
                        acknowledge that you have read, understood, and agree to
                        be bound by this Agreement and all applicable laws and
                        regulations. If you do not agree with any of these
                        terms, you are prohibited from using or accessing our
                        Services.
                      </p>
                      <p>
                        <strong>2.1 Legal Capacity.</strong> You represent and
                        warrant that you have the legal capacity to enter into
                        this Agreement. If you are entering into this Agreement
                        on behalf of an organization, you represent and warrant
                        that you have the authority to bind such organization to
                        this Agreement.
                      </p>
                      <p>
                        <strong>2.2 Age Requirements.</strong> You must be at
                        least 18 years of age to use our Services. If you are
                        under 18, you may only use our Services with the
                        involvement and consent of a parent or guardian.
                      </p>
                    </div>
                  </section>

                  {/* 3. Description of Services */}
                  <section id="services">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      3. Description of Services
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>3.1 Service Overview.</strong> Sonexa AI
                        provides artificial intelligence-powered voice message
                        analysis, transcription, and insights services. Our
                        platform enables users to upload, process, and analyze
                        voice communications to extract meaningful data and
                        insights.
                      </p>
                      <p>
                        <strong>3.2 Service Availability.</strong> We strive to
                        maintain the availability of our Services, but we do not
                        guarantee uninterrupted access. Our Services may be
                        temporarily unavailable due to maintenance, updates, or
                        circumstances beyond our reasonable control.
                      </p>
                      <p>
                        <strong>3.3 Service Modifications.</strong> We reserve
                        the right to modify, suspend, or discontinue any aspect
                        of our Services at any time, with or without notice. We
                        will make reasonable efforts to provide advance notice
                        of material changes that may adversely affect your use
                        of the Services.
                      </p>
                    </div>
                  </section>

                  {/* 4. Registration and Accounts */}
                  <section id="registration">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      4. Registration and Accounts
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>4.1 Account Creation.</strong> To access certain
                        features of our Services, you must create an account by
                        providing accurate, current, and complete information as
                        prompted by our registration process.
                      </p>
                      <p>
                        <strong>4.2 Account Security.</strong> You are
                        responsible for maintaining the confidentiality of your
                        account credentials and for all activities that occur
                        under your account. You agree to immediately notify us
                        of any unauthorized use of your account or any other
                        breach of security.
                      </p>
                      <p>
                        <strong>4.3 Account Information.</strong> You agree to
                        keep your account information accurate and up-to-date.
                        You may update your account information through your
                        account settings or by contacting our support team.
                      </p>
                      <p>
                        <strong>4.4 Account Sharing.</strong> You may not share
                        your account credentials or allow others to access your
                        account. Each account is for the use of a single
                        individual or organization as specified during
                        registration.
                      </p>
                    </div>
                  </section>

                  {/* 5. Acceptable Use Policy */}
                  <section id="acceptable-use">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      5. Acceptable Use Policy
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>5.1 Permitted Uses.</strong> You may use our
                        Services only for lawful purposes and in accordance with
                        this Agreement. You agree to use our Services in a
                        manner consistent with applicable laws and regulations.
                      </p>
                      <p>
                        <strong>5.2 Prohibited Activities.</strong> You agree
                        not to:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>
                          Use our Services for any illegal, harmful, fraudulent,
                          infringing, or objectionable purpose
                        </li>
                        <li>
                          Upload or transmit viruses, malware, or other
                          malicious code
                        </li>
                        <li>
                          Attempt to gain unauthorized access to our systems or
                          user accounts
                        </li>
                        <li>
                          Interfere with or disrupt the integrity or performance
                          of our Services
                        </li>
                        <li>
                          Collect or harvest personal information from other
                          users
                        </li>
                        <li>
                          Use our Services to spam, phish, or otherwise harm
                          others
                        </li>
                        <li>
                          Reverse engineer, decompile, or attempt to extract
                          source code from our Services
                        </li>
                        <li>
                          Use automated means to access our Services without our
                          express written permission
                        </li>
                        <li>
                          Upload content that infringes intellectual property
                          rights of others
                        </li>
                        <li>
                          Upload content containing personal information of
                          individuals without proper consent
                        </li>
                      </ul>
                      <p>
                        <strong>5.3 Content Standards.</strong> All User Content
                        must comply with applicable laws and must not be
                        defamatory, obscene, threatening, invasive of privacy,
                        or otherwise objectionable.
                      </p>
                    </div>
                  </section>

                  {/* 6. Intellectual Property */}
                  <section id="intellectual-property">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      6. Intellectual Property Rights
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>6.1 Our Rights.</strong> The Services and all
                        materials therein, including but not limited to
                        software, images, text, graphics, logos, patents,
                        trademarks, service marks, copyrights, photographs,
                        audio, videos, music, and User Content, are owned by or
                        licensed to us and are protected by intellectual
                        property laws.
                      </p>
                      <p>
                        <strong>6.2 Your Rights in User Content.</strong> You
                        retain all rights in your User Content. By uploading
                        User Content to our Services, you grant us a worldwide,
                        non-exclusive, royalty-free license to use, store,
                        display, reproduce, save, modify, create derivative
                        works, perform, and distribute your User Content solely
                        for the purpose of providing our Services to you.
                      </p>
                      <p>
                        <strong>6.3 Feedback.</strong> If you provide us with
                        feedback, suggestions, or recommendations regarding our
                        Services, you grant us the right to use such feedback
                        without restriction or compensation to you.
                      </p>
                      <p>
                        <strong>6.4 DMCA Compliance.</strong> We respect
                        intellectual property rights and expect our users to do
                        the same. If you believe your copyrighted material has
                        been infringed, please contact us with a detailed DMCA
                        notice.
                      </p>
                    </div>
                  </section>

                  {/* 7. Privacy and Data */}
                  <section id="privacy-data">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      7. Privacy and Data Protection
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>7.1 Privacy Policy.</strong> Our collection and
                        use of personal information is governed by our Privacy
                        Policy, which is incorporated into this Agreement by
                        reference.
                      </p>
                      <p>
                        <strong>7.2 Data Processing.</strong> By using our
                        Services, you consent to our processing of your data as
                        described in our Privacy Policy and Data Processing
                        Agreement.
                      </p>
                      <p>
                        <strong>7.3 Data Security.</strong> We implement
                        appropriate technical and organizational measures to
                        protect your data against unauthorized access,
                        alteration, disclosure, or destruction.
                      </p>
                      <p>
                        <strong>7.4 Data Retention.</strong> We retain your data
                        only as long as necessary to provide our Services and as
                        required by applicable law.
                      </p>
                    </div>
                  </section>

                  {/* 8. Payment Terms */}
                  <section id="payment">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      8. Payment Terms
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>8.1 Fees.</strong> Access to certain features of
                        our Services may require payment of fees. All fees are
                        exclusive of applicable taxes unless otherwise stated.
                      </p>
                      <p>
                        <strong>8.2 Payment Methods.</strong> We accept various
                        payment methods as indicated during the checkout
                        process. You authorize us to charge your selected
                        payment method for all fees incurred.
                      </p>
                      <p>
                        <strong>8.3 Billing.</strong> Subscription fees are
                        billed in advance on a recurring basis. Usage-based fees
                        are billed monthly in arrears.
                      </p>
                      <p>
                        <strong>8.4 Refunds.</strong> All payments are
                        non-refundable except as required by applicable law or
                        as expressly stated in our refund policy.
                      </p>
                      <p>
                        <strong>8.5 Price Changes.</strong> We may change our
                        fees at any time. For subscription services, price
                        changes will take effect at the beginning of your next
                        billing cycle.
                      </p>
                    </div>
                  </section>

                  {/* 9. Termination */}
                  <section id="termination">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      9. Termination
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>9.1 Termination by You.</strong> You may
                        terminate your account at any time by following the
                        instructions in your account settings or by contacting
                        our support team.
                      </p>
                      <p>
                        <strong>9.2 Termination by Us.</strong> We may suspend
                        or terminate your access to our Services immediately,
                        without prior notice, if you breach this Agreement or if
                        we reasonably believe such action is necessary to
                        protect our Services or other users.
                      </p>
                      <p>
                        <strong>9.3 Effect of Termination.</strong> Upon
                        termination, your right to use our Services will cease
                        immediately. We may delete your account and all
                        associated data, though we may retain certain
                        information as required by law or for legitimate
                        business purposes.
                      </p>
                      <p>
                        <strong>9.4 Survival.</strong> Sections relating to
                        intellectual property, payment obligations, disclaimers,
                        limitation of liability, indemnification, and general
                        provisions will survive termination of this Agreement.
                      </p>
                    </div>
                  </section>

                  {/* 10. Disclaimers */}
                  <section id="disclaimers">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      10. Disclaimers
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>10.1 "AS IS" BASIS.</strong> OUR SERVICES ARE
                        PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT
                        WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
                      </p>
                      <p>
                        <strong>10.2 DISCLAIMER OF WARRANTIES.</strong> WE
                        DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO
                        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                        PURPOSE, NON-INFRINGEMENT, AND COURSE OF PERFORMANCE.
                      </p>
                      <p>
                        <strong>10.3 NO GUARANTEE.</strong> WE DO NOT WARRANT
                        THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR
                        COMPLETELY SECURE.
                      </p>
                      <p>
                        <strong>10.4 AI ACCURACY.</strong> Our AI-powered
                        services may produce inaccurate or incomplete results.
                        You should not rely solely on our Services for critical
                        decisions without independent verification.
                      </p>
                    </div>
                  </section>

                  {/* 11. Limitation of Liability */}
                  <section id="limitation-liability">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      11. Limitation of Liability
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>11.1 EXCLUSION OF DAMAGES.</strong> TO THE
                        MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE
                        FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                        PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF
                        PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                        LOSSES.
                      </p>
                      <p>
                        <strong>11.2 LIABILITY CAP.</strong> OUR TOTAL LIABILITY
                        FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS
                        AGREEMENT SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN
                        THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100,
                        WHICHEVER IS GREATER.
                      </p>
                      <p>
                        <strong>11.3 ESSENTIAL PURPOSE.</strong> THESE
                        LIMITATIONS SHALL APPLY EVEN IF ANY LIMITED REMEDY FAILS
                        OF ITS ESSENTIAL PURPOSE.
                      </p>
                    </div>
                  </section>

                  {/* 12. Indemnification */}
                  <section id="indemnification">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      12. Indemnification
                    </h2>
                    <div className="space-y-4">
                      <p>
                        You agree to indemnify, defend, and hold harmless Sonexa
                        AI and its officers, directors, employees, agents, and
                        affiliates from and against any claims, liabilities,
                        damages, losses, costs, expenses, or fees (including
                        reasonable attorneys' fees) arising from:
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>Your use or misuse of our Services</li>
                        <li>Your violation of this Agreement</li>
                        <li>Your violation of any rights of another party</li>
                        <li>Your User Content</li>
                      </ul>
                    </div>
                  </section>

                  {/* 13. Dispute Resolution */}
                  <section id="dispute-resolution">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      13. Dispute Resolution and Governing Law
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>13.1 Governing Law.</strong> This Agreement
                        shall be governed by and construed in accordance with
                        the laws of the State of Delaware, without regard to its
                        conflict of law principles.
                      </p>
                      <p>
                        <strong>13.2 Arbitration.</strong> Any dispute arising
                        out of or relating to this Agreement shall be resolved
                        through binding arbitration administered by the American
                        Arbitration Association under its Commercial Arbitration
                        Rules.
                      </p>
                      <p>
                        <strong>13.3 Class Action Waiver.</strong> You agree
                        that any arbitration or legal proceeding shall be
                        conducted only on an individual basis and not in a
                        class, consolidated, or representative action.
                      </p>
                      <p>
                        <strong>13.4 Jurisdiction.</strong> Any legal action not
                        subject to arbitration shall be brought exclusively in
                        the federal or state courts located in Delaware.
                      </p>
                    </div>
                  </section>

                  {/* 14. General Provisions */}
                  <section id="general-provisions">
                    <h2 className="mb-6 pb-2 border-slate-200 border-b font-semibold text-slate-900 text-2xl">
                      14. General Provisions
                    </h2>
                    <div className="space-y-4">
                      <p>
                        <strong>14.1 Entire Agreement.</strong> This Agreement
                        constitutes the entire agreement between you and us
                        regarding your use of our Services and supersedes all
                        prior agreements and understandings.
                      </p>
                      <p>
                        <strong>14.2 Amendment.</strong> We may modify this
                        Agreement at any time by posting the revised terms on
                        our website. Your continued use of our Services after
                        such posting constitutes acceptance of the modified
                        Agreement.
                      </p>
                      <p>
                        <strong>14.3 Severability.</strong> If any provision of
                        this Agreement is found to be unenforceable, the
                        remaining provisions shall remain in full force and
                        effect.
                      </p>
                      <p>
                        <strong>14.4 Assignment.</strong> You may not assign
                        your rights under this Agreement without our prior
                        written consent. We may assign our rights and
                        obligations under this Agreement without restriction.
                      </p>
                      <p>
                        <strong>14.5 Force Majeure.</strong> We shall not be
                        liable for any failure or delay in performance due to
                        circumstances beyond our reasonable control.
                      </p>
                      <p>
                        <strong>14.6 Contact Information.</strong> For questions
                        about this Agreement, please contact us at:
                      </p>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p>
                          <strong>Sonexa AI</strong>
                        </p>
                        <p>Email: legal@sonexa.ai</p>
                        <p>Address: [Company Address]</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
