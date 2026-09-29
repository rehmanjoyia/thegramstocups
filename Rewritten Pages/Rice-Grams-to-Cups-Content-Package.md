# Rice — final content and implementation package

Prepared: 29 September 2026.
Target URL: https://thegramstocups.com/grams-to-cups/rice/
Status: final publishable copy. Incorporate now; hold deployment until the owner requests the completed batch push.

## A. Metadata

**Title:** Rice Grams to Cups Converter & Uncooked Rice Chart

**Meta description:** Find the cup equivalent for your dry rice weight. Use a long-grain white rice chart and check the differences between cooked rice and rice-cooker cups.

**Canonical:** https://thegramstocups.com/grams-to-cups/rice/

**H1:** Rice Grams to Cups Converter

## B. Final website copy

<!-- BEGIN RICE COPY -->

# Rice Grams to Cups Converter

**100g of uncooked long-grain white rice is about 0.54 US cups**, using our reference of 185g per cup. Enter another dry rice weight below. This reference does not apply to cooked rice or a rice cooker's measuring cup.

<!-- INSERT SHARED CALCULATOR: uncooked long-grain white rice, grams-to-cups direction -->

**Reference:** The USDA's [Nutritive Value of Foods, page 50](https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf#page=56) lists raw, regular long-grain enriched white rice at 185g per cup. We adopt that weight for this site's US Customary setting. The publication was revised in 2002; this is a published household-measure reference, not a new test of your rice.

## Rice grams to cups

The chart uses **185g of uncooked long-grain white rice per US Customary cup**. Answers are approximate and rounded to a maximum of two decimal places.

| Uncooked rice weight | Approximate US cups |
|---:|---:|
| 25g | 0.14 |
| 50g | 0.27 |
| 75g | 0.41 |
| 100g | 0.54 |
| 125g | 0.68 |
| 150g | 0.81 |
| 175g | 0.95 |
| 185g | 1 |
| 200g | 1.08 |
| 225g | 1.22 |
| 250g | 1.35 |
| 300g | 1.62 |
| 350g | 1.89 |
| 400g | 2.16 |
| 500g | 2.7 |
| 750g | 4.05 |
| 1,000g | 5.41 |

