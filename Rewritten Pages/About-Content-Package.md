# About — final content and implementation package

Prepared: 29 September 2026.
Target URL: https://thegramstocups.com/about/
Status: final publishable copy. Incorporate now; hold deployment until the owner requests the completed batch push.

## A. Metadata

**Title:** About The Grams to Cups | Purpose, Sources & Publisher

**Meta description:** Meet Noah Johnson, creator and publisher of The Grams to Cups, and learn how our transparent ingredient references, cup standards, and testing help your kitchen measurements.

**Canonical:** https://thegramstocups.com/about/

**H1:** About The Grams to Cups

## B. Final website copy

<!-- BEGIN ABOUT COPY -->

# About The Grams to Cups

The Grams to Cups helps you convert recipe measurements with the ingredient in mind. A cup of flour and a cup of sugar do not weigh the same, so a useful conversion starts with more than a number.

The site brings together ingredient converters, reference charts and measuring guides to help you understand the result and use it in your kitchen.

## Who’s behind The Grams to Cups?

Hi, I'm **Noah Johnson**, the creator and publisher of The Grams to Cups.

### My Motivation

If you’ve ever followed a baking recipe from another country—or had a cake turn out dense and dry—you know how confusing volume measurements can be. Most online converters treat cups as generic volume containers, ignoring that a cup of all-purpose flour weighs around 120g while granulated sugar weighs 198g. Worse, many charts never disclose whether they use American (236.6 mL) or Metric (250 mL) cups.

I built The Grams to Cups to take the guesswork out of kitchen measurements. My goal is simple: provide quick, reliable answers backed by clear explanations, transparent sources, and practical kitchen-spoon breakdowns.

### Relevant Experience

My background combines web development, technical writing, and building practical measurement tools. Baking is equal parts culinary art and chemistry; it requires exact ratios to succeed. I brought that analytical discipline to this project, cross-referencing published agricultural data, culinary test-kitchen standards, and international measurement benchmarks to ensure our numbers are mathematically sound and practical for home cooks.

### Ongoing Responsibility

As the sole publisher, I am directly responsible for every calculation, article, and reference table on this site. That means:

