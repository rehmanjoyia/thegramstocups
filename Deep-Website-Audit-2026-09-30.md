# Deep website audit — The Grams to Cups

**Site:** https://thegramstocups.com/  
**Review date:** 30 September 2026, Asia/Karachi; requests made on 29 September UTC.  
**Scope:** Current public deployment, all 23 content pages, calculator interactions, numerical consistency, sources, technical SEO, accessibility, contact-form behavior and asset delivery.  
**Excluded as agreed:** GA4/Search Console setup and the owner-confirmed About-page identity and experience. No site changes or valid contact submissions were made.

## Assessment

The website is materially improved since the previous review. The main calculator and tables are consistent in the cases tested, and most earlier defects are fixed. The site does not need another wholesale content rewrite.

The highest-priority remaining work is **correcting unsupported alternative-source attributions and making the contact form safe when JavaScript fails**. Next come keyboard focus, text contrast, the missing social-preview image and the disappearing fraction shortcuts. Asset optimization and URL normalization are worthwhile finishing work, not evidence that the site is broken or cannot rank.

This is a public-deployment audit, not a blanket certification of every device, backend control or performance metric. Evidence and limits are identified below.

## What I checked

| Area | Coverage and result |
|---|---|
| Published pages | All 23 expected routes returned HTTP 200. |
| Numerical tables | **299 answers independently recalculated; no numerical mismatches.** Includes 168 ingredient-table answers, 20 amount-chart answers, 60 printable-chart answers, 30 reverse-chart answers and 21 homepage common-conversion answers. |
| Interactive primary calculations | **60 cases passed:** ten ingredients × three cup standards × two directions. Tested 100g → cups and ¼ cup → grams. |
| Practical spoon output | **30 cases passed** the maximum ⅛-teaspoon error allowance for nearest-¼-teaspoon rounding. Largest measured error in this set was approximately 0.124 teaspoon. |
| Previous input regressions | Blank, zero, negative, very small input and the 39.375g flour case retested. Corrected behavior observed. |
| Crawl signals | Single H1, unique title and description, correct self-canonical on all 23 pages. No meta/header noindex found. |
| Discoverability | All 22 other content pages are linked directly from the homepage. No orphan among the expected routes. |
| Internal links | Every root-relative page destination found in the crawl belonged to the successful 23-route inventory. |
| Sitemap/robots | Sitemap includes all 23 canonical routes; robots allows crawling. Sitemap dates now show 2026-09-29. |
| Redirects/errors | HTTP and www homepage variants redirect to HTTPS apex with 308. A deliberately nonexistent route returned a real 404. Other URL variants remain available; see finding 10. |
| Structured data | JSON parsed successfully. FAQ answer text matched page text in the inspected markup. No Recipe or review-rating markup was found in the inventoried schema types. |
| External links | 22 unique external destinations checked: 18 returned 200; four restricted this inspection. Restrictions are not reported as broken links. |
| Contact validation | Empty form, malformed email and non-HTTP(S) URL rejected with specific errors. Focus moved to the first invalid field. No valid submission sent. |
| Assets | Shared JS, CSS, logo and favicon returned 200. The referenced social image returned 404. |
| Visual inspection | Sampled desktop calculator, contact and chart layouts. Contact retains the established brand styling; chart had no horizontal overflow at the inspected desktop width. |

The 60 interactive checks used the adopted base weights: flour 120g, sugar 198g, butter 227g, packed brown sugar 213g, unsifted powdered sugar 113g, oats 89g, raw long-grain white rice 185g, honey 339g, olive oil 216g and whole milk 244g. Cup scaling used 236.588mL, 240mL and 250mL. Arithmetic agreement with these references does not mean every physically filled cup will weigh that amount.

## Previous review: current status

