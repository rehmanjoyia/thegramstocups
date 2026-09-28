# Cup sizes — final content and implementation package

Prepared: 28 September 2026.
Target URL: https://thegramstocups.com/cup-sizes/
Status: final publishable copy. Incorporate with the other completed packages; hold deployment until the owner requests the batch push.

## A. Metadata

**Title:** Cup Sizes Explained: US, Metric & Australian Measures

**Meta description:** Is your recipe using a 237mL, 240mL or 250mL cup? Compare cup sizes, choose the right calculator setting and check tablespoon differences.

**Canonical:** https://thegramstocups.com/cup-sizes/

**H1:** Cup Sizes: US Customary, US Legal and Metric

## B. Final website copy

<!-- BEGIN CUP SIZES COPY -->

# Cup Sizes: US Customary, US Legal and Metric

A cup is not always the same size. Our converter offers **US Customary (236.588mL), US Legal (240mL) and Metric (250mL)**. Choose the size that matches your recipe or measuring cup before converting between cups and grams.

## How many milliliters are in a cup?

| Cup setting | Volume of one cup | When to choose it |
|---|---:|---|
| US Customary | 236.588mL, about 237mL | A recipe using US customary measures |
| US Legal | 240mL | A recipe or reference specifying 240mL; also the cup definition used for US nutrition labeling |
| Metric | 250mL | A recipe or measuring cup specifying 250mL |