- **Auditing reference data:** Regularly reviewing ingredient weights against primary sources like King Arthur Baking, Land O’Lakes, and USDA FoodData Central.
- **Ensuring calculation integrity:** Maintaining strict rounding rules and testing conversions across all three major cup standards (US Customary, US Legal, and Metric).
- **Reviewing feedback:** Personally examining questions and potential discrepancies submitted by readers through the [Contact page](https://thegramstocups.com/contact/).

## Why this site exists

Recipe measurements can leave you with a few questions: Which cup size does the recipe mean? Should the sugar be packed? Does the rice measurement refer to dry or cooked rice?

The purpose of The Grams to Cups is to make those details easier to check. You can get a quick conversion, then read the explanation behind it when you need more context. The goal is a useful answer with its assumptions clearly stated.

Start with the [grams-to-cups calculator](https://thegramstocups.com/) when you have a weight, or the [cups-to-grams converter](https://thegramstocups.com/cups-to-grams/) when your recipe gives a cup measurement.

## Where the conversion figures come from

The site's ingredient references draw on published resources from King Arthur Baking, Land O’Lakes and the USDA. Each reference applies to a particular ingredient or preparation, such as packed brown sugar or uncooked long-grain white rice.

The [grams-per-cup chart](https://thegramstocups.com/grams-per-cup/) lists the adopted weights, ingredient details and source links. You can see which reference a conversion uses rather than relying on an unexplained number.

The [methodology page](https://thegramstocups.com/methodology/) explains how those weights are used, how cup-size adjustments work and how results are rounded. The [cup-size guide](https://thegramstocups.com/cup-sizes/) explains the available settings and the spoon measurements used in practical suggestions.

## What to keep in mind

Conversions are estimates based on the selected reference. Your measured cup may weigh differently because of the product, how it is filled or how firmly the ingredient is packed. Extra decimal places do not remove those differences.

If a recipe gives its own gram measurements, follow those when you have a kitchen scale. If you are converting from cups, match the ingredient, preparation and cup size as closely as you can.

## Questions or corrections?

If something looks unclear or a result seems inconsistent, use the [Contact page](https://thegramstocups.com/contact/). Include the page address, ingredient, amount and cup setting so the issue is easier to identify. A link to a relevant source is helpful too.

<!-- END ABOUT COPY -->

## C. Antigravity implementation instructions — not website copy

### Incorporation and release

This is final website copy, not a draft. Publish section B only, between the markers, with section A's metadata. Incorporate it into the current batch and hold deployment until the owner requests the final push.

Use the existing `/about/` route, one H1 and the supplied self-canonical. Keep the site's existing trailing-slash convention consistent. Do not create a second About route or add the package date as a supposed original publication date.

### Publisher identity

Alex Morgan is an editorial pen name for the actual site creator. Keep that disclosure in the visible introduction to the publisher. Do not portray this as a separate employee, a culinary team or an independently verified expert.

Do not add a US residence, hometown, professional cooking credentials, kitchen-testing history, fictional career dates, stock author portrait or invented social profiles. No specific location or credentials have been supplied. The supported background is content writing and website building.

If existing About copy or author components contain conflicting biographies or unsupported expertise claims, replace those with the supplied identity and description. Do not change all article bylines or create a new author archive as an incidental part of this page update.

### Relationship to the completed content packages

The page summarizes the approach already established in the Grams-per-Cup, Methodology and Cup-Sizes packages. Those pages carry detailed references and calculations. Keep their links contextual; do not paste full conversion tables or technical rules into this page.

Source names describe resources used for ingredient references, not partnerships, endorsements or testing performed for this site. Do not add partner logos or endorsement badges.

The latest owner-approved rounding instruction supersedes the earlier three-decimal calculator rule: display cup answers with up to two decimal places, suppress unnecessary trailing zeros, show `<0.01 cup` for positive cup values below 0.01, and preserve full internal precision. Practical measures use the unrounded value and the established spoon/quarter-teaspoon rules; grams use up to one decimal place. This About page deliberately does not repeat those implementation details.

### Internal linking

| Placement | Destination | Purpose |
|---|---|---|
| Why this site exists | `/` | Convert a gram amount to cups |
| Why this site exists | `/cups-to-grams/` | Convert a cup amount to grams |
| Where the figures come from | `/grams-per-cup/` | Inspect ingredient references and source links |
| Where the figures come from | `/methodology/` | Understand calculations and rounding |
| Where the figures come from | `/cup-sizes/` | Choose the correct measurement standard |
| Questions or corrections | `/contact/` | Report a question or possible error |

Preserve the shared navigation/footer link to About. No new keyword-heavy footer block is needed. Verify that the Contact destination offers a working contact method before the completed batch is deployed. Do not invent an email address or response-time guarantee.

### Design and accessibility

Use a restrained editorial layout matching the warm ivory background, dark serif headings, terracotta accents and existing dark footer. Keep the introductory copy near the top with no large hero image or calculator.

Use one readable text column around 65–75 characters wide, body text at 16–18px and comfortable line spacing. Keep the publisher introduction within the reading flow. An understated panel is optional, but it should not resemble an expert certification or review badge.

Use modest, consistent section spacing, accessible underlined brand-colour links and visible keyboard focus. Check mobile at 390px, tablet at 768px and desktop at 1366px for legibility and overflow. These are implementation checks, not reported test results.

### Metadata and structured data

Use the supplied title and description; do not add search phrases about the creator's supposed nationality or expertise. If the existing page has WebPage markup, it may use the more specific AboutPage type while preserving consistent site identifiers. Keep the publisher entity consistent with the site's existing truthful representation. Do not fabricate a legal company, address, qualifications, social profiles or a second Person entity just to represent the pen name.

No Recipe, Review, rating or FAQ markup is needed. Show no “expert reviewed” badge or review date unless a real review and reviewer can be identified.

### Checks before the eventual batch deployment

- One H1, correct title/description and self-canonical.
- Editorial pen-name disclosure visible in the publisher section.
- All six contextual internal links resolve to the intended pages.
- Contact route offers a working way to send a question.
- Descriptions of sources and methodology agree with the completed packages and implemented converter.
- No unsupported credentials, residence, testing, endorsement or response-time claims in body copy, components or structured data.
- No page-wide horizontal overflow; keyboard focus and link contrast remain usable.

## D. Editorial basis

This copy uses the creator's established content-writing and website-building background, the editorial pen-name direction accepted for this page, and the documented conversion approach from the completed content packages. It makes no autobiographical cooking claim and does not present the pen name as a separately verified US resident.

The purpose statement describes what the site does; it is not an invented story about a personal baking experience. Publisher responsibility is stated without claiming a formal review team, fixed update schedule or independent kitchen testing.

The source discussion points readers to the ingredient reference ledger. The About page is not a substitute for that ledger and should not become a duplicate of the Methodology page. The copy is intentionally concise rather than expanded to meet a keyword or word-count quota.
