# Contact — final content and branded form package

Updated: 29 September 2026.
Target URL: https://thegramstocups.com/contact/
Status: final publishable copy and form specification. This revision supersedes the earlier email-only instructions. Incorporate now; hold deployment until the owner requests the completed batch push.

## A. Metadata

**Title:** Contact Grams to Cups | Questions & Corrections

**Meta description:** Have a conversion question, spotted an error or need another ingredient? Send a message through our contact form or email Grams to Cups directly.

**Canonical:** https://thegramstocups.com/contact/

**H1:** Contact Grams to Cups

## B. Final website copy

Render the form specified in section C between the form markers. The markers are placement instructions, not visible copy. All other text between the main copy markers is final website copy.

<!-- BEGIN CONTACT COPY -->

# Contact Grams to Cups

Have a question about a conversion, spotted something that looks wrong or want to suggest an ingredient? Use the form below or email us directly.

## Send a message

Required fields are marked with an asterisk (*).

<!-- INSERT CONTACT FORM: fields, privacy line and button from section C -->
<!-- END CONTACT FORM -->

Prefer email? Write to **[support@thegramstocups.com](mailto:support@thegramstocups.com)**.

## Reporting a conversion or website issue?

Please include the ingredient, amount, conversion direction and cup setting you used. Tell us the result shown and what you expected instead. You can add the page address in the form and include a source link in your message.

For a display or button problem, include your device and browser if you know them.