| Previous finding | Current status |
|---|---|
| Three-decimal methodology wording | **Fixed.** Now states two decimals for cups, one for grams, with the small-positive thresholds. |
| Alternative comparison formatting and sourcing | **Partly fixed.** Precision now follows the cup formatter; unsupported source attribution remains, with new specific King Arthur claims. |
| Spoon rounding and missing spoon standard | **Fixed in tested cases.** 39.375g flour now gives ¼ cup + 1 tbsp + ¾ tsp; 0.5g gives less than ¼ teaspoon. Spoon-standard labels are present. |
| Honey 336g and generic-oil cards | **Fixed** on homepage and reverse converter. |
| Blank input becomes zero | **Fixed.** An empty field prompts for an amount in both directions. |
| Tiny positive reverse answers become zero | **Fixed in retest.** Small positive weight displays `<0.1`. |
| Trailing-zero inconsistency | **Main affected tables corrected.** A minor `120.0g` reference remains in the flour cup-size comparison. |

The About meta description was also shortened to 155 characters. The homepage now uses the adopted direct Land O'Lakes butter reference.

## Findings requiring attention

### 1. High priority — alternative conversions claim support the named source does not provide

**Evidence: browser-observed output, public application data, and direct inspection of the named source.**

Select brown sugar or powdered sugar in a grams-to-cups calculator, enter 100g and expand its alternative comparison.

| Alternative displayed | What the referenced King Arthur chart actually lists |
|---|---|
| “King Arthur Baking (Unpacked)” with a statement that the chart lists loosely filled brown sugar at approximately **170g/cup** | Brown sugar, dark or light, **packed: 213g/cup**. I found no corresponding unpacked 170g entry in that chart. |
| “King Arthur Baking (Sifted)” with a statement that the chart gives sifted confectioners' sugar approximately **100g/cup** | Confectioners' sugar, **unsifted: 113g/cup**. I found no corresponding sifted 100g entry in that chart. |

These are not objections to the primary 213g and 113g references, which match the chart. Nor does this prove that no source anywhere uses the alternative values. The defect is attributing those values to this specific chart without support.

The flour alternative still names USDA Food Buying Guide and 125g/cup without a direct source link or precise record. That attribution also needs a traceable citation before being considered verified. The separate King Arthur branded-oats 113g entry does exist; do not remove a supported alternative merely because another one is unsupported.

**Expected outcome:** Remove unsupported comparisons or supply an actual primary reference matching the weight, ingredient and preparation. Do not repair an unsupported value by simply assigning it another credible-sounding source name. Add clickable source links to the comparison itself.

**Acceptance check:** A reviewer can open each alternative's citation and identify the exact supporting entry. Preserve the validated primary references and formulas.

