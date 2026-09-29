# Live deployment: cross-page consistency and implementation review

Site: https://thegramstocups.com/  
Reviewed: 29 September 2026  
Purpose: review the deployed implementation and identify reproducible discrepancies. No site changes were made.

## Overall assessment

The deployment contains all 23 expected pages, and the main reference dataset and conversion tables are substantially consistent. The remaining problems are concentrated in older copy, secondary calculator formatting, small-input behavior and reference provenance. This calls for a focused correction pass, not another complete rewrite.

The findings below distinguish observed defects from matters requiring owner or backend verification. Antigravity should reproduce each issue against the current deployment before changing it, then report the cause, affected components and verification results.

## Scope update

Per the owner’s clarification, GA4 and Google Search Console will be configured together when the website is complete; their absence is excluded from this review’s findings. The owner confirms that the About-page identity and experience have been validated, so that finding is also removed. These are scope updates, not a new live-site verification.

## What passed

- All 23 expected pages returned HTTP 200. Each has one H1, a title, a description and the expected self-referencing canonical.
- The sitemap contains all 23 routes. robots.txt allows crawling and points to that sitemap. No meta robots exclusion was found in those HTML responses. This is not proof of Google indexing.
- All root-relative page-link targets found in those pages resolve to routes included in the successful crawl. No broken same-page fragment references were found. External source links were inventoried, not individually availability-tested.
- Independently recalculated **248 numerical table answers**: 168 rows across the ten ingredient conversion tables, 20 answers across the 50g/100g comparison tables, and all 60 printable-chart answers. All matched the adopted references with two-decimal rounding. Formatting differences are listed separately below.
- The central reference table consistently uses flour 120g, sugar 198g, butter 227g, packed brown sugar 213g, unsifted powdered sugar 113g, oats 89g, raw long-grain white rice 185g, honey 339g, olive oil 216g and whole milk 244g per baseline cup.
- Browser tests confirmed 100g flour → 0.83 US cups and 0.79 metric cups; 1 metric cup honey → 358.2g.
- Reverse-calculator quarter-cup tests correctly gave brown sugar 53.3g, powdered sugar 28.3g, oats 22.3g and rice 46.3g.
- Zero and negative input were handled separately in the tested grams-to-cups flow; negative input cleared the answer and displayed an error. Small positive cup output correctly displayed `<0.01` in the primary result.
- The contact form has the requested topic choices, optional name and page URL, visible support email, correct privacy link and field length limits. An empty submission displayed field-specific errors and focused the email field. No valid message was sent.
- The inspected contact and honey desktop views share the ivory background, serif headings, terracotta accents and white bordered cards. No whole-page horizontal overflow was detected in the inspected honey desktop viewport.
- Print button wiring invokes `window.print()`. Print-specific CSS hides navigation and other controls, makes table overflow visible and prevents row splitting. Final printed pagination remains unverified.

## Priority 1: resolve before calling implementation complete

### 1. Methodology still documents the rejected three-decimal rule