For several ingredients in one kitchen reference, use the [printable conversion chart](https://thegramstocups.com/conversion-chart/).

## Are these measurements for cooked or uncooked rice?

They are for **uncooked rice**. Measure the dry grains before rinsing, soaking or cooking when using this reference.

Cooked rice includes absorbed water. Its weight and volume depend on the rice and preparation, so dividing a cooked portion's weight by 185 does not give a suitable cup estimate.

This converter also does not predict how much cooked rice your dry portion will produce. Follow your recipe or rice package for water amounts and cooking directions rather than treating a grams-to-cups conversion as a cooking ratio.

## Is a rice-cooker cup the same as a US cup?

Not necessarily. For example, [Zojirushi lists its included rice measuring cup at approximately 180mL](https://store.zojirushi.com/collections/rice-cookers). Our US Customary setting uses 236.588mL, so those cups are different sizes.

If your cooker instructions say to use the supplied cup, follow that cup and the matching instructions. Do not assume the cooker's cup markings use this page's US measure. Check your model's manual rather than assuming every appliance uses the same cup.

The calculator's Metric setting is **250mL**, not a 180mL rice-cooker setting. See our [cup-size guide](https://thegramstocups.com/cup-sizes/) for the three supported standards.

## How to measure rice for this conversion

With a scale, put an empty bowl on it, zero the display and add the requested weight of dry rice.

Without a scale, fill a dry measuring cup with loose grains and level the top. Avoid pressing the grains down to fit extra into the cup. Match the cup volume to the standard used for your conversion.

The estimate still depends on the rice. This page uses a regular long-grain white rice reference; it is not a universal weight for brown, short-grain, instant or every branded rice product. If your recipe or package supplies its own weight equivalent, follow that instead.

## How to convert rice grams to cups

For this page's US Customary reference:

**Cups of uncooked rice = grams ÷ 185**

For example, **250 ÷ 185 = about 1.35 cups**. Keep the full calculation internally and round the final answer.

To convert cups to grams, multiply by 185. Under the same reference, **½ cup is 92.5g** and **2 cups is 370g**. Switch direction in the calculator above, or use the [cups-to-grams converter](https://thegramstocups.com/cups-to-grams/) with uncooked long-grain white rice selected.

## What if I use a 250mL metric cup?

Choose Metric in the calculator. Scaling the adopted reference by cup volume gives about **195.5g per metric cup**. This is the site's calculated estimate, not a separate USDA metric-cup measurement.

The chart above stays on the US Customary setting. Read our [methodology](https://thegramstocups.com/methodology/) for the adjustment and rounding rules, or visit the [grams-per-cup chart](https://thegramstocups.com/grams-per-cup/) to compare ingredient references.

<!-- END RICE COPY -->

## C. Antigravity implementation instructions — not website copy

### Incorporation and scope

Update the existing `/grams-to-cups/rice/` route with the supplied metadata, self-canonical and one H1. Publish section B only; the calculator marker is an instruction, not visible text. Incorporate now; hold deployment until the owner's completed-batch instruction.

Place the shared calculator immediately below the short introduction and before the source note. On a fresh visit select `White rice (uncooked, long-grain)` or a similarly explicit established label, with grams-to-cups direction and a 100g example if consistent with shared initialization. Show the active standard and respect an explicit saved preference without mislabeling results as US.

The reference is regular long-grain white rice, raw; the exact USDA entry specifies enriched rice. Keep that complete description in the dataset/source ledger. Do not relabel this as a universal cooked-rice or all-rice converter, and do not create unsupported varieties from the same record.

The rice-cooker comparison is explanatory. Do not add a 180mL setting as an incidental content change or treat the 250mL Metric option as a rice-cooker cup. Keep cooking ratios and cooked yields outside this tool's scope.

### Shared calculation and display

Baseline: 185g per site US Customary cup.

`adjustedGramsPerCup = 185 * selectedCupMl / 236.588`

`cups = grams / adjustedGramsPerCup`

`grams = cups * adjustedGramsPerCup`

Supported cup volumes: 236.588mL US Customary; 240mL US Legal; 250mL Metric. The USDA household-measure reference is assigned to the site's precise baseline as a disclosed project convention. Do not describe the source as a density measured at exactly 236.588mL.

Keep the static chart fixed to US Customary, regardless of calculator selection. Calculate each row directly from its gram amount and the shared record.

Use the latest owner-approved display rule: cup results up to two decimals, half-up rounding for nonnegative values, suppress trailing zeros. Positive cup values below 0.01 display `<0.01 cup` before rounding; exact zero remains zero. This overrides older three-decimal cup instructions.

Gram outputs use up to one decimal, half-up rounding and suppressed trailing zeros. Positive gram values below 0.05 display `<0.1g`. Keep full internal precision, exact fraction ratios, and blank/invalid-input handling that clears stale results.

Practical suggestions follow the established Methodology formatter on unrounded values, with “Approximately” labeling and nearest-quarter-teaspoon rounding. US Customary spoons use 236.588/16 mL per tablespoon and 236.588/48 mL per teaspoon; US Legal and Metric use 15mL/5mL spoons. Keep the applicable helper label. Do not suggest the formatter uses the appliance's rice scoop.

### Brand design and accessibility

Use the established ivory background, dark serif headings, white calculator card, thin warm borders and restrained terracotta accents. Keep the calculator near the top. An existing raw-rice bowl image may be a small supporting visual; do not replace it with cooked rice imagery that obscures the page's scope.

Use a compact two-column semantic chart with scoped headers and caption `Uncooked long-grain white rice: grams to US Customary cups`. Right-align numbers. Keep the rice-cooker note as a modest callout or normal section, not a new conversion widget.

Body text should stay around 16–18px with comfortable line height and a prose width near 65–75 characters. Use accessible underlined links and visible keyboard focus. Check 390px, 768px and 1366px for readable tables, usable calculator controls and no page-wide overflow.

### Links and metadata

Preserve contextual links to the printable chart, cup-size guide, reverse converter, methodology and grams-per-cup reference. Retain incoming rice-row links from the 50g, 100g, printable and reference pages, all using the same raw-rice record.

Do not add unverified fragment links or query-based selection URLs. The USDA PDF fragment `#page=56` is the one-based PDF viewer page corresponding to printed page 50. Check the base PDF opens even if a browser ignores the fragment.

Use accurate existing WebPage/breadcrumb markup. Do not add Recipe markup, invented ratings, expert credentials, response guarantees or nutritional guidance. No separate recipe or serving-size claim is needed.

### Acceptance checks before eventual batch deployment

| Input and setting | Expected display |
|---|---|
| 50g, US Customary | 0.27 cups |
| 100g, US Customary | 0.54 cups |
| 185g, US Customary | 1 cup |
| 250g, US Customary | 1.35 cups |
| 500g, US Customary | 2.7 cups |
| 1 US Customary cup | 185g |
| ½ US Customary cup | 92.5g |
| ¼ US Customary cup | 46.3g |
| 2 US Customary cups | 370g |
| 1 US Legal cup | 187.7g |
| 1 Metric cup | 195.5g |
| 1g, US Customary | <0.01 cup |
| 0g | 0 cups |

Verify every chart row, both directions, exact fraction inputs, active-standard labels, practical suggestions and invalid/small-value handling. Confirm “uncooked” is visible in the selected ingredient and page context. Check that Metric stays 250mL and no 180mL mode is implied.

Confirm the static chart stays US Customary; verify links, metadata and responsive accessibility. These are implementation acceptance checks, not completed live-browser tests. Keep deployment on hold.

## D. Source ledger and editorial verification

Sources checked 29 September 2026:

1. USDA, Nutritive Value of Foods, Home and Garden Bulletin 72, revised October 2002: https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf — printed p.50, PDF viewer p.56, food 635. Parent headings identify white, long grain, enriched, regular; the raw row gives one cup at 185g. The adjacent cooked row is a different entry and is not adopted by this page.
2. Zojirushi rice cooker collection: https://store.zojirushi.com/collections/rice-cookers — states that included rice measuring cups have approximately 180mL capacity. Used only to illustrate why an appliance cup may differ from the site's standards; the user must follow their model's manual.
3. The existing Grams-per-Cup package establishes this same 185g reference across the site. Its USDA 2019 spreadsheet corroboration is retained in that ledger; no fresh alternative baseline is introduced here.

The USDA source's introductory cup volume is rounded to 237mL. Adopting the culinary weight at the site's 236.588mL baseline is a stated convention, not new laboratory data. The source edition remains 2002, not the access year.

All chart values derive from grams divided by 185. Quarter-cup weight is 46.25g, displayed as 46.3g with half-up rounding. Metric/legal equivalents are proportional calculations, not source-published weights. No cooked yield, water ratio, independent kitchen testing or universal rice density is claimed.

This package supplies final content and implementation guidance only. No website code, live calculator or deployment was changed by this task.
