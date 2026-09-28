# Butter page content package

Prepared: 28 September 2026.
Target URL: https://thegramstocups.com/grams-to-cups/butter/
Status: editorial draft and implementation handoff. No live changes made.

## A. SEO metadata

**Title:** Butter Grams to Cups Converter & US Stick Chart

**Meta description:** Check how much butter your recipe needs in cups, grams or US sticks. Find common conversions, measuring tips, and guidance for melted and whipped butter.

**Canonical:** https://thegramstocups.com/grams-to-cups/butter/

**H1:** Butter Grams to Cups Converter

Scope: standard butter, with US stick equivalents. This is not a butter-substitution guide or a universal density reference for whipped butter, spreads or ghee.

## B. Publishable page copy

Publish only the content between the markers. Insert the shared calculator after the introductory paragraph and before the reference note. Do not publish editorial instructions.

<!-- BEGIN BUTTER PAGE COPY -->

# Butter Grams to Cups Converter

100g of butter is about **0.44 US cups**, using our 227g-per-cup reference. Enter your butter weight below, or check the chart for a common recipe amount.

**Reference:** The [Land O'Lakes butter conversion table](https://www.landolakes.com/kitchen-reference/measurements-abbreviations/) lists 227g per cup. We use that reference for standard butter under this site's US Customary setting. Follow your recipe's own weight equivalent when one is provided.

## Butter grams-to-cups conversion chart

All answers below use **227g of butter per US Customary cup**, rounded to two decimal places.

| Butter weight | Approximate US cups |
|---:|---:|
| 25g | 0.11 |
| 50g | 0.22 |
| 75g | 0.33 |
| 100g | 0.44 |
| 113g | 0.50 |
| 125g | 0.55 |
| 150g | 0.66 |
| 170g | 0.75 |
| 200g | 0.88 |
| 225g | 0.99 |
| 227g | 1.00 |
| 250g | 1.10 |
| 300g | 1.32 |
| 400g | 1.76 |
| 500g | 2.20 |

These are decimal cups: 0.50 means ½ cup, and 0.75 means ¾ cup. A rounded answer is an estimate. For example, 113g rounds to 0.50 cup here, but exactly half of our 227g reference is 113.5g.

Need a reference for other ingredients too? Keep our [printable conversion chart](https://thegramstocups.com/conversion-chart/) nearby.

## How many US sticks of butter are in a cup?

One standard US stick is **½ cup or 8 US tablespoons**; two sticks make one cup. The wrapper often provides useful cutting marks, as shown in the Land O'Lakes guide linked above.

| US butter measure | US cups | US tablespoons |
|---|---:|---:|
| ½ stick | ¼ | 4 |
| 1 stick | ½ | 8 |
| 1½ sticks | ¾ | 12 |
| 2 sticks | 1 | 16 |

Check the package before using stick counts. This table refers to standard US sticks, not every block or package sold elsewhere.

## How to convert butter grams to cups

Divide the butter weight by this page's reference:

**US cups of butter = grams of butter ÷ 227**

For example, **250 ÷ 227 = 1.1013…**, or about **1.10 US cups**. Calculate with the full reference and round only the final answer.

To go the other way, multiply US cups by 227: **¾ cup × 227 = 170.25g** under this convention. Use the reverse toggle above or select butter in the [cups-to-grams converter](https://thegramstocups.com/cups-to-grams/).

## Why do some charts use 226g instead of 227g?

Rounding can explain the difference. [King Arthur Baking's ingredient chart](https://www.kingarthurbaking.com/learn/ingredient-weight-chart) lists half a cup of butter as 4 ounces or 113g. Doubling that rounded gram value gives 226g.

Converting 8 ounces directly gives about 226.8g, which rounds to 227g, using [NIST's ounce-to-gram conversion](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8). Our calculator keeps 227g as its consistent full-cup reference. Neither rounded figure makes a cup measurement exact.

If a recipe specifies 225g, 226g or another weight, weigh that amount rather than changing it to match this chart.

## Measuring butter for your recipe

**With a scale:** Place a bowl on the scale, zero it, and add the stated weight of butter. This avoids having to estimate an awkward fraction such as 0.44 cup.

**With a marked wrapper:** Use the cup or tablespoon marks for the amount requested. For an unmarked block or leftover pieces, weighing is more straightforward than estimating a fraction by eye.

**When melting butter:** If the recipe asks for a quantity of butter followed by “melted,” measure that quantity first, then melt it. If it explicitly requests a measured amount of already-melted butter, follow that instruction. This converter does not model changes in liquid volume with temperature.

## Questions about converting butter

### Does this work for whipped butter or butter spreads?

Do not assume those products have the same weight per cup as standard butter. [Land O'Lakes advises measuring whipped butter by weight rather than volume](https://www.landolakes.com/kitchen-reference/ingredients-substitutions/powdered-sugar/). For spreads or blended products, follow the package and recipe guidance; this chart does not establish that they are suitable substitutes.

### What about browned butter?

Use the weight and measuring stage specified by the recipe. [King Arthur explains that browning butter evaporates water](https://www.kingarthurbaking.com/blog/2020/01/08/brown-butter), so the starting weight and finished weight differ. Do not use this standard-butter conversion to predict the amount remaining after browning.

### Does a 250mL metric cup give the same result?

No. Under our volume-scaling method, 100g of butter fills about **0.42 metric cups**, compared with **0.44 US Customary cups**. These are calculated estimates, not separate kitchen measurements. Choose the cup setting your recipe uses; the chart on this page stays in US cups. Our [cup-size guide](https://thegramstocups.com/cup-sizes/) explains the standards, and our [methodology](https://thegramstocups.com/methodology/) explains the calculation.

## More baking conversions

Use the [flour converter](https://thegramstocups.com/grams-to-cups/flour/) or [granulated sugar converter](https://thegramstocups.com/grams-to-cups/sugar/) for the rest of your recipe, or return to the [grams-to-cups converter](https://thegramstocups.com/) to select another ingredient.

<!-- END BUTTER PAGE COPY -->

## C. Antigravity implementation notes — not website copy

### Identity and behavior

- Preserve the existing butter URL. Use the supplied title, description, self-referencing canonical and one H1.
- Reuse the shared calculator with butter, grams-to-cups, US Customary and 100g selected initially.
- Keep the reverse toggle and shared calculation logic. No new reverse-conversion URL is needed for butter.
- Show the chosen ingredient and unit clearly in the result. If a user changes the ingredient or cup standard, keep the static article tables explicitly labelled for butter and US measures.
- Label every field and cup selector, preserve keyboard focus states, announce result changes without moving focus, and replace stale answers when input becomes invalid. Treat blank and zero distinctly.
- Use an accurate source label: Land O'Lakes directly lists 227g/cup. King Arthur lists 113g per half cup; do not attribute a direct 227g/cup entry to King Arthur. This clarification supports the existing numeric baseline and does not require changing other pages during this task.

### Calculation contract and acceptance values

Baseline: 227g per site US Customary cup at 236.588mL. This assignment is the site's declared convention. The manufacturer chart supplies a culinary equivalent; it does not establish that butter has an experimentally measured density of 227g per precisely 236.588mL at every temperature. Its general metric section contains rounded equivalents; do not silently replace the site's baseline with those.

`adjustedGramsPerCup = 227 * selectedCupMl / 236.588`

`cups = grams / adjustedGramsPerCup`

`grams = cups * adjustedGramsPerCup`

Calculate at full precision. Main table displays two decimals; retain the calculator's established three-decimal display if applicable.

| Check | Expected |
|---|---|
| 100g, US Customary | 0.440528… cups; 0.441 at three decimals, 0.44 at two |
| 113g, US Customary | 0.497797… cups; 0.498 at three decimals, 0.50 at two |
| 227g, US Customary | 1 cup |
| 250g, US Customary | 1.101321… cups |
| 500g, US Customary | 2.202643… cups |
| 0.5 US cup | 113.5g using the declared calculator baseline |
| 0.75 US cup | 170.25g |
| 1 US Legal cup, 240mL | Approximately 230.2737g |
| 1 Metric cup, 250mL | Approximately 239.8685g |
| 100g, Metric 250mL | 0.416895… cups; 0.42 at two decimals |

Reference labels must change with the selected standard. Do not show 227g per metric cup. Keep the full reference in calculations even if labels display one decimal.

The stick chart is a US package reference, not a chart that should change when the calculator cup setting changes. Do not redefine a stick as half a metric cup. Do not add a gram-to-stick calculator in this content task; any future feature must distinguish nominal 4-ounce package weight from the site's rounded full-cup baseline.

Check practical fractions and spoon output independently of decimal results. Do not silently use 16 tablespoons per cup for every international cup/spoon combination. Approximate outputs need an explicit approximation label.

### Visual layout

Preserve the original warm ivory palette, dark serif headings, terracotta accents, white calculator card, subtle borders and established footer. Keep the opening short and mostly normal weight.

| Block | Presentation |
|---|---|
| Hero and tool | H1, short introduction, calculator. No large image above the calculator. |
| Reference | Small tinted callout beneath the tool with the source link. |
| Main chart | First H2 section; all 15 rows readable with compact row padding. |
| US sticks | Four-row table. An optional small wrapper illustration must have accurate US markings; do not use decorative art as measurement evidence. |
| Formula | Compact formula panel and one worked example. Keep the reverse explanation brief. |
| Rounding explanation | Short prose, not a large warning panel. |
| Measuring guidance | Three short labelled paragraphs. |
| FAQs | Three visible answers with modest gaps; no excessive vertical whitespace. |
| Related conversions | Three equal cards for flour, sugar and the homepage. |

Keep prose around 65–75 characters per line; calculator and tables may use wider containers. Preserve the existing type scale, using 16–18px body text and roughly 1.6 line height as starting points if needed. Keep section spacing consistent. Use accessible dark terracotta underlined links rather than browser-default blue, with visible focus indicators.

Provide table captions and scoped headers. At approximately 390px, 768px and 1366px, inspect calculator controls, table wrapping and card layout. Contain table scrolling if required; avoid page-wide horizontal overflow. These are implementation checks to perform, not tests already completed here.

### Internal links and page boundaries

| Destination | Placement |
|---|---|
| `/conversion-chart/` | After the main table; printable reference |
| `/cups-to-grams/` | Reverse calculation paragraph |
| `/cup-sizes/` | Metric FAQ |
| `/methodology/` | Metric FAQ; scaling assumptions |
| `/grams-to-cups/flour/` | Related card |
| `/grams-to-cups/sugar/` | Related card |
| `/` | Related card returning to the general tool |

Retain the homepage's contextual butter link. The flour and sugar drafts already link here. Do not add separate URLs for each butter amount merely to reproduce table rows. Keep detailed browning, substitution and general cup-size tutorials out of this page.

### Publication boundary

Only Section B is website copy. Preserve crawlable HTML for its text, links and tables. Do not invent author credentials, testing claims, review dates or ratings; do not use Recipe markup for a conversion tool. This document supplies copy and implementation instructions, not deployment. Resolve source-label and calculator discrepancies before treating the implementation as complete.

## D. Keyword and editorial coverage

Continue the ingredient-page strategy informed by the supplied US competitor reports. No new search volumes or traffic forecasts are claimed.

- Primary topic: butter grams to cups / grams to cups butter.
- Quantity lookups: 50g, 100g, 113g, 125g, 150g, 200g, 225g, 227g, 250g and 500g, with other useful quantities in the same table.
- Butter-specific utility: US sticks, tablespoons and rounded package weights.
- Distinct explanation: 226g versus 227g per cup and why doubling rounded half-cup weights differs.
- Brief scope guidance: melted, whipped and browned butter; metric cup setting.
- Reverse task: concise explanation and link, rather than a second full reverse-conversion article.

This page is not a find-and-replace version of the flour or sugar copy. Its supporting sections address butter packaging and preparation. No word-count quota or forced repetition of query wording is required.

## E. Source ledger and verification

Checked 28 September 2026:

1. Land O'Lakes, Measurements + Abbreviations: https://www.landolakes.com/kitchen-reference/measurements-abbreviations/ — the butter table directly supports 227g/cup and standard US stick/cup/spoon relationships. Do not confuse its specific butter table with the coarser rounded general conversions lower on the page.
2. King Arthur Baking, Ingredient Weight Chart: https://www.kingarthurbaking.com/learn/ingredient-weight-chart — butter is listed at 4 ounces/113g per half cup. Used to explain rounding, not as a direct 227g/cup entry.
3. NIST SP 811 Appendix B.8: https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8 — avoirdupois ounce-to-gram conversion and US cup volume, verified in preceding project research. Eight ounces are approximately 226.796g.
4. Land O'Lakes, Kitchen Ingredients & Common Substitutions: https://www.landolakes.com/kitchen-reference/ingredients-substitutions/powdered-sugar/ — despite the URL suffix, this retrieved page contains a Butter section instructing measurement of whipped butter by weight rather than volume.
5. King Arthur Baking, How to make brown butter: https://www.kingarthurbaking.com/blog/2020/01/08/brown-butter — water evaporates during browning.

All gram-to-cup chart values are calculations from the site's stated reference, not kitchen measurements. Metric scaling is an estimate under the shared project convention.

The search tool could not retrieve the live butter page in this turn. This is replacement copy for the established URL, not a fresh functional or visual audit. Antigravity must inspect the current page and shared component before implementation.