A different result does not always mean a calculation is wrong. Ingredient preparation, cup size and published reference weights can differ. Our [grams-per-cup chart](https://thegramstocups.com/grams-per-cup/) lists the references used, and our [methodology](https://thegramstocups.com/methodology/) explains the calculations.

## Suggest an ingredient or improvement

Tell us which ingredient or feature would help you and how you would use it. For ingredient requests, be specific about the type and preparation—for example, cooked rice rather than dry rice. A published weight reference is helpful if you have one.

## Looking for a quick explanation?

The [cup-size guide](https://thegramstocups.com/cup-sizes/) explains the calculator’s measurement settings and spoon sizes. To learn about the publisher and the purpose of the site, visit [About Grams to Cups](https://thegramstocups.com/about/).

<!-- END CONTACT COPY -->

## C. Final form labels, help text and states

Render a real, working form in the specified position. These labels and messages are final interface copy; implementation properties are not visible text.

| Field | Visible label | Required | Type and behavior |
|---|---|---|---|
| name | Name (optional) | No | Text, autocomplete=name; maximum 100 characters |
| email | Email address * | Yes | Email, autocomplete=email; maximum 254 characters |
| topic | Topic * | Yes | Native select, initially an empty nonvalid option labeled “Select a topic” |
| pageUrl | Page URL (optional) | No | URL field, maximum 2,048 characters; allow only HTTP/HTTPS links when provided |
| message | Message * | Yes | Multiline textarea, minimum 6 visible rows; maximum 5,000 characters |

Topic choices, in order:

- Conversion question
- Report an error
- Ingredient request
- Other feedback

Email helper: **Enter the address you’d like us to reply to.**

Page URL helper: **Link to the page your message is about, if relevant.**

Message helper: **For conversion questions, include the ingredient, amount, cup setting and result. Up to 5,000 characters.**

Privacy line, immediately before the submit button:

**Please share only the information needed to explain your question. Read our [Privacy Policy](https://thegramstocups.com/privacy/).**

Submit button: **Send message**

Submitting button: **Sending…**

Success heading: **Message submitted**

Success body: **Thank you. Your message has been submitted.**

General submission failure: **We couldn’t submit your message. Your details are still here—please try again, or email support@thegramstocups.com.**

Rate-limit message: **You’ve sent several messages recently. Please wait a few minutes and try again, or email support@thegramstocups.com.**

Validation messages:

- Missing email: **Enter your email address.**
- Invalid email: **Enter a valid email address, such as name@example.com.**
- Missing topic: **Choose a topic.**
- Invalid page URL: **Enter a full web address starting with https:// or http://, or leave this field blank.**
- Missing or whitespace-only message: **Enter your message.**
- Message too long: **Keep your message to 5,000 characters or fewer.**
- Name too long: **Keep your name to 100 characters or fewer.**
- Email too long: **Keep your email address to 254 characters or fewer.**
- URL too long: **Keep the page address to 2,048 characters or fewer.**

Use no attachments in this version. No marketing opt-in, newsletter subscription or mandatory “I agree” checkbox is part of this contact form.

## D. Antigravity implementation instructions — not website copy

### Incorporation and release

Implement this revision in the existing project. Keep `/contact/`, one H1 and the supplied self-canonical. Publish section B with the functional form and section C's interface copy. Do not expose package notes, field identifiers or placement markers.

This revision replaces the previous instruction not to add a form. The approved approach is now **working contact form plus visible email address**. Keep deployment on hold until the owner's completed-batch instruction. Do not publish a decorative form that cannot deliver a submission.

The live page previously retrieved on 29 September 2026 listed `support@thegramstocups.com`. Retain that destination. The address's appearance on the website does not prove mailbox deliverability. Verify mailbox configuration and end-to-end message receipt before release; neither has been tested in this content task.

Remove the earlier live-page promise of an “editorial team” reviewing inquiries within “48 business hours.” Do not add an unverified response-time commitment.

### Brand design: match the existing calculator card

Use the site's existing design tokens and components as the visual source of truth. Reuse its actual font families, terracotta colour, ivory background, border tones, radii and button styles rather than inventing a parallel palette or importing a generic form theme.

- **Page:** existing warm ivory background, dark serif H1/H2, shared header and dark footer. No large hero artwork. Keep the introduction compact.
- **Form card:** white surface, thin warm neutral border, the same corner treatment and restrained shadow as the primary calculator card. Use roughly 24–32px padding on desktop and 20px on mobile, adjusted to established site spacing tokens.
- **Width:** single centered column, maximum about 720px. Keep prose below around 65–75 characters per line. The form is the main visual element immediately after the introduction.
- **Fields:** use the site's body font and dark text. Use white or the existing very pale neutral input fill, with visible warm neutral borders. Inputs should be at least 48px tall, with 12–14px horizontal padding and 16px text. Labels sit permanently above inputs; placeholders must not replace them.
- **Grid:** at 640px and wider, name/email may share a two-column row and topic/page URL a second two-column row. Message spans the full card width. Below 640px, stack all fields in the same DOM order. Use approximately 16–20px gaps.
- **Button:** use the existing solid terracotta primary-action style and the site's accessible contrasting text colour. Keep the label “Send message.” Use a minimum 48px height; full width on mobile and content width on desktop. Match existing hover/pressed states without hover-only functionality.
- **Focus:** provide a clearly visible outline with offset, using an accessible darker brand token when the normal terracotta is too light. Do not remove native outlines without an equivalent replacement.
- **Helper text:** muted but readable, about 14px, placed under its field. Keep at least 4.5:1 contrast for normal-sized text and 3:1 contrast for control boundaries and focus indicators where required for identification.
- **Feedback:** place status messages inside the card near the button. Use a subtle surface and explicit text for success/error. Error fields get a clear border and adjacent error text; do not rely on colour alone.
- **Email alternative:** immediately below the card, with the address as selectable, underlined text linked to `mailto:support@thegramstocups.com`. Allow it to wrap without overflowing.

Avoid oversized decorative icons, floating labels, heavy gradients, social-media buttons or a fake office/contact-person card. Preserve the existing brand's calm editorial appearance.

### Accessibility and form behavior

Use a semantic form, native inputs/select/textarea, explicit label-for/id associations and a submit button. Link field helper and error text using aria-describedby; mark invalid fields with aria-invalid. Required markers must correspond to actual required controls.

Validate on submit and, after an error is shown, revalidate that field as it is corrected. Do not display errors on untouched fields as the page opens. Focus the first invalid field after a failed validation. Ensure keyboard order matches the visual/DOM order.

During submission, prevent duplicate clicks, show “Sending…” and expose the busy state without losing keyboard focus. Announce success with a polite status region; announce errors accessibly. Preserve every entered value on validation, server, network or rate-limit failure. Do not navigate away on failure.

Show success only after the server confirms acceptance by the actual delivery service or durable processing queue. A visual timer, client-side validation pass, button click or successful request to a no-op handler is not submission success. “Submitted” deliberately does not guarantee that a human has read the message or that final email delivery has completed.

After accepted submission, clear the form and retain a visible success confirmation. Allow the visitor to submit a new message. Do not store messages or email addresses in localStorage, analytics events or URLs. A normal in-memory form state is sufficient for retry after failure.

### Delivery and validation

Use the project's existing suitable server-side contact/email integration if present. Otherwise implement an appropriate server-side endpoint and delivery integration; keep provider-specific choices in implementation notes rather than visitor-facing copy. If credentials or mailbox access are missing, identify the exact configuration needed and retain the release blocker rather than pretending the form works.

- Send submissions to the configured support inbox, with the visitor's address as Reply-To. Use a verified site-owned sender, not the visitor's address as From.
- Keep delivery credentials server-side. Never expose keys or provider secrets in the browser bundle.
- Validate types, required fields, lengths, allowed topic values and URL protocol server-side, as well as in the browser. Trim surrounding whitespace; reject blank required values.
- Keep user text out of executable HTML and email headers. Safely encode any HTML email body; prevent header injection. Treat supplied links as text and do not fetch submitted URLs automatically.
- Apply reasonable request-size limits, server-side rate limiting and a bot honeypot excluded from keyboard/assistive-technology interaction. If additional bot challenges prove necessary, choose an accessible approach and reflect any third-party processing in the privacy policy.
- Avoid automatic acknowledgments in this version; they are not needed to meet the request.
- Handle delivery-service rejection and server errors as failures with retry guidance. If using a queue, provide operational retry/failure handling; do not silently discard accepted messages.

No new CRM, file uploads, public message listing or marketing workflow is needed.

### Privacy and internal links

Keep the policy link at `/privacy/`, as observed in the live footer. Before release, align the policy with actual form collection, purpose, delivery provider, retention and any spam-protection processing. Do not invent retention periods or claim information is never shared with service providers. No new legal claims are supplied by this package.

Preserve these contextual links:

| Destination | Purpose |
|---|---|
| `/grams-per-cup/` | Ingredient references and sources |
| `/methodology/` | Calculation and rounding explanations |
| `/cup-sizes/` | Cup and spoon settings |
| `/about/` | Site publisher and purpose |
| `/privacy/` | Applicable privacy information |

Preserve shared footer contact navigation and the About page's incoming link. Keep existing truthful publisher identifiers if using ContactPage structured data. No invented address, telephone number, support team, opening hours or response guarantee.

### Acceptance checks before the eventual batch deployment

1. Verify form layout at 390px, 768px and 1366px. Compare card, typography, inputs and button directly with the site's existing calculator styling. Confirm no page-wide horizontal overflow.
2. Complete the form with keyboard only. Check visible focus, persistent labels, required-field announcements and success/error announcements.
3. Verify required/invalid fields, whitespace-only messages, optional empty fields and length limits on both client and server.
4. Verify one valid submission reaches the configured inbox with correct content and Reply-To through an authorized project test. Provider acceptance and actual inbox receipt are separate checks.
5. Exercise server/network failure and rate limiting. Confirm entered content is retained and no false success appears. Confirm repeat clicks during submission do not send duplicate requests.
6. Verify the visible email and mailto link are both correct and usable independently of the form.
7. Confirm the privacy policy matches the implemented service and handling; remove unsupported team and response-time claims.
8. Verify one H1, supplied metadata, self-canonical and all contextual links.

These are implementation acceptance checks, not results of tests performed in this content-writing task. Keep deployment on hold until the owner's final batch instruction.

## E. Editorial and change record

This update retains the site's published support address and replaces the earlier email-only design with a branded, functional contact form. Name and page URL are optional; email, topic and message are required. The content remains concise and focused on useful questions and correction reports.

No website code, delivery configuration or live deployment was changed by creating this package. No test email has been sent. Antigravity should implement the specification in the existing project, verify delivery and interface behavior, and include it in the pending batch.
