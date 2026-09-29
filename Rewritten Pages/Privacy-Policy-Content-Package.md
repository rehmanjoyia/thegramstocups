# Privacy Policy — content and implementation package

Prepared: 29 September 2026.
Target URL: https://thegramstocups.com/privacy/
Status: completed notice for the owner-confirmed launch configuration, with the release checks below. Not a certification of legal compliance. Incorporate now; deployment remains on hold.

## A. Metadata

**Title:** Privacy Policy | Grams to Cups

**Meta description:** Learn how Grams to Cups handles calculator inputs, contact messages, analytics cookies and service providers, and how to contact us about your information.

**Canonical:** https://thegramstocups.com/privacy/

**H1:** Privacy Policy

Publication date instruction: display a static “Last updated” date matching the actual publication of this version. Do not use a date that automatically changes on every visit. The package preparation date is not an asserted deployment date.

## B. Website copy

Publish the copy between the markers, with the publication-date instruction above implemented. This text describes the confirmed configuration: GA4 loads without an interactive consent banner. If the launch configuration changes, update the corresponding paragraph before publishing.

<!-- BEGIN PRIVACY COPY -->

# Privacy Policy

Grams to Cups at thegramstocups.com is operated independently by an individual publisher. This policy explains how information is handled when you use our calculators, browse the website or contact us.

For privacy questions or requests, email **[support@thegramstocups.com](mailto:support@thegramstocups.com)**. The publisher handles requests through this address.

## Calculator inputs

You do not need an account to use the calculators. Conversion amounts, ingredient choices and results are processed in your browser. The calculator does not send these values to our server or Google Analytics, or save them in cookies, localStorage or sessionStorage.

This does not mean that browsing is unrecorded. Hosting services and Google Analytics process information about visits as described below.

## Contact messages