**Page:** [Methodology](https://thegramstocups.com/methodology/), “How results are rounded.”

**Observed:** It says calculator cups use “up to three decimal places” and that 250g flour can appear as `2.083` in the calculator versus `2.08` in a table. The adopted policy and current primary formatter use up to two decimals.

**Required outcome:** Explain one consistent policy: cups up to two decimals; grams up to one; unnecessary trailing zeros removed; full precision retained until display. Document the tiny-positive thresholds separately. The 250g flour example should show `2.08` in both places.

### 2. Alternative-reference output uses a different formatter and unsupported source labels

**Reproduction:** Open [Honey](https://thegramstocups.com/grams-to-cups/honey/) at 100g, US Customary; click “Compare with Commercial Conversion Charts.”

**Observed:** The primary 339g reference gives `0.29` cups, while the alternative 340g reference displays `0.3 cups`. But 100 ÷ 340 = 0.294117… and should also display `0.29` under the site's policy. Public bundle inspection confirms the comparison uses a one-decimal formatter.

A second test with flour at 0.5g showed primary `<0.01` but alternative `0 cups`.

**Provenance issue:** “Commercial Conversion Charts” and “Standard Kitchen Chart Rounding” are generic labels, not identifiable citations. Other alternatives include loose brown sugar at 170g and sifted powdered sugar at 100g without a linked source in the comparison. Do not treat these as verified references solely because they exist in the dataset.

**Required outcome:** Apply the same cup formatter and small-positive rule to every comparison. Retain alternative references only with a specific supporting source and preparation assumptions, or remove the unsupported comparison. Confirm the cited source actually supports the stated weight.

### 3. Practical spoon formatter does not fully meet the declared rounding contract

**Reproduction:** In a calculator, select flour, US Customary, grams → cups; enter `39.375`.

**Observed:** Decimal answer `0.33`; practical answer `⅓ cup`.

**Why it matters:** 39.375 ÷ 120 = 0.328125 cup = exactly 15.75 US teaspoons. A third cup is 16 teaspoons, an error of 0.25 teaspoon. This exceeds the intended maximum error of 0.125 teaspoon for nearest-quarter-teaspoon rounding. A correct decomposition is **¼ cup + 1 tbsp + ¾ tsp**.

At `0.5g` flour, the practical answer is `¼ tsp`; the actual amount is 0.2 teaspoon. Under our specified small-volume rule it should read **Less than ¼ teaspoon**. The deployed small-volume threshold is narrower than that rule.

**Also observed:** The result card does not show the promised spoon-standard helper. The metric test displayed “¾ cup + 2 tsp” without identifying 5mL teaspoons. Methodology explicitly tells visitors to check the displayed spoon standard.

**Required outcome:** Format from unrounded volume; use the quarter-teaspoon grid without a separate near-third shortcut that changes the tolerance; implement the specified less-than-quarter rule; display “US customary spoons” or “15mL tbsp · 5mL tsp” beside the practical answer. Recheck metric fractions against a 250mL cup, not an assumed 16 tablespoons.

## Priority 2: content and input consistency

### 4. Stale honey and oil cards remain on two major pages

**Pages:** [Homepage](https://thegramstocups.com/) and [Cups to grams](https://thegramstocups.com/cups-to-grams/).

**Observed:** Related-guide cards advertise honey as **336g/cup**, despite the calculator, honey article and reference table using **339g/cup**. Oil cards say “Cooking Oil” with “olive & vegetable” wording, although the adopted 216g reference is specifically olive oil and the oil article correctly warns against generalizing it.

**Required outcome:** Change these cards to 339g honey and olive oil wording. Ideally generate numerical card descriptions from the same ingredient data as the calculator. Do not globally replace every occurrence of 336: the honey article legitimately explains why 21g × 16 produces 336g and why the site instead uses the direct 339g cup entry.

### 5. Blank input is interpreted as a completed zero conversion

**Reproduction:** On the homepage, clear the grams field.

**Observed:** The field is empty but the result shows `0 US Customary Cups` and “Approximately 0 cups.” The bundle explicitly sets the state to zero for an empty string.

**Required outcome:** Distinguish empty from numerical zero. Empty input should prompt for an amount and clear the answer; explicitly entering zero should produce zero. Apply both directions consistently.

### 6. Tiny positive reverse conversions become zero grams

**Reproduction:** Select honey, cups → grams, US Customary; enter `0.00001` cup.

**Observed:** `0 Grams (g)`. The unrounded answer is 0.00339g.

**Required outcome:** Display `<0.1g` for positive raw results below 0.05g under the agreed policy. Preserve the raw value until the presentation layer so it is not rounded to zero before the threshold is tested.

### 7. Trailing-zero formatting is inconsistent across older and newer pages

**Observed:** Flour's table displays `0.50`, `1.00`, `2.50`; butter's table displays `1.10` and `2.20`. The printable chart and newer ingredient tables remove unnecessary zeros. The homepage common-conversion table has the same older formatting.

**Affected confirmed pages:** Homepage, Flour, Sugar and Butter.

**Assessment:** These figures are numerically correct. This is a consistency issue, not a calculation error.

**Required outcome:** Apply the chosen “up to two decimals, strip trailing zeros” policy to table cells and explanatory answers. Keep extra digits only where explicitly demonstrating an unrounded intermediate calculation.

## Priority 3: polish and follow-up verification

- **About description length:** 174 characters, above our editorial target of 160. Shorten if desired; this is not a hard Google validity limit or a demonstrated ranking defect.
- **Brand strings:** Some templates use “Grams to Cups,” others “The Grams to Cups”; homepage structured data uses “The Grams to Cups Converter.” Normalize the chosen public name in template labels and structured data where they represent the same entity.
- **Source attribution for butter:** Homepage explains 227g through ounce conversion; other pages cite the direct Land O'Lakes cup entry. These are not contradictory numbers, but using the direct adopted reference consistently would simplify the provenance story.
- **Sitemap dates:** The inspected sitemap uses 2026-09-26 dates. Check whether these correspond to the actual last substantive changes; do not automatically rewrite every date on every deploy.
- **Practical-measure presentation:** Honey displays `2.25 tsp` while other suggestions use typographic fractions. Prefer `2¼ tsp` if following the established kitchen-friendly format. This is presentation, separate from the arithmetic issue above.

## Coverage and limitations

Public HTML, metadata, internal links, structured-data JSON syntax, conversion tables, shared public JavaScript and print CSS were inspected. Browser interaction covered the homepage, reverse converter, Contact, printable chart and Honey; calculator ingredient selection also exercised flour, brown sugar, powdered sugar, oats and rice.

This was not a full mobile-device, keyboard/screen-reader, browser-compatibility, performance or accessibility certification. Desktop visual checks were sampled rather than performed on every page. No Lighthouse/Core Web Vitals results are claimed.

The print button was clicked and its handler and CSS inspected, but the environment did not expose a final rendered print preview for pagination inspection. Antigravity should verify saved A4 and Letter PDFs contain all 60 values, the cup standard, notes and reference/site address without clipping.

No valid contact form submission was sent. Hostinger delivery, server-side validation, rate limits, failure handling, SMTP credentials and mailbox deletion procedures therefore remain unverified. The visible empty-form validation is not proof of successful backend delivery.

The stated 60-day mailbox policy and five-business-day deletion commitment require an actual operating procedure, not just correct page copy.

## Suggested verification handoff

1. Reproduce findings 1–7 on the current production build and mark each confirmed, changed since review, or not reproducible with evidence.
2. Address shared formatting and source-data causes so corrections propagate across pages; avoid fixing isolated examples only.
3. Re-run the numerical table checks and the exact browser cases above after the patch.
4. Complete an owner-authorized contact-delivery test, mobile layout checks and real print-PDF checks.
5. Return a short page/component change list and the observed results. No additional content expansion is needed to resolve these findings.
