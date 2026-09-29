# 100 grams to cups — final content and implementation package

Prepared: 29 September 2026.
Target URL: https://thegramstocups.com/100-grams-to-cups/
Status: final publishable copy. Incorporate now; hold deployment until the owner requests the completed batch push.

## A. Metadata

**Title:** 100 Grams to Cups: Flour, Sugar & Ingredient Chart

**Meta description:** Find how much 100g is in cups for flour, sugar, butter and more. Compare ten ingredients, check measuring notes and choose the right cup size.

**Canonical:** https://thegramstocups.com/100-grams-to-cups/

**H1:** 100 Grams to Cups

## B. Final website copy

<!-- BEGIN 100 GRAMS COPY -->

# 100 Grams to Cups

**100g is about 0.83 US cups of all-purpose flour, 0.51 cups of granulated sugar or 0.44 cups of butter.** The answer depends on the ingredient. Find yours in the chart below before choosing a cup measurement.

## 100 grams to cups by ingredient

These estimates use this site's **US Customary cup setting, 236.588mL**. Cup answers are rounded to a maximum of two decimal places. The ingredient and preparation listed are part of each conversion.

| Ingredient | 100g in US cups, approximately | Preparation or type |
|---|---:|---|
| [All-purpose flour](https://thegramstocups.com/grams-to-cups/flour/) | 0.83 | Fluffed, spooned and leveled |
| [Granulated white sugar](https://thegramstocups.com/grams-to-cups/sugar/) | 0.51 | Dry granulated sugar |
| [Butter](https://thegramstocups.com/grams-to-cups/butter/) | 0.44 | Standard butter, not whipped |
| [Brown sugar](https://thegramstocups.com/grams-to-cups/brown-sugar/) | 0.47 | Packed, light or dark |
| [Powdered sugar](https://thegramstocups.com/grams-to-cups/powdered-sugar/) | 0.88 | Unsifted |
| [Rolled oats](https://thegramstocups.com/grams-to-cups/oats/) | 1.12 | Dry old-fashioned oats |
| [White rice](https://thegramstocups.com/grams-to-cups/rice/) | 0.54 | Raw, regular long-grain white rice |
| [Honey](https://thegramstocups.com/grams-to-cups/honey/) | 0.29 | Strained or extracted honey |
| [Olive oil](https://thegramstocups.com/grams-to-cups/oil/) | 0.46 | Olive oil, not every cooking oil |
| [Whole milk](https://thegramstocups.com/grams-to-cups/milk/) | 0.41 | Fluid whole milk; reference entry is 3.3% fat |

For another weight or a practical cup-and-spoon suggestion, use the [grams-to-cups calculator](https://thegramstocups.com/). Select the same ingredient and cup size as your recipe.

## Why doesn't 100g always equal the same number of cups?

Grams measure weight, while cups measure volume. Different ingredients have different weights in the same cup, so the same 100g can occupy more or less space.

The calculation is:

**Cups = 100 ÷ the ingredient's grams per cup**

For example, our flour reference is 120g per cup: **100 ÷ 120 = about 0.83 cups**. Our honey reference is 339g per cup, giving **100 ÷ 339 = about 0.29 cups**. These examples explain the table; they are not a reason to substitute one ingredient for another.

## How do I measure a decimal cup amount?

Decimal cups do not always match a marked measuring cup. For example, 0.51 cup is close to half a cup, but it is not exactly half.

If you have a scale and the recipe asks for 100g, weigh 100g directly. Without one, the calculator can suggest an approximate combination of cups and spoons. For **100g of all-purpose flour**, our US Customary reference gives **¾ cup + 1 tablespoon + 1 teaspoon**.

That example uses US customary spoons. Keep the same cup and spoon standard throughout; a tablespoon is not the same volume in every measuring system. Our [cup-size guide](https://thegramstocups.com/cup-sizes/) explains the differences.

## Check how the ingredient is measured

The brown-sugar row is for packed sugar, while the powdered-sugar row is for unsifted sugar. Filling either cup differently changes how well the reference fits your measurement.

The rice amount is for uncooked rice, and the oat amount is for dry oats. Do not use those rows for cooked portions. For flour, follow the [spoon-and-level measuring guide](https://thegramstocups.com/how-to-measure-flour/).

If your recipe provides its own gram equivalent, follow that reference. The table is a practical estimate, not a guarantee that every brand or cup you fill will weigh the same.

## Does this chart work with a 250mL metric cup?

The chart above stays on the US Customary setting. A 250mL cup is larger, so the same weight takes fewer cups under our proportional conversion method. For example, 100g of all-purpose flour is about **0.79 metric cups**, compared with **0.83 US Customary cups**.

Select Metric in the main calculator for that standard. See our [methodology](https://thegramstocups.com/methodology/) for how the site adjusts cup weights and rounds results.

## References and related charts

The adopted ingredient weights come from [King Arthur Baking](https://www.kingarthurbaking.com/learn/ingredient-weight-chart), [Land O'Lakes](https://www.landolakes.com/kitchen-reference/measurements-abbreviations/) and the USDA's [Nutritive Value of Foods](https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf), revised in 2002. Our [grams-per-cup chart](https://thegramstocups.com/grams-per-cup/) identifies each reference and its ingredient scope.

Need a different lookup? Use the [50 grams to cups chart](https://thegramstocups.com/50-grams-to-cups/) or the [printable conversion chart](https://thegramstocups.com/conversion-chart/) for more amounts.

<!-- END 100 GRAMS COPY -->

## C. Antigravity implementation instructions — not website copy

### Incorporation and page role

Use the existing `/100-grams-to-cups/` route, observed in the live navigation. Keep the supplied metadata, self-canonical and one H1. Incorporate this final copy now; hold deployment until the owner requests the completed batch push.

This is a fixed-weight, cross-ingredient lookup page. Place the comparison table directly after the introduction and its H2. Do not put a large hero image or a duplicate full calculator before it. Link to the main calculator for custom amounts and practical measures. If the old page has competing numeric output components, consolidate them with the supplied table rather than retaining conflicting figures.

The ingredient guides own detailed ingredient-specific charts. The grams-per-cup page owns reference weights and provenance. This page owns what 100g means across the ten selected ingredients. Do not create ten separate 100g ingredient pages merely to repeat its rows.

### Shared data and calculation contract

Read values from the same adopted ingredient dataset used by the calculators. Do not maintain independent approximate densities in this page's component.

| Ingredient role | Adopted base g per US cup | 100g in US cups |
|---|---:|---:|
| flour | 120 | 0.83 |
| sugar | 198 | 0.51 |
| butter | 227 | 0.44 |
| brown-sugar | 213 | 0.47 |
| powdered-sugar | 113 | 0.88 |
| oats | 89 | 1.12 |
| rice | 185 | 0.54 |
| honey | 339 | 0.29 |
| oil | 216 | 0.46 |
| milk | 244 | 0.41 |

All ten are adopted cup-weight references. The Grams-per-Cup package remains the authoritative selection: generic dry oats, not a separately branded oat product; raw regular long-grain white rice; honey at 339g; olive oil at 216g; fluid whole milk at 244g. Do not restore older oil/milk density assumptions or label olive oil as universally applicable vegetable oil.

`cupsFor100g = 100 / baseGramsPerCup`

For the metric example only:

`adjustedGramsPerCup = baseGramsPerCup * 250 / 236.588`

`metricCupsFor100g = 100 / adjustedGramsPerCup`

The published culinary cup weights are assigned to the site's 236.588mL baseline as a disclosed site convention, not a source-measured density at that precise volume. The table and introductory examples remain fixed to US Customary even if a calculator preference elsewhere is Metric. No new cup selector is required for this page.

### Display precision and practical example

Apply the latest shared cup display rule: up to two decimals, half-up rounding for nonnegative values, suppress trailing zeros. Keep full precision until formatting. A positive cup result below 0.01 displays `<0.01 cup`; zero remains zero. Although the fixed table has no such small value, do not fork a separate formatter.

Do not generate the 100g table by doubling the rounded 50g table. Compute every value directly from its baseline. Likewise, do not halve the displayed 100g result to generate the 50g page.

The flour example is exact under the adopted US reference: ¾ + 1/16 + 1/48 = 5/6 cup; multiplying by 120 gives 100g. Real-world measuring still has uncertainty. Use the stated US customary spoon volumes, not 15mL/5mL spoons with a 236.588mL cup. The site's other practical suggestions retain the established nearest-quarter-teaspoon rounding and “Approximately” label.

The metric flour example is 100 / (120 × 250 / 236.588) = 0.788626666… cups, displayed as 0.79. Do not round the metric grams-per-cup estimate first.

### Brand design and accessibility

Keep the established ivory background, dark serif headings, white surfaces, thin warm borders and restrained terracotta accents. The table is the page's main visual element; use a clean white table container with the site's existing radius/border tokens and no heavy decoration.

Use a semantic three-column table with the caption `100g in US Customary cups — ingredient-specific estimates`. Scope column headers and, where practical, ingredient row headers. Left-align ingredient and preparation text; right-align numeric answers. Ingredient names are the contextual links to their detailed guides.

On mobile, allow preparation text to wrap and avoid hiding it. Use contained horizontal scrolling if needed, with an accessible region; never cause page-wide overflow. Keep body text at 16–18px and prose around 65–75 characters wide. Use modest section spacing, accessible underlined links and visible keyboard focus.

Check 390px, 768px and 1366px for readable labels, table navigation and overflow. These are acceptance checks, not tests completed during content creation.

### Internal links and metadata

Preserve all ten ingredient-row links. The body additionally links to the main calculator, cup sizes, flour-measuring guide, methodology, reference chart, 50g page and printable chart. Retain incoming links from shared navigation and relevant amount/chart pages.

No new query parameters or unverified fragment links are supplied. The calculator link instructs the reader to choose the ingredient and standard rather than pretending it is automatically preselected.

Use accurate existing WebPage/breadcrumb markup. No Recipe markup, invented review ratings, author credentials or promised rich results. Do not add ten repetitive quantity FAQs or keyword-heavy blocks below the table.

### Acceptance checks before eventual batch deployment

- Verify all ten rows against the authoritative dataset and `100 / baseGramsPerCup`.
- Confirm introduction values agree with the flour/sugar/butter rows and their ingredient pages.
- Verify honey 0.29, oats 1.12, olive oil 0.46 and whole milk 0.41; these rely on the final selected references.
- Confirm the practical flour example and metric example use full precision and the correct measuring standards.
- Keep the static table visibly labeled US Customary and independent of any saved calculator setting.
- Check all row and contextual links, semantic headings, canonical and metadata.
- Check mobile/table accessibility and preserve ingredient preparation qualifiers.

No deployment is authorized by this package; keep the batch on hold.

## D. Source ledger and verification

The current Grams-per-Cup content package was reread on 29 September 2026 to confirm the authoritative ten-record dataset. These reference selections were researched in the preceding packages; this is a derived 100g lookup, not a new laboratory measurement or a claim that all source publications were updated today.

- King Arthur Baking ingredient chart: flour 120g; granulated sugar 198g; packed brown sugar 213g; unsifted confectioners' sugar 113g; generic old-fashioned/quick-cooking oats 89g per cup. URL: https://www.kingarthurbaking.com/learn/ingredient-weight-chart
- Land O'Lakes butter measurement table, direct one-cup row: 227g. URL: https://www.landolakes.com/kitchen-reference/measurements-abbreviations/
- USDA, Nutritive Value of Foods, Home and Garden Bulletin 72, revised October 2002: raw regular long-grain enriched white rice 185g (printed p.50, food 635); honey strained/extracted 339g (p.74, food 1005); olive oil 216g (p.24, food 175); fluid whole milk, no milk solids added, 3.3% fat, 244g (p.20, food 118). URL: https://www.ars.usda.gov/ARSUserFiles/oc/np/NutritiveValueofFoods/NutritiveValueofFoods.pdf

The USDA references are historical published household measures, not new 2026 density tests. Source preparation qualifiers and the site's baseline-assignment convention remain applicable. Full provenance belongs on `/grams-per-cup/`; this page links to that ledger and the original publications.

Final numerical QA checks direct division for all ten rows and the flour volume examples. No live calculator or visual browser testing is claimed. This work produces a content package for Antigravity, not a deployed page.
