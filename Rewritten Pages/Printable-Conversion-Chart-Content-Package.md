# Printable conversion chart — final content and implementation package

Prepared: 29 September 2026.
Target URL: https://thegramstocups.com/conversion-chart/
Status: final publishable copy and browser-print specification. Incorporate now; hold deployment until the owner requests the completed batch push.

## A. Metadata

**Title:** Printable Grams to Cups Conversion Chart

**Meta description:** Keep a kitchen reference for flour, sugar, butter and more. Print cup equivalents for six common gram amounts across ten ingredients, with measuring notes.

**Canonical:** https://thegramstocups.com/conversion-chart/

**H1:** Printable Grams to Cups Conversion Chart

## B. Final website copy

Publish the copy between the main markers. Render the print button and printable region as instructed; HTML comments are not visible text.

<!-- BEGIN PRINTABLE CHART COPY -->

# Printable Grams to Cups Conversion Chart

Use this chart to look up **50g, 100g, 150g, 200g, 250g or 500g** of ten common ingredients. Every answer is in US Customary cups, using the ingredient preparation shown beside its name.

<!-- RENDER BUTTON: Print chart -->

Print the chart for your kitchen, or choose your browser's PDF option in the print dialog to save a copy.

<!-- BEGIN PRINTABLE REGION -->

## Grams to cups conversion chart

**Cup standard: US Customary, 236.588mL.** Column headings are weights in grams; every answer in the table is a cup amount. Values are approximate, rounded to a maximum of two decimal places.

