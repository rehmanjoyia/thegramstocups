# Cups to grams — final content and implementation package

Prepared: 28 September 2026.
Target URL: https://thegramstocups.com/cups-to-grams/
Status: final publishable copy, ready for Antigravity to incorporate. Implement locally/in the project now; hold the deployment push until the owner confirms all remaining pages are complete.

## A. Metadata

**Title:** Cups to Grams Converter & Ingredient Conversion Chart

**Meta description:** Turn recipe cup measurements into grams for flour, sugar, butter and more. Check common cup fractions, choose your ingredient, and match your cup size.

**Canonical:** https://thegramstocups.com/cups-to-grams/

**H1:** Cups to Grams Converter

## B. Final website copy

Only content between the markers belongs in the article. Insert the shared calculator after the introduction and before the reference note. Calculator labels and fraction shortcuts are specified in Section C.

<!-- BEGIN CUPS TO GRAMS COPY -->

# Cups to Grams Converter

One US cup of all-purpose flour is about 120g; one cup of granulated sugar is about 198g.

Choose your ingredient and cup amount below to find the weight for your recipe.

**About the results:** These are estimates based on ingredient-specific reference weights. This page's chart uses our US Customary setting. If your recipe gives its own gram equivalent, follow that value.

## Cups-to-grams conversion chart

Find your cup amount in the first column, then read across to the ingredient you need. **All results are grams**, rounded to one decimal place where needed.

| US cups | All-purpose flour | Granulated sugar | Butter | Packed brown sugar | Unsifted powdered sugar |
|---|---:|---:|---:|---:|---:|
| ¼ | 30 | 49.5 | 56.8 | 53.3 | 28.3 |
| ⅓ | 40 | 66 | 75.7 | 71 | 37.7 |
| ½ | 60 | 99 | 113.5 | 106.5 | 56.5 |
| ⅔ | 80 | 132 | 151.3 | 142 | 75.3 |
| ¾ | 90 | 148.5 | 170.3 | 159.8 | 84.8 |
| 1 | 120 | 198 | 227 | 213 | 113 |