Source: [King Arthur Ingredient Weight Chart](https://www.kingarthurbaking.com/learn/ingredient-weight-chart).

### 2. High priority — contact form has an unsafe native fallback

**Page:** https://thegramstocups.com/contact/  
**Evidence: confirmed HTML/DOM configuration; consequence inferred from standard browser behavior. No message was submitted to reproduce it.**

The delivered form is `<form id="contact-form" novalidate>` with no `method` or `action`. Its controls have names including `name`, `email` and `message`, and its button is a submit button. The browser resolves this to:

- Method: `get`
- Action: `https://thegramstocups.com/contact/`
- Native validation disabled: `true`

The normal JavaScript handler intercepts submission and posts JSON to the backend. However, if the module fails to load or initialize, native submission can append those named fields to the page URL. That could expose message contents in browser history and request logs, and it would not follow the intended SMTP delivery flow.

**Expected outcome:** Make submission safe before JavaScript initializes. Either implement a genuine supported POST fallback, or keep the form disabled until its handler is ready and present an email fallback when scripting is unavailable. Do not point a native HTML POST at a JSON-only endpoint without adapting the backend. Address the disabled-native-validation state as part of the fallback.

**Acceptance check:** With the module blocked, dummy fields must never appear in the URL. With normal loading, validation and actual backend delivery must still work. Run the delivery test only with owner authorization.

Source: [MDN form submission methods](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) documents GET as the default and its query-string behavior.

### 3. Medium priority — calculator updates discard keyboard focus

**Evidence: reproduced in the browser.**

On the homepage, focus the ingredient selector and press Arrow Down. The ingredient changes, but `document.activeElement` becomes `BODY`. Pressing Enter on the conversion-direction button also leaves focus on `BODY`.

The calculator rebuilds controls during these changes. Keyboard users consequently lose their position instead of remaining on the selector or direction control. Continued keyboard navigation becomes less predictable.

**Expected outcome:** Update the necessary values without replacing the focused control, or restore focus to its corresponding replacement after rendering. Keep the existing live-result announcement.

**Acceptance check:** After changing ingredient or cup size using the keyboard, focus remains on that selector. After activating a direction button, focus remains on that button or moves to the amount field in a deliberate, documented way. The next Tab advances logically.

### 4. Medium priority — calculator reference text falls below the normal-text contrast threshold

**Evidence: measured from computed foreground/background colors.**

The reference and measuring-method text in `.provenance-line` uses:

- Foreground: `rgb(120,113,108)` / `#78716C`
- Effective result-card background: `rgb(245,242,235)` / `#F5F2EB`
- Font size: approximately 13px
- Contrast: **4.29:1**

This is below the WCAG AA 4.5:1 requirement for normal text. The darker labels pass; the lighter source details do not. The same muted color against the page's lighter background narrowly passes, so the problem should be corrected by context rather than assuming every occurrence fails.

**Expected outcome:** Darken the result-card reference text or lighten its background enough to reach at least 4.5:1. Keeping a little margin above the threshold is preferable.

Source: [W3C Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum).

### 5. Medium priority — social-sharing image is missing across all pages

**Evidence: all-page metadata inspection and a direct HTTP request.**

All 23 pages set both `og:image` and `twitter:image` to:

`https://thegramstocups.com/og-image.png`

That URL returned **404**. Social platforms therefore cannot retrieve the intended preview image from these tags; whether a platform uses a fallback varies.

**Expected outcome:** Deploy the intended image at the referenced path or update the tags to a real public image. Verify its content type and dimensions. A brand preview around 1200 × 630 pixels is a reasonable implementation choice, not a hard universal requirement.

**Acceptance check:** The exact referenced image URL returns 200 with the intended image, and a refreshed sharing preview renders it.

### 6. Medium priority — reverse-converter fraction shortcuts vanish after initialization

**Page:** https://thegramstocups.com/cups-to-grams/  
**Evidence: delivered HTML compared with rendered DOM.**

The raw page includes buttons for ¼, ⅓, ½, ⅔, ¾ and 1 cup, plus instructions to choose a fraction. After the application initializes, it replaces that markup. The live calculator contains only the two direction buttons; no fraction buttons remain.

Visitors must then enter decimals manually. This particularly weakens the experience for thirds, for which a rounded typed decimal does not preserve the exact ratio.

**Expected outcome:** Implement the shortcuts in the actual calculator component, preserving exact internal fractions, or deliberately remove the unused fallback controls and provide clear decimal-entry guidance. For this tool, implementing them is the more useful outcome.

**Acceptance check:** Shortcuts remain visible after initialization and after changing ingredient, direction and cup size. Choosing ⅓ cup of flour under the US Customary setting gives 40g from an exact one-third value.

### 7. Medium priority — calculator fallback looks interactive although it cannot recalculate

**Evidence: confirmed pre-rendered HTML and initialization code; not a live JavaScript-disabled browser test.**

The raw calculator has enabled amount inputs and selectors alongside fixed example answers. It contains no no-script explanation. If the module does not initialize, the homepage visitor can change the visible 100g field or ingredient while the static 0.83-cup answer remains unchanged. The same pattern is present on the other calculator pages.

**Expected outcome:** Render the fallback as a clearly labeled static example with disabled controls until initialization, or provide a real non-JavaScript conversion path. Keep the useful static tables and source content accessible.

**Acceptance check:** Blocking the calculator module must leave an honest static state, not an editable form with stale output. When the module loads, controls enable and work normally.

### 8. Medium priority — oversized shared logo is an avoidable payload cost

**Evidence: downloaded asset size and rendered dimensions.**

`/logo.png` is **376,414 bytes**, with intrinsic dimensions **2172 × 724**. In the inspected desktop page it renders at roughly **200 × 67**, and the second logo element uses it at **108 × 36**.

For comparison, the inspected JS and CSS files together contain 49,498 bytes. The logo file alone is about 7.6 times that combined size. These are resource byte sizes, not a measured Core Web Vitals result or a claim that the image is necessarily the LCP element. Repeated elements can reuse one downloaded resource.

**Expected outcome:** Export appropriately sized, optimized logo variants, including a suitable high-density version. Choose a format that preserves the brand and transparency, and keep explicit dimensions. Evaluate AVIF/WebP or a properly optimized PNG; do not convert an intricate raster logo into an unnecessarily large traced SVG.

**Acceptance check:** Visually compare the replacement at normal and high-density display sizes, and record its actual transfer-size reduction. Preserve the current layout dimensions.

### 9. Low priority — fingerprinted JS/CSS are configured for revalidation

**Evidence: HTTP response headers.**

Both `/assets/main-B9yWwVgy.js` and `/assets/main-DpZGC6zo.css` return:

`Cache-Control: public, max-age=0, must-revalidate`

Their filenames are fingerprinted. They are therefore candidates for a long browser-cache lifetime with immutable caching, provided changed contents always receive a new filename. Current revalidation does not mean the full file is necessarily downloaded on every visit; conditional responses can avoid the body.

**Expected outcome:** Configure long-lived caching for genuinely versioned build assets. Retain an appropriate freshness policy for HTML and for unversioned resources such as `/logo.png`.

**Acceptance check:** A new deployment emits new asset names when content changes, while repeated visits can reuse unchanged hashed resources without unnecessary revalidation.

### 10. Low priority — duplicate URL variants remain publicly accessible

**Evidence: direct requests and inspection of their canonical tags.**

| Variant | Response | Declared canonical |
|---|---|---|
| `/index.html` | 200 | `/` |
| `/grams-to-cups/flour` | 200 | `/grams-to-cups/flour/` |
| `/grams-to-cups/flour/index.html` | 200 | `/grams-to-cups/flour/` |

The canonical annotations are correct, so this is **not a demonstrated duplicate-content penalty or indexing failure**. It is an opportunity to make URL handling cleaner and prevent alternate addresses circulating.

**Expected outcome:** Where compatible with the routing setup, redirect equivalent variants to the chosen canonical path in one hop, preserving legitimate query parameters. Do not introduce redirect loops or block variants in robots as a substitute for consolidation.

Source: [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Additional polish — keep separate from functional defects

- The powdered-sugar alternative currently displays **“1 cups.”** Use singular units for an exact displayed one, and the correct singular less-than label where appropriate.
- The flour cup-size comparison retains **120.0g**, while the adopted display convention removes unnecessary zeros. This is numerically correct.
- The homepage has no skip-to-main link. Adding one would make repeated navigation easier for keyboard users; this observation alone is not a complete determination of bypass-blocks compliance.
- Older simple tables generally have header cells but less consistent caption and `scope` markup than newer pages. Standardize their semantics; absence of `scope` on a simple table alone is not proof that screen readers cannot associate its headers.
- Source labels in grams-to-cups result cards are plain text, whereas the reverse result has a clickable primary source. Make provenance equally easy to inspect in both directions.
- Three font families are requested. Review actual usage before reducing this set; this is an optimization opportunity, not a measured performance failure.

## SEO and content conclusions

The homepage, reverse calculator, amount comparisons, ingredient articles and reference guides have distinct purposes and useful interlinks. There is no evidence in this review that the reverse page should be removed as duplicate content. The site’s explanations of preparation, cup size and approximation are useful and largely consistent with the calculators.

All 23 titles are at or below 60 characters; all descriptions are at or below 160. These are the project's editorial targets, not hard Google length limits. Titles/descriptions are unique. All pages have a single main landmark, `lang="en"`, and one H1. No duplicate IDs or unmatched label targets were found in the inspected raw HTML. The shared logo images have explicit dimensions and alt text.

The current FAQ structured data was syntactically valid and matched the text checked. **Do not treat adding more FAQ schema as a visibility priority:** Google's current documentation says FAQ rich results stopped appearing from 7 May 2026. Keep useful questions for readers; this audit does not recommend removing helpful FAQ content. Source: [Google Search documentation updates](https://developers.google.com/search/updates).

Correct internal links, canonicals and a sitemap support discovery, but they do not establish that Google has indexed or ranked every page. No ranking forecast, traffic guarantee or Search Console account claim is made here.

## External source availability

Eighteen of the 22 unique linked destinations returned 200 during inspection. These four were restricted:

| Source | Observed response | Interpretation |
|---|---|---|
| Better Homes & Gardens powdered-sugar article | 402 | Access restriction in this inspection; not proof the article is missing. |
| NIST conversion appendix | 403 | Inspection restricted; not a confirmed broken link. |
| Quaker oats PDF | 403 | Inspection restricted; not a confirmed broken link. |
| Taste measurement PDF | 403 with crawler-block message | Explicit crawler restriction. No attempt was made to evade it. |

Retain a source unless an ordinary-reader check establishes that it is unavailable or no longer supports the claim. A 200 response establishes availability, not that every citation is substantively correct. Source-content verification in this review specifically covered the disputed King Arthur alternatives and the direct Land O'Lakes butter table; the entire external corpus was not re-audited line by line.

## Checks still needed before final sign-off

These are **unverified areas, not discovered defects**:

1. **Real mobile and responsive behavior.** The browser interface available for this review did not expose viewport/device emulation, and a zoom attempt did not change the viewport. No mobile pass is claimed. Test 320, 375, 390 and 768 CSS pixels, table scrolling, long ingredient labels, orientation changes and the contact form. Check menu focus containment, Escape, focus restoration and background interaction.
2. **Actual print output.** The print button's handler and landscape print CSS exist. Desktop chart layout was inspected, but a rendered A4/Letter PDF was not available for verification. Check every row, all 60 answers, notes and the reference/site address for clipping and legibility.
3. **Contact delivery and failure handling.** Visible validation and the client handler were reviewed. SMTP delivery, backend validation, rate limiting, server errors and mailbox procedures need an owner-authorized test. Do not infer successful delivery merely from an HTTP response or a success message.
4. **Measured performance.** No Lighthouse score, field LCP, INP or CLS result is claimed. Run representative mobile measurements on the homepage, an ingredient page and the chart after the logo/cache work. The asset findings above are measured resource/configuration observations, not a performance score.
5. **Broader accessibility.** This review tested specific focus behavior, computed contrast and form errors. It did not complete a screen-reader, full keyboard or browser-compatibility certification.

## Antigravity handoff

First reproduce and classify these findings against the current production build. Return **confirmed / already changed / not reproducible**, with evidence. Distinguish source corrections from shared-component changes and performance polish.

Recommended order:

1. Verify/remove the unsupported alternative-source attributions; make contact submission safe before JavaScript initialization.
2. Preserve calculator focus, improve reference-text contrast and repair the social-image URL.
3. Implement real fraction shortcuts and honest static fallbacks.
4. Optimize the logo and versioned-asset caching; normalize URL variants where appropriate.
5. Repeat the targeted numerical and keyboard tests, then finish real mobile, print and authorized delivery checks.

Do not reopen GA4/Search Console setup or the confirmed identity as audit defects. Do not change validated base weights merely to make the website agree with a different calculator.

## Page inventory

All of the following returned 200, with the expected self-canonical, one H1, title and description:

| Group | Routes |
|---|---|
| Main tools | `/`, `/cups-to-grams/` |
| Reference and learning | `/methodology/`, `/grams-per-cup/`, `/cup-sizes/`, `/how-to-measure-flour/`, `/conversion-chart/` |
| Amount comparisons | `/50-grams-to-cups/`, `/100-grams-to-cups/` |
| Ingredient converters | `/grams-to-cups/flour/`, `/grams-to-cups/sugar/`, `/grams-to-cups/butter/`, `/grams-to-cups/brown-sugar/`, `/grams-to-cups/powdered-sugar/`, `/grams-to-cups/oats/`, `/grams-to-cups/rice/`, `/grams-to-cups/honey/`, `/grams-to-cups/oil/`, `/grams-to-cups/milk/` |
| Publisher and policies | `/about/`, `/contact/`, `/privacy/`, `/terms/` |

Deployment evidence identifiers: shared script `main-B9yWwVgy.js`; stylesheet `main-DpZGC6zo.css`. The inspected homepage response reported a last-modified time of 29 September 2026, 19:14:06 UTC. Findings describe that inspected deployment and can change after another release.