| Ingredient and preparation | 50g | 100g | 150g | 200g | 250g | 500g |
|---|---:|---:|---:|---:|---:|---:|
| [All-purpose flour](https://thegramstocups.com/grams-to-cups/flour/), spooned and leveled | 0.42 | 0.83 | 1.25 | 1.67 | 2.08 | 4.17 |
| [Granulated sugar](https://thegramstocups.com/grams-to-cups/sugar/), white | 0.25 | 0.51 | 0.76 | 1.01 | 1.26 | 2.53 |
| [Butter](https://thegramstocups.com/grams-to-cups/butter/), not whipped | 0.22 | 0.44 | 0.66 | 0.88 | 1.1 | 2.2 |
| [Brown sugar](https://thegramstocups.com/grams-to-cups/brown-sugar/), packed | 0.23 | 0.47 | 0.7 | 0.94 | 1.17 | 2.35 |
| [Powdered sugar](https://thegramstocups.com/grams-to-cups/powdered-sugar/), unsifted | 0.44 | 0.88 | 1.33 | 1.77 | 2.21 | 4.42 |
| [Rolled oats](https://thegramstocups.com/grams-to-cups/oats/), dry, old-fashioned | 0.56 | 1.12 | 1.69 | 2.25 | 2.81 | 5.62 |
| [White rice](https://thegramstocups.com/grams-to-cups/rice/), raw, long-grain | 0.27 | 0.54 | 0.81 | 1.08 | 1.35 | 2.7 |
| [Honey](https://thegramstocups.com/grams-to-cups/honey/), strained/extracted | 0.15 | 0.29 | 0.44 | 0.59 | 0.74 | 1.47 |
| [Olive oil](https://thegramstocups.com/grams-to-cups/oil/) | 0.23 | 0.46 | 0.69 | 0.93 | 1.16 | 2.31 |
| [Whole milk](https://thegramstocups.com/grams-to-cups/milk/), fluid | 0.2 | 0.41 | 0.61 | 0.82 | 1.02 | 2.05 |

### Measuring notes

- Spoon flour into the measure and level it without packing. Pack brown sugar; use powdered sugar unsifted.
- The oat and rice rows are for dry, uncooked ingredients. The oil row is specifically olive oil, and the milk row is fluid whole milk, using a 3.3%-fat reference.
- Read decimal cups as decimals: 0.5 means ½ cup, while 0.25 means ¼ cup. A rounded answer close to a familiar fraction is not always an exact match.
- Follow your recipe's own gram measurements when available. If you have a scale, weigh the requested amount directly.

**References:** Published cup weights from [King Arthur Baking](https://www.kingarthurbaking.com/learn/ingredient-weight-chart), [Land O'Lakes](https://www.landolakes.com/kitchen-reference/measurements-abbreviations/) and the USDA's [Nutritive Value of Foods](https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf), revised in 2002. Ingredient-specific source details: [thegramstocups.com/grams-per-cup/](https://thegramstocups.com/grams-per-cup/).

**Grams to Cups · thegramstocups.com/conversion-chart/**

<!-- END PRINTABLE REGION -->

## How to use the chart

Choose the ingredient row, then move across to the gram amount in your recipe. For example, 250g of all-purpose flour is about **2.08 cups**, while 250g of granulated sugar is about **1.26 cups**.

The ingredient matters just as much as the weight. Keep the preparation consistent with the row: packed brown sugar and loosely filled brown sugar do not have the same reference weight per cup.

For an amount not shown, use the [grams-to-cups calculator](https://thegramstocups.com/). It also provides approximate cup-and-spoon suggestions when a decimal cup amount is awkward to measure.

## What if I use a metric cup?

This printable chart stays on the US Customary setting. A 250mL metric cup holds a different volume, so the same weight gives a different cup amount. Select Metric in the calculator rather than applying these numbers to a 250mL cup.

Our [cup-size guide](https://thegramstocups.com/cup-sizes/) explains the settings and spoon differences. The [methodology](https://thegramstocups.com/methodology/) explains the calculation and rounding rules behind the chart.

## Need a different view?

For a single weight, use the [50 grams to cups](https://thegramstocups.com/50-grams-to-cups/) or [100 grams to cups](https://thegramstocups.com/100-grams-to-cups/) chart. Select an ingredient name in the table for its full conversion guide and measuring advice.

If your recipe starts with cups and you need a weight, use the [cups-to-grams converter](https://thegramstocups.com/cups-to-grams/).

<!-- END PRINTABLE CHART COPY -->

## C. Antigravity implementation instructions — not website copy

### Incorporation and scope

Update the existing `/conversion-chart/` route with section A's metadata, one H1 and section B's final copy. Incorporate now; hold deployment until the owner's completed-batch instruction.

This page owns the multi-amount kitchen reference and printing workflow. Keep the table close to the top and the print action directly after the introduction. No large hero image or duplicated calculator is needed. The 50g and 100g pages remain focused amount lookups, and the grams-per-cup page owns the detailed source ledger.

This package specifies a browser-printable HTML chart. It does not include a separate downloadable PDF asset. Do not add a “Download PDF” link to a nonexistent file. The supplied copy accurately offers saving through the visitor's browser print dialog.

### Shared data and formatting

Generate all 60 table values from the shared final ingredient dataset and the original gram amounts. Do not copy old rounded values or scale the displayed 50g/100g answers to produce larger columns.

| Role | Base g per site US cup | Display scope |
|---|---:|---|
| flour | 120 | All-purpose, spooned and leveled |
| sugar | 198 | Granulated white sugar |
| butter | 227 | Standard, not whipped |
| brown-sugar | 213 | Packed, light or dark |
| powdered-sugar | 113 | Unsifted |
| oats | 89 | Generic dry old-fashioned oats |
| rice | 185 | Raw regular long-grain white rice |
| honey | 339 | Strained/extracted honey |
| oil | 216 | Olive oil |
| milk | 244 | Fluid whole milk, source 3.3% fat |

`cups = grams / baseGramsPerCup`

Use gram columns `[50, 100, 150, 200, 250, 500]`. Table values use up to two decimal places with half-up rounding for nonnegative values and unnecessary trailing zeros removed. Retain full internal precision. This is the latest owner-approved display policy and supersedes earlier three-decimal cup formatting instructions.

No small-value thresholds are reached in this table. If a shared formatter handles other inputs, preserve the established `<0.01 cup` behavior for positive cup values below 0.01 and exact zero behavior.

All printed values remain fixed to US Customary (236.588mL), regardless of any saved calculator preference. Keep that standard visible both on screen and in the printout. Assigning published culinary cup weights to the site's precise baseline is a site convention, not a lab measurement at that volume.

### Brand layout on screen

Reuse the existing ivory background, dark serif headings, white card surfaces, warm neutral borders, restrained terracotta accents and shared header/footer. Use the existing primary button style for `Print chart`, with visible focus and a touch target at least 44px high. Do not create a new colour theme.

The chart may be wider than the prose. Use a semantic seven-column table with a caption such as `Approximate US cups for common gram amounts`. Use scoped column headers and ingredient row headers. Left-align ingredients, right-align numeric values and retain the preparation qualifiers as smaller readable text within the first column.

Use subtle alternating row fills or fine rules, not heavy coloured cells. On mobile, keep text readable in a contained horizontal scroll region with an accessible label and keyboard scrolling where needed. Do not shrink the whole table to illegible text or cause page-wide overflow. A sticky ingredient column is optional on screen; remove sticky positioning for print.

Body text should remain around 16–18px. Keep prose near 65–75 characters wide, headings compact and link styling accessible and consistent. Check 390px, 768px and 1366px.

### Print workflow and print stylesheet

Implement the action as a real button invoking the browser print dialog. Both the button and the browser's own print command must use the same print stylesheet. Do not require a login, email address or external export service to print.

The printable region contains its heading, cup-standard note, complete chart, measuring notes, references and the short site-address footer. Print that region only. Keep it in the normal document rather than copying it into a separately maintained data template.

Print stylesheet requirements:

- Hide the site navigation, normal footer, main introduction, print button, content outside the printable region, ads and other nonessential controls. Use explicit page wrapper classes so hiding an ancestor does not accidentally hide the chart.
- Set a white page background with dark text. Remove shadows, decorative backgrounds and screen-only scroll constraints. The chart must not print as a clipped viewport.
- Target one landscape page on both US Letter and A4, using `@page` landscape orientation and sensible margins around 10–12mm. Browser settings may override CSS, so verify actual output rather than assuming support.
- Use readable print typography, starting around 10–11pt for table text and notes. Reduce decorative spacing before reducing text size. If one-page fit cannot be maintained legibly, allow a clean second page rather than clipping or shrinking excessively.
- Use full available table width, compact cell padding and approximately 28–32% of the width for the ingredient column. Give the six numeric columns consistent widths. Allow ingredient descriptions to wrap; do not remove them.
- Repeat table headers if the table spans pages. Avoid breaking individual rows across pages. Keep the title and standard note with the start of the table.
- Remove sticky positioning and fixed heights; use visible overflow for the print table container. Suppress automatic long URL suffixes on links. Keep the explicit short source-ledger URL and page address visible so the paper copy is traceable.
- The chart must remain understandable in grayscale and when background graphics are disabled. Do not rely on terracotta fills to convey meaning.

No runtime date stamp is required. Do not imply a fresh source review every time someone prints. Native browser headers/footers and PDF choices are controlled by the visitor's print dialog; do not promise to suppress them programmatically.

If JavaScript is unavailable, the chart must remain readable and printable through the browser menu. Show a short noscript note if needed: “Use your browser’s Print command to print this chart.” Do not show a false download or success notification after opening or canceling the print dialog.

### Internal links and metadata

Each ingredient label links to its existing guide. Preserve the body links to the main calculator, cup sizes, methodology, 50g page, 100g page and reverse converter, plus the source-ledger link within the printable region. Keep incoming links from the completed ingredient and amount packages.

No invented fragment links or preselection query parameters are supplied. Use accurate existing WebPage/breadcrumb markup. Do not add Recipe markup, fabricated ratings or promised search enhancements.

### Acceptance checks before eventual batch deployment

1. Check all 60 numeric cells against direct division by the adopted baseline, using the shared display formatter. Confirm screen and printed values are identical.
2. Confirm 100g values match the final 100g package and 50g values match the final 50g package. Verify the introductory worked examples: flour 250g → 2.08 cups; sugar 250g → 1.26 cups.
3. Verify butter, honey, olive oil and milk use the final adopted records, and oats use the generic 89g record. Keep preparation qualifiers visible in both views.
4. Test the print button, keyboard activation and browser-menu printing. Canceling the dialog should return to the unchanged page.
5. Inspect actual print previews or generated print-to-PDF output for both US Letter landscape and A4 landscape. Check every column, all ten rows, footnotes and source address for clipping and legibility. Verify with background graphics disabled.
6. Confirm screen scroll containers and sticky elements do not clip printed content. If the output spans two pages, ensure headers repeat and rows remain intact.
7. Check mobile/table accessibility, source/internal links, one H1, metadata and self-canonical.

These are implementation and print acceptance checks for Antigravity. They have not been run against website code during this content task. Do not call the printing feature implemented or verified until these checks pass. Deployment remains on hold.

## D. Source ledger and editorial verification

The current authoritative Grams-per-Cup package was read during the preceding amount-page work. This chart uses those ten adopted records without changing their source scope. Source publications are not claimed to have been updated on the package date.

- King Arthur Baking ingredient chart: all-purpose flour 120g, granulated sugar 198g, packed light/dark brown sugar 213g, unsifted confectioners' sugar 113g, generic old-fashioned/quick-cooking oats 89g per cup. https://www.kingarthurbaking.com/learn/ingredient-weight-chart
- Land O'Lakes, direct one-cup butter row: 227g. https://www.landolakes.com/kitchen-reference/measurements-abbreviations/
- USDA, Nutritive Value of Foods, HG72, revised October 2002: raw regular long-grain enriched white rice 185g (printed p.50, food 635), strained/extracted honey 339g (p.74, food 1005), olive oil 216g (p.24, food 175), fluid whole milk, no milk solids added, 3.3% fat, 244g (p.20, food 118). https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf

The USDA entries are historical household-measure references, not new 2026 laboratory tests. The chart's values are estimates calculated from the adopted weights. No perfect accuracy, source endorsement, independent kitchen testing or automatic PDF download is claimed.

This deliverable contains final page copy and implementation instructions. It does not modify website code, produce a standalone PDF, or deploy the print feature.