[NIST lists the US cup](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8) as 236.5882mL; our calculator stores it as 236.588mL. The [FDA's nutrition-labeling guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures) defines a cup as 240mL. That labeling definition does not mean every American recipe uses a 240mL cup.

For a 250mL example, the Australian publisher [taste.com.au's measurement guide](https://www.taste.com.au/images/common/Taste-Weights-Measurements-A3-V3.pdf) specifies a 250mL metric cup. Check the recipe's own notes rather than assuming every recipe from a particular country follows one standard.

## Which cup size should I use?

Look for a measurement guide on the recipe website, a note in the cookbook, or an mL marking on your measuring cup. An explicit volume is more useful than a cup's country label.

If the recipe provides grams, use those weights directly when you have a kitchen scale. If it provides its own grams-per-cup equivalent, follow that reference: the recipe writer may use a different ingredient or measuring method from ours.

For an American recipe with no further guidance, US Customary is a reasonable starting assumption. It is still an assumption. For a recipe that explicitly says 250mL per cup, select Metric in the [grams-to-cups converter](https://thegramstocups.com/) or [cups-to-grams converter](https://thegramstocups.com/cups-to-grams/).

## How much difference does cup size make?

A 250mL cup holds about **5.7% more volume** than our 236.588mL US Customary cup. It holds about **4.2% more** than a 240mL cup. Those are volume differences; the weight also depends on the ingredient.

For example, this site's all-purpose flour baseline is 120g per US Customary cup. Scaling that reference by cup volume gives:

| Selected cup | Estimated flour weight for one cup |
|---|---:|
| US Customary, 236.588mL | 120g |
| US Legal, 240mL | 121.7g |
| Metric, 250mL | 126.8g |

These are estimates from the same baseline, not three independently measured flour weights. Our [grams-per-cup chart](https://thegramstocups.com/grams-per-cup/) gives the ingredient references and sources.

For a fixed weight, the direction reverses: a larger cup means fewer cups are needed. For example, 100g of flour is about 0.83 US Customary cups or 0.79 metric cups using our references.

## Check the tablespoon size too

Cup size and spoon size are separate choices. The practical measuring suggestions on this site use the following combinations:

| Calculator setting | Tablespoon used | Teaspoon used |
|---|---:|---:|
| US Customary | About 14.787mL | About 4.929mL |
| US Legal | 15mL | 5mL |
| Metric | 15mL | 5mL |

Our US Customary tablespoon is one-sixteenth of the cup, and the teaspoon is one-third of that tablespoon. The other two settings use 15mL tablespoons and 5mL teaspoons.

**Australian tablespoon check:** taste.com.au's guide uses a **20mL tablespoon**, equal to four 5mL teaspoons. Selecting Metric on this site changes the cup to 250mL, but its spoon suggestions still use a 15mL tablespoon.

If your recipe specifies a 20mL tablespoon, measure that volume explicitly. For example, two Australian tablespoons are 40mL: use two 15mL tablespoons plus two 5mL teaspoons. Check the markings on your measuring spoons before following a spoon-based result.

## Common cup-size questions

### Is one cup always 16 tablespoons?

Only when the tablespoon is one-sixteenth of the selected cup. That works for our US Customary setting and for a 240mL cup with 15mL tablespoons. A 250mL cup holds 16⅔ tablespoons of 15mL, or 12½ tablespoons of 20mL.

### Does a 250mL cup hold 250g of every ingredient?

No. Milliliters measure volume; grams measure weight. Flour, sugar and oil have different weights at the same volume. Choose the ingredient as well as the cup size when converting.

### Can I use a mug instead of a measuring cup?

A mug may have a different capacity and may not show where the intended volume ends. Use a marked measuring cup, measure the required volume in milliliters, or use the recipe's gram weight with a scale.

For the calculation, rounding and practical measuring rules behind our results, see our [conversion methodology](https://thegramstocups.com/methodology/).

<!-- END CUP SIZES COPY -->

## C. Antigravity implementation instructions — not website copy

### Page and release scope

Incorporate this final copy now. Hold deployment until the owner's instruction to push the completed batch. Publish only section B between its markers; metadata and implementation notes are not body copy.

Retain `/cup-sizes/`, the supplied self-canonical and one H1. Do not create competing pages for each of the three settings. This page owns measurement standards and selection guidance; `/grams-per-cup/` owns ingredient weights and provenance; `/methodology/` owns calculation and rounding details.

The body describes the intended calculator behavior from the completed Methodology package. Verify that behavior before the batch goes live. If the existing formatter differs, align it with that package; do not publish a claim that the live tool does not fulfill.

### Shared cup and spoon constants

| Setting | Cup mL | Tablespoon mL | Teaspoon mL | Result helper label |
|---|---:|---:|---:|---|
| US Customary | 236.588 | 236.588 / 16 | 236.588 / 48 | US customary spoons |
| US Legal | 240 | 15 | 5 | 15mL tbsp · 5mL tsp |
| Metric | 250 | 15 | 5 | 15mL tbsp · 5mL tsp |

Use the full expressions internally. Display rounding in the article's spoon table must not become calculation constants. Add the applicable helper label next to practical measuring suggestions across converter instances, not solely on this reference page. Cup selection must be visibly associated with its mL volume.

Do not introduce an Australian spoon mode as part of this content update. The Australian example is an explanatory comparison, not a fourth calculator setting. Metric must not silently switch to 20mL tablespoons. If an Australian mode is later added, it needs an explicit spoon selector and corresponding formatter coverage.

Keep the final Methodology package's quarter-teaspoon rounding and decomposition contract. Do not assume that every cup contains 16 of the selected tablespoons. Metric uses 200 quarter-teaspoon units per cup; the other settings use 192. Practical results are rounded measuring suggestions, not exact ingredient weights.

All current ingredient inputs are the adopted cup-weight records from the Grams-per-Cup package. Continue using:

`adjustedGramsPerCup = baseGramsPerCup * selectedCupMl / 236.588`

`cups = grams / adjustedGramsPerCup`

`grams = cups * adjustedGramsPerCup`

The published source cup weights are assigned to the site's baseline as a disclosed site convention. Do not claim that NIST, FDA or taste.com.au independently validates these ingredient weights or the site's scaling method. Do not import taste.com.au's separate ingredient-weight table into the shared dataset.

### Layout and accessibility

Keep the established warm ivory background, dark serif headings, restrained terracotta accents and dark footer. Place the three-setting comparison directly after the introduction. No large hero illustration or duplicate calculator is needed on this reference page.

Use a small flour example table and a distinct, compact Australian-tablespoon callout. Keep the main content orderly, with modest section spacing, body text at 16–18px, comfortable line height and a prose measure around 65–75 characters. Tables may be wider.

Use semantic tables with captions and scoped headers. All three tables must remain readable at 390px; use contained horizontal scrolling only if needed, with an accessible scroll region. Check 768px and 1366px too. Avoid page-wide overflow. Use accessible, underlined brand-colour links and visible keyboard focus. Preserve shared navigation and footer.

### Internal links

The supplied contextual links point to the homepage, reverse converter, grams-per-cup chart and methodology. Preserve existing incoming links from ingredient guides and shared reference navigation. Do not add tracking parameters or unverified fragment links. No forced links to all ten ingredient pages are needed here.

### Acceptance checks before the eventual batch deployment

- Check the three selector values against the constants above in both conversion directions.
- With flour at 120g per baseline cup, one cup returns 120g, 121.7g and 126.8g respectively at the agreed display precision.
- For 100g flour, the cup values across calculators and tables are 0.83, 0.82, and 0.79 cups for US Customary, US Legal, and Metric respectively.
- Confirm switching the cup setting updates both the primary result and practical result label. No stale spoon label may survive a switch.
- Confirm 250mL divided by a 15mL tablespoon is 16⅔, not 16. The prose's Australian example is 2 × 20 = 2 × 15 + 2 × 5 = 40mL.
- Preserve full precision until final formatting. Apply the already specified rounding and small-value handling; do not derive new rules from the rounded article examples.
- Keep this article's comparison tables fixed. They show all settings simultaneously and should not mutate according to a calculator preference elsewhere.
- Verify each internal destination and external source opens correctly. Review mobile tables and keyboard access. These are implementation acceptance checks, not a claim that the UI has already passed them.

Use existing valid WebPage and breadcrumb markup if present. Do not add Recipe markup, invented credentials, ratings or review dates. The FAQs should remain visible text; no search enhancement is promised.

## D. Source ledger and editorial verification

Sources checked 28 September 2026. Source publication dates and access dates must remain distinct.

1. **NIST, Guide to the SI, Appendix B.8:** US cup listed as 236.5882mL. The site deliberately uses the previously established rounded constant 236.588mL. URL: https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8
2. **FDA, Guidelines for Determining Metric Equivalents of Household Measures:** General Information, item 9 supports the nutrition-labeling definitions of 240mL cup, 15mL tablespoon and 5mL teaspoon. The webpage identifies the guidance as October 1993. This is a source for definitions, not a claim of a new rule or advice on regulatory compliance. URL: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures
3. **taste.com.au, Weights & measurement charts:** One-page PDF, Metric cup & spoon sizes section supports 250mL full cup, 20mL tablespoon and 5mL teaspoon. Some fractional-cup entries are rounded for cooking; do not copy them as exact fractions. Its ingredient weights are outside this page's source scope. URL: https://www.taste.com.au/images/common/Taste-Weights-Measurements-A3-V3.pdf
4. **Internal references:** The final Grams-per-Cup and Methodology packages establish flour's 120g baseline, proportional scaling, rounding and calculator spoon conventions. Source for flour remains King Arthur's all-purpose flour entry: https://www.kingarthurbaking.com/learn/ingredient-weight-chart

Derived arithmetic: `(250 / 236.588 - 1) * 100 = 5.668926...%`; `(250 / 240 - 1) * 100 = 4.166666...%`; `120 * 240 / 236.588 = 121.730603...g`; `120 * 250 / 236.588 = 126.802711...g`. Article values are rounded appropriately. These calculations describe the site's model and are not new kitchen measurements.

No keyword-volume claims, universal country rules or independently tested accuracy claims have been added. This is final content for incorporation, with deployment held for the owner's completed-batch instruction.