When you use our [contact form](https://thegramstocups.com/contact/), we collect your email address, chosen topic and message. Your name and the related page address are optional. Please include only information needed to explain your question.

The form sends your submission over HTTPS to our backend on Vercel. It then uses an encrypted SMTP connection to deliver the message to our Hostinger-hosted support mailbox. Your email address is included so we can reply. Emails you send directly to the support address are also handled through Hostinger.

We use messages to answer questions, investigate reported problems and consider suggestions. Contact names, email addresses and message contents are not sent to Google Analytics. The website does not maintain a separate database of contact submissions.

Our form also processes IP addresses and request timing in temporary server memory to limit excessive submissions. A hidden form field helps detect automated spam. These checks are separate from Analytics.

## Hosting and external fonts

Vercel hosts the website and its contact endpoint. Delivering pages and protecting the service involves processing technical request information, such as IP addresses, requested URLs, timestamps and browser information.

The website loads fonts from Google Fonts. Your browser connects to Google to request the font resources, which exposes technical information such as your IP address and request headers to that service.

## Google Analytics

We use Google Analytics 4 to understand website use, including page visits and interactions. Analytics can process browser identifiers, session information, referring pages and device or browser details. These identifiers can distinguish visits over time, so we do not describe the information as fully anonymous.

Google Signals and advertising or remarketing features are disabled in our current setup. We do not send contact-message contents or calculator inputs to Analytics.

**Currently, Analytics loads when a page opens, without an interactive cookie-consent banner.** Browsing data can therefore be transmitted before you make a privacy choice on this website.

### Analytics cookies

| Cookie | Purpose | Configured expiration |
|---|---|---|
| `_ga` | Distinguishes visitors using a browser identifier | Up to two years |
| `_ga_<container-id>` | Maintains Analytics session state | Up to two years |

The suffix in the second cookie name depends on the Analytics configuration. Browsers may shorten cookie lifetimes, and cookie expiry can be renewed by later activity. These cookies are separate from the Analytics data-retention setting below. See [Google's cookie documentation](https://support.google.com/analytics/answer/11397207?hl=en-GB) for more information.

### Your tracking choices

You can manage or delete cookies through your browser settings. Cookie blocking alone does not necessarily prevent every Analytics request. Google also provides an [Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout) for supported browsers.

These controls do not remove information already collected, and the add-on does not stop technical processing by our hosting, email or font services.

## Search Console and advertising

We use Google Search Console to review how the website appears and performs in Google Search. Search Console reporting is separate from the on-site Analytics collection described above.

Google AdSense is not currently enabled on this website. If advertising services are introduced, we will update this policy and the relevant privacy controls to reflect the actual setup.

## How long information is kept

**Contact messages:** Our mailbox policy is to delete contact messages within 60 days of receipt, including copies in mailbox folders and trash. You can request earlier deletion by emailing the support address. Once we can identify and verify the relevant messages, we remove the mailbox copies within five business days.

**Analytics:** Our GA4 event-data retention setting is two months. This setting does not apply to standard aggregated reports or set the lifetime of Analytics cookies. Google processes expiry through its deletion cycle, so it is not a promise that every Analytics record disappears exactly two months after a visit. See [Google's retention explanation](https://support.google.com/analytics/answer/7667196?hl=en).

**Technical records:** Hosting, email delivery, security records and provider backups have separate handling and retention arrangements. The mailbox deletion policy does not promise deletion of every provider log or backup within 60 days. Temporary form rate-limit records are held in server memory rather than a contact database.

## Service providers and processing locations

Vercel, Hostinger and Google receive the information needed for their respective hosting, email, font or Analytics services described above. Their infrastructure may process information outside your country. This policy does not promise that all information stays in one country.

Information may also need to be disclosed where required by law or to address misuse of the service. A link from this website to another website is subject to that website's own privacy practices.

## Privacy requests

Email [support@thegramstocups.com](mailto:support@thegramstocups.com) to ask about your information, request a correction or request deletion of your contact messages. Use the address you contacted us from where possible and identify the message or issue so we can locate it. We may need to verify that the request concerns your information.

Depending on the law that applies, you may have additional rights to access, correct or erase personal information, restrict or object to processing, request portability, or complain to a relevant data-protection authority. Available rights depend on the circumstances. We may not be able to connect an Analytics browser identifier to a named email sender.

## Changes to this policy

We will update this page when our practices change and revise its “Last updated” date. Check the current version when you want to understand how the website handles information.

<!-- END PRIVACY COPY -->

## C. Antigravity implementation and release checks — not website copy

### Basis and scope

This notice is based on the owner's latest confirmations: GA4 enabled in the launch batch, two-month event retention, Google Signals and advertising features disabled, no consent banner, no contact contents sent to Analytics, Hostinger SMTP delivery, and mailbox cleanup/deletion commitments. Earlier report claims of zero Analytics or zero cookies are superseded.

These are owner/project reports, not an independent inspection of the final deployed code or provider dashboards. Preserve the existing deployment hold. Have applicable legal requirements reviewed before treating this notice as sufficient for every visitor jurisdiction; the notice cannot make an unsuitable tracking implementation compliant.

### Consent issue to resolve before release

The confirmed configuration starts Analytics before a visitor can make a choice. Browser controls and an optional add-on are not equivalent to obtaining prior consent where required. Do not declare that disabling Google Signals or calling data anonymous removes consent requirements.

Review which consent requirements apply to the site's visitors and configuration. Where prior consent is required, prevent the relevant Analytics storage and transmission before consent, or leave Analytics disabled for those visitors. A banner that appears after the tag already fired does not solve this. Do not assume a cookies-denied configuration necessarily sends no data.

If consent controls are implemented, update the bold paragraph and choices section to describe the actual behavior, including how to reject and later withdraw consent. Disclose any preference cookie and its real lifetime. Do not publish the current no-banner description after behavior changes, or describe a consent mechanism that has not been implemented.

Reference: ICO guidance on cookies and similar technologies, including active consent and applicable exceptions: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/ . This reference does not determine the site's jurisdictional scope by itself.

### Operator identity

The owner confirmed independent individual operation, but did not expressly supply a legal operator name/country for publication. The copy uses the confirmed brand description and support channel; it does not fabricate an American operator, corporate entity, registered address or country.

Alex Morgan is the About page's editorial pen name, not evidence of a separate legal entity. Confirm and add the actual operator details required by applicable law before publication. Do not silently convert a pen name into a verified legal identity or publish private address details without owner authorization. This remains a legal-completeness check, not a request to invent a biography.

### Retention reconciliation

The owner first specified a maximum two-month mailbox period, then described a rolling 60-day cleanup of resolved inquiries. The copy implements the clear maximum as 60 days from receipt. To support that wording, cleanup must include unresolved messages and retained copies in sent, archive and trash folders as applicable; it cannot merely run once every 60 days or start the clock only after resolution.

If the intended practice instead keeps unresolved threads longer, change the policy before publication to specify that actual practice. Do not promise a 60-day cap while leaving an open-ended exception in operations. New replies must not silently restart the age of older retained copies if the policy promises deletion from receipt.

The five-business-day deletion commitment concerns identifiable, verified mailbox messages. Do not extend it to GA identifiers, provider backups, server logs or every statutory rights request. Track requests operationally so the promise can be fulfilled.

Do not copy the earlier report's estimated “7–30 days” provider retention, “typically 30 days” Vercel retention, “0 seconds” calculator retention or five-minute absolute IP-deletion claim. A rate-limit window is not proof of immediate record removal. The current copy avoids those unsupported durations.

### Technical checks

- Confirm one GA4 initialization per page and the intended property; do not duplicate tags through layouts and page files.
- Verify two-month event retention and document the user-identifier reset-on-new-activity setting separately. Aggregated reports, cookies and provider records do not inherit the mailbox retention period.
- Verify actual cookies/expiry against the table; acknowledge browser limits rather than guaranteeing two-year persistence.
- Verify Analytics request payloads and enhanced-measurement settings. Absence of custom form events alone does not prove the absence of automatically collected form interactions. Never send names, email addresses, message content or calculator values through URLs, event parameters, logs forwarded to Analytics or page titles.
- Confirm calculator state stays in memory and no conversion values are transmitted. Browsing/hosting data is distinct from the conversion inputs.
- Confirm Hostinger SMTP delivery to the support inbox with the sender as Reply-To and a verified site-owned From address. Keep credentials server-side. Do not include credentials in a report or this page.
- Preserve form input on failed submissions; clearing input should happen only after accepted success. The privacy statement must not be used to justify erasing a user's retry data prematurely.
- Confirm the temporary rate-limit map's cleanup behavior. Do not make stronger IP-retention claims unless demonstrated.
- Confirm that no AdSense tags or related processing have been introduced. Application plans alone do not establish active advertising; code integration before visible ads can still change processing.

### Page implementation and brand

Keep `/privacy/`, the supplied self-canonical and one H1. Publish section B only, with a real static update date. Maintain header/footer and the Contact form's policy link.

Use the site's ivory background, dark serif headings and accessible underlined links. Keep a readable single text column near 65–75 characters, 16–18px body text and comfortable line spacing. The small cookie table can use the site's white surface and thin borders. No calculator, promotional hero or forced keyword blocks are needed.

Use semantic headings and table headers, visible keyboard focus and contained mobile overflow. Check 390px, 768px and 1366px. No invented legal seal, compliance badge or review date. A normal WebPage identity is sufficient; no FAQ or Recipe markup.

### Publication checks

Confirm actual operator-disclosure requirements, consent behavior, retention wording and implementation are aligned before release. Verify provider/internal links, mailbox privacy-request handling and the publication date. If the configuration changes, update the notice at the same time. No deployment is authorized by this package.

## D. Evidence and limitations

- User-provided Antigravity verification report: local calculator; Vercel hosting; remote Google Fonts; contact field inventory and temporary IP rate limiting. Its original absence-of-Analytics statement was superseded by the owner's latest launch report.
- Owner confirmation: Hostinger mailbox and SMTP, independent publisher, 60-day/two-month deletion intent and five-business-day requested mailbox deletion; launch GA4 settings and Search Console use; AdSense planned for later.
- Google GA4 cookie documentation: https://support.google.com/analytics/answer/11397207?hl=en-GB — first-party identifiers, default expiry, browser lifetime limits and the fact that Analytics transmission does not require cookies.
- Google retention documentation: https://support.google.com/analytics/answer/7667196?hl=en — event/user retention scope, aggregated-report exception, monthly deletion and identifier reset behavior.
- Google opt-out add-on: https://tools.google.com/dlpage/gaoptout — linked as an available browser tool, not a universal control over every service or a substitute for consent obligations.

External documentation checked 29 September 2026. Final configuration facts come from the owner/project report; no live deployment test, mailbox access or independent provider audit was performed in this task. This is website notice copy and implementation guidance, not a legal opinion certifying compliance.