Flour and sugar references follow [King Arthur Baking's ingredient chart](https://www.kingarthurbaking.com/learn/ingredient-weight-chart). Butter uses the 227g-per-cup entry in the [Land O'Lakes butter table](https://www.landolakes.com/kitchen-reference/measurements-abbreviations/). Fractional amounts are calculated from those full-cup references, so they may differ slightly from separately rounded package measurements.

For preparation details, open the relevant guide: [flour](https://thegramstocups.com/grams-to-cups/flour/), [granulated sugar](https://thegramstocups.com/grams-to-cups/sugar/), [butter](https://thegramstocups.com/grams-to-cups/butter/), [brown sugar](https://thegramstocups.com/grams-to-cups/brown-sugar/) or [powdered sugar](https://thegramstocups.com/grams-to-cups/powdered-sugar/).

## How to convert cups to grams

Multiply the number of cups by the reference weight for one cup of that ingredient:

**Grams = cups × grams per cup**

For example, **1½ cups of all-purpose flour × 120g per cup = 180g**. The same cup amount of granulated sugar gives **1.5 × 198 = 297g**. Use a separate reference for each ingredient, even when their cup amounts match.

For mixed numbers, add the whole and fractional parts: 1¼ cups is 1.25 cups, and 2½ cups is 2.5 cups. Use the calculator's fraction shortcuts for ⅓ and ⅔ instead of rounding them to 0.3 and 0.6.

Already have the weight? Switch the direction above or use our [grams-to-cups converter](https://thegramstocups.com/).

## Turning a cup-based recipe into weights

1. **Check the ingredient and preparation.** Packed brown sugar needs the packed reference; unsifted powdered sugar needs the unsifted reference.
2. **Match the recipe's cup size.** Choose US Customary, US Legal or Metric as appropriate.
3. **Convert each ingredient separately.** Write down its gram result before moving to the next one.
4. **Weigh the result.** Put your bowl on the scale, zero it, then add the ingredient until you reach the converted weight.

The arithmetic can be consistent without reproducing an unknown recipe writer's exact cup-filling method. When the original recipe includes weights, those are the better starting point. Our [conversion methodology](https://thegramstocups.com/methodology/) explains how we choose and apply references.

For an offline reference, use the [printable conversion chart](https://thegramstocups.com/conversion-chart/).

## Which cup size should I select?

Use the standard specified by the recipe or the markings on its measuring cup. A US Customary cup is about 236.6mL, while the converter's metric cup is 250mL. The US Legal setting uses 240mL, the cup definition used for US nutrition labeling.

Those US volumes are documented by [NIST](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8) and the [FDA](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures). See our [cup-size guide](https://thegramstocups.com/cup-sizes/) for help interpreting a recipe.

The converter adjusts the reference weight in proportion to the selected cup volume. For example, one metric cup of flour is estimated at **126.8g**, compared with **120g** under our US Customary setting. This is a calculated adjustment, not a separate kitchen measurement. The chart above always remains in US Customary cups.

## More ingredient guides

For other ingredients, check the matching guide and preparation assumptions:

- [Rolled oats](https://thegramstocups.com/grams-to-cups/oats/)
- [Uncooked white rice](https://thegramstocups.com/grams-to-cups/rice/)
- [Honey](https://thegramstocups.com/grams-to-cups/honey/)
- [Cooking oil](https://thegramstocups.com/grams-to-cups/oil/)
- [Whole milk](https://thegramstocups.com/grams-to-cups/milk/)

Our [grams-per-cup reference table](https://thegramstocups.com/grams-per-cup/) brings the ingredient weights and assumptions together.

## Questions about converting cups to grams

### Is half a cup always 100g?

No. Under this page's references, half a cup is 60g of all-purpose flour, 99g of granulated sugar or 113.5g of butter. The ingredient determines which conversion to use.

### Can I convert the total cups in a recipe all at once?

Convert each ingredient first, then add the weights if you need a total. For example, one cup of flour plus one cup of granulated sugar gives **120g + 198g = 318g** under our references. Treating that as two cups of just one ingredient would give the wrong total.

<!-- END CUPS TO GRAMS COPY -->

## C. Antigravity implementation instructions — not website copy

### Delivery and deployment

This is final copy, not a draft awaiting another writing pass. Incorporate it in the project alongside the other packages. The owner will request the deployment push after all remaining pages are complete. Do not publish draft labels, package notes or source-ledger text in the article.

The same workflow applies to the earlier flour, sugar and butter packages: their prior draft/review labels should not appear on the site or block incorporation. Preserve their supplied website copy; deployment remains on hold.

### Distinct page behavior

- Keep `/cups-to-grams/` as a separate, self-canonical page with one H1. This page's purpose is cup-fraction lookup and conversion to weight. Do not canonicalize it to the homepage merely because it shares a calculator component.
- Reuse the shared calculator; default to cups-to-grams, all-purpose flour, US Customary and 1 cup. The first result must be 120g, not a leftover grams-to-cups result.
- Initial input label: `AMOUNT IN CUPS`. Ingredient label: `INGREDIENT`. Cup selector label: `Cup size`. Initial unit: `g` / `grams`.
- Keep both direction controls. When switching, update labels, units and calculations together; no stale answer may remain. Preserve the selected ingredient and standard.
- Add compact fraction shortcut buttons: `¼`, `⅓`, `½`, `⅔`, `¾`, `1`. Accessible names should describe their values, such as “One-third cup”. Selecting a shortcut sets the cup amount and recalculates without moving keyboard focus.
- Store thirds as exact ratios internally, not as 0.3 or 0.6. A rounded display of 0.333 is acceptable only if the selected fraction remains visible and the internal value is still one-third. Manual editing replaces the preset value. Do not silently interpret a user-entered 0.3 as one-third.
- Decimal input must accept values such as 1.25, 1.5 and 2.5. The copy does not promise typed fraction strings; adding a fraction parser is not required by this package.
- Use input helper text: `Enter a decimal, such as 1.5 for 1½ cups, or choose a fraction below.` This is final UI copy.
- Default numerical result format: round grams to one decimal, suppress a trailing `.0`. Label results as approximate and show the ingredient/reference. Keep full precision for calculation.
- Label controls, expose selected direction, provide keyboard access and announce result changes through an appropriate live region. Blank input should prompt for an amount; negative or non-finite input must show a clear error instead of the previous valid result. Zero should return zero.

### Dataset and formulas

The verified chart subset uses these full-cup weights:

| Ingredient | Grams per site US Customary cup | Preparation |
|---|---:|---|
| All-purpose flour | 120 | Fluffed, spooned and leveled |
| Granulated white sugar | 198 | Granulated, dry |
| Butter | 227 | Standard butter, not whipped |
| Brown sugar | 213 | Packed |
| Powdered sugar | 113 | Unsifted |

Use the same shared dataset as the homepage and ingredient pages. Do not duplicate the values inside a separate calculator implementation. This package does not independently certify the other five calculator ingredient references; their dedicated packages and the forthcoming reference-table work must settle those before the final deployment.

`adjustedGramsPerCup = baseGramsPerCup * selectedCupMl / 236.588`

`grams = cups * adjustedGramsPerCup`

Selected volumes: US Customary 236.588mL, US Legal 240mL, Metric 250mL. Assigning culinary cup weights to this exact baseline is the site's convention. Source charts do not establish a measured density for every ingredient at that precise volume. Alternate-standard results are proportional estimates.

Round the final chart/result to one decimal, with halves rounded up for these nonnegative quantities: 53.25 becomes 53.3; 56.75 becomes 56.8. Avoid intermediate rounding and binary floating-point tie inconsistencies. In particular, use the unrounded baseline rather than doubling a separately rounded half-cup package figure.

### Acceptance checks

| Input / interaction | Expected |
|---|---|
| Initial page load | Cups → grams selected; 1 US cup all-purpose flour → 120g |
| ¼ US cup flour | 30g |
| ⅓ US cup flour preset | 40g, calculated from one-third |
| Manual 0.3 US cup flour | 36g, not 40g |
| ⅔ US cup sugar preset | 132g |
| 1.5 US cups sugar | 297g |
| ¼ US cup packed brown sugar | 53.25g internally → 53.3g displayed |
| ¾ US cup butter | 170.25g internally → 170.3g displayed |
| 1 US cup powdered sugar | 113g |
| 1 Metric cup flour | Approximately 126.8027g → 126.8g |
| 1 US Legal cup flour | Approximately 121.7306g → 121.7g |
| Change calculator standard | Dynamic answer/reference updates; fixed US chart keeps its label |
| Clear or invalidate input | Helpful prompt/error, no stale result |

The static chart's 30 numerical entries must match these calculation rules. Check the updated component in both directions; new reverse controls must not regress ingredient pages.

### Layout and design

Keep the preferred warm ivory background, dark serif headings, white calculator card, terracotta accents and existing footer. Do not turn this into a long introductory article.

| Block | Presentation |
|---|---|
| Hero | Short normal-weight introduction; bold only the key values. Calculator immediately below. |
| Calculator | Same prominent card as the main tool; fraction shortcuts fit below the input without crowding the cup selector. |
| Reference note | Compact tinted callout below the tool. |
| Fraction chart | First H2; readable semantic table, not an image. Caption: “Approximate grams for common US Customary cup amounts”. |
| Formula | Small panel and two contrasting ingredient examples. |
| Recipe workflow | Four short numbered steps; no repeated general density essay. |
| Cup size | Brief explanation; do not add the homepage's entire cup-standard table. |
| Ingredient guides | Display all ten ingredient links as a balanced directory here: use the five named links beneath the chart and the five in “More ingredient guides”. Keep the chart links where useful; brief repeated navigation links are acceptable. Two rows of five on wide layouts if legible, two columns on small screens. Avoid four-plus-one isolated cards. |
| FAQs | Two visible answers with modest vertical gaps. |

Use readable prose widths around 65–75 characters and wider containers for the chart and tool. Keep existing typography and consistent section spacing. Apply accessible dark brand-coloured underlined links; preserve focus states.

For the wide table, use scoped row and column headers, a caption and a contained, keyboard-accessible horizontal scroll region on narrow screens. Show a small scroll cue only when overflow exists. Keep the cup column easy to follow. Do not shrink table text excessively or introduce page-wide overflow. Check approximately 390px, 768px and 1366px widths before final release.

### Internal linking

| Destination | Role |
|---|---|
| `/` | Opposite-direction task, linked in the formula section |
| Five baking ingredient pages | Preparation details beneath the table and ingredient directory |
| Oats, rice, honey, oil and milk pages | Remaining ingredient directory |
| `/methodology/` | Reference selection and calculation limits |
| `/conversion-chart/` | Printable/offline task |
| `/cup-sizes/` | Cup standards |
| `/grams-per-cup/` | Master ingredient-weight reference |

Preserve the existing incoming navigation and ingredient-page reverse links. Use plain crawlable links. Do not invent query parameters for ingredient preselection unless that behavior is implemented and tested. Existing ingredient URLs have grams-to-cups slugs; label their links as ingredient guides rather than claiming a different reverse-only page exists.

### Search and content boundaries

Primary topic: cups to grams converter. Supporting tasks: half/third/quarter cup in grams, mixed cup amounts and ingredient-specific weights. This package follows the planned reverse-conversion topic; it does not claim new measured keyword volumes.

Do not create duplicate synonym URLs, copy the homepage article, or add repetitive FAQs for every chart cell. Preserve useful shared reference facts while keeping this page's main function and examples focused on starting with cups.

Use supplied metadata. Render article text, table and links as crawlable HTML. Do not add fabricated reviews, credentials, testing statements, or Recipe markup. No ranking or rich-result guarantee is made.

## D. Source ledger and handoff notes

Sources checked 28 September 2026; linked at relevant claims in the final copy:

1. King Arthur Baking ingredient chart — https://www.kingarthurbaking.com/learn/ingredient-weight-chart — flour 120g/cup; granulated sugar 198g; packed brown sugar 213g; unsifted powdered sugar 113g.
2. Land O'Lakes butter table — https://www.landolakes.com/kitchen-reference/measurements-abbreviations/ — 227g/cup butter.
3. NIST SP 811 Appendix B.8 — https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8 — US cup volume.
4. FDA metric-equivalents guidance — https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures — 240mL nutrition-label cup, verified during preceding project research.

Fractions and worked examples are calculations, not original kitchen measurements. No arbitrary conversion of one cup to a universal gram value is used. Fraction shortcuts and display behavior are implementation requirements, not claims that the existing live tool already supports them.

The final copy is ready to incorporate. Antigravity should inspect the current component, implement the specified behavior, run the acceptance checks, and retain the changes for the owner's later deployment instruction.
