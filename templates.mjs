import fs from 'fs';
import path from 'path';

// Clean standard header with 1 single mobile-nav-overlay
const SHARED_HEADER_AND_DRAWER = `  <!-- Site Header -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo" aria-label="Grams to Cups Homepage">
        <img src="/logo.png" alt="Grams to Cups" class="brand-logo-img" width="200" height="67" />
      </a>

      <!-- Desktop Nav -->
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="/cups-to-grams/" class="nav-link">Cups to Grams</a></li>
          <li><a href="/grams-per-cup/" class="nav-link">Density Chart</a></li>
          <li><a href="/cup-sizes/" class="nav-link">Cup Sizes</a></li>
          <li><a href="/methodology/" class="nav-link">Methodology</a></li>
        </ul>
      </nav>

      <!-- Mobile Menu Toggle Button -->
      <button type="button" class="mobile-menu-btn" id="mobile-menu-toggle" aria-expanded="false" aria-label="Toggle navigation menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </header>

  <!-- Mobile Drawer Menu Overlay -->
  <div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true">
    <div class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div class="mobile-nav-header">
        <a href="/" class="brand-logo" aria-label="Grams to Cups Homepage">
          <img src="/logo.png" alt="Grams to Cups" class="brand-logo-img" width="108" height="36" style="height:36px; width:auto;" />
        </a>
        <button type="button" class="mobile-menu-btn" id="mobile-menu-close" style="display:flex;" aria-label="Close navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <nav>
        <ul class="mobile-nav-list">
          <li><a href="/" class="mobile-nav-link">Grams to Cups Converter</a></li>
          <li><a href="/cups-to-grams/" class="mobile-nav-link">Cups to Grams Converter</a></li>
          <li><a href="/grams-per-cup/" class="mobile-nav-link">Ingredient Density Chart</a></li>
          <li><a href="/cup-sizes/" class="mobile-nav-link">Cup Standards &amp; Sizes</a></li>
          <li><a href="/how-to-measure-flour/" class="mobile-nav-link">Spoon &amp; Level Guide</a></li>
          <li><a href="/methodology/" class="mobile-nav-link">Data Methodology</a></li>
          <li><a href="/about/" class="mobile-nav-link">About Grams to Cups</a></li>
        </ul>
      </nav>
    </div>
  </div>`;

// Clean standard footer
const SHARED_FOOTER = `  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="/" class="footer-brand" aria-label="Grams to Cups Homepage">
            <span class="footer-brand-title">Grams <span class="footer-brand-accent">to</span> Cups</span>
          </a>
          <p style="font-size:0.875rem; line-height:1.5; color:#A8A29E; margin-top:0.5rem;">
            Source-backed kitchen scale tools and ingredient density references for accurate baking and cooking worldwide.
          </p>
        </div>

        <div>
          <h3 class="footer-title">Popular Ingredients</h3>
          <ul class="footer-links">
            <li><a href="/grams-to-cups/flour/">Flour Grams to Cups</a></li>
            <li><a href="/grams-to-cups/sugar/">Sugar Grams to Cups</a></li>
            <li><a href="/grams-to-cups/butter/">Butter Grams to Cups</a></li>
            <li><a href="/grams-to-cups/brown-sugar/">Brown Sugar Grams to Cups</a></li>
            <li><a href="/grams-to-cups/powdered-sugar/">Powdered Sugar Grams to Cups</a></li>
            <li><a href="/grams-to-cups/oats/">Rolled Oats Grams to Cups</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-title">Reference Tools</h3>
          <ul class="footer-links">
            <li><a href="/cups-to-grams/">Cups to Grams Converter</a></li>
            <li><a href="/50-grams-to-cups/">50 Grams to Cups Matrix</a></li>
            <li><a href="/100-grams-to-cups/">100 Grams to Cups Matrix</a></li>
            <li><a href="/grams-per-cup/">Master Density Chart</a></li>
            <li><a href="/cup-sizes/">US vs Metric Cup Sizes</a></li>
            <li><a href="/how-to-measure-flour/">Spoon &amp; Level Guide</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-title">Trust &amp; Company</h3>
          <ul class="footer-links">
            <li><a href="/methodology/">Data Methodology</a></li>
            <li><a href="/about/">About Us</a></li>
            <li><a href="/contact/">Contact &amp; Feedback</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Use</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 thegramstocups.com — All rights reserved. Culinary measurements are for informational baking and cooking use.</p>
      </div>
    </div>
  </footer>`;

// Standard Google Font links
const STANDARD_HEAD_FONTS = `  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Google Fonts: Fraunces, Playfair Display & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles/main.css" />`;

// Ingredient metadata for rich static fallback generation
const INGREDIENT_DATA = {
  'flour': {
    name: 'All-Purpose Flour',
    state: 'Dry, spooned and leveled',
    gPerCup: 120,
    source: 'King Arthur Baking Company (120g / cup reference)',
    altSource: 'USDA Food Buying Guide lists 125g / cup (commercial packing)',
    calcVal: 100,
    calcCups: '0.833',
    practical: '≈ ¾ cup + 1 tbsp + 1 tsp'
  },
  'sugar': {
    name: 'Granulated White Sugar',
    state: 'Granulated, dry',
    gPerCup: 198,
    source: 'King Arthur Baking Company (198g / cup reference)',
    calcVal: 100,
    calcCups: '0.505',
    practical: '≈ ½ cup'
  },
  'butter': {
    name: 'Butter',
    state: 'Solid / softened (standard stick)',
    gPerCup: 227,
    source: 'King Arthur Baking Company (227g / cup reference)',
    calcVal: 100,
    calcCups: '0.441',
    practical: '≈ 7 tbsp (0.88 sticks)'
  },
  'brown-sugar': {
    name: 'Brown Sugar (Packed)',
    state: 'Firmly packed',
    gPerCup: 213,
    source: 'King Arthur Baking Company (213g / cup reference)',
    sourceUrl: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
    altSource: 'Unpacked / loose brown sugar weighs roughly 170g per cup',
    calcVal: 100,
    calcCups: '0.469',
    practical: '≈ ½ cup'
  },
  'powdered-sugar': {
    name: 'Powdered / Confectioners\' Sugar',
    state: 'Unsifted',
    gPerCup: 113,
    source: 'King Arthur Baking Company (113g / cup reference)',
    altSource: 'Sifted powdered sugar weighs approximately 100g per cup',
    calcVal: 100,
    calcCups: '0.885',
    practical: '≈ ⅞ cup'
  },
  'oats': {
    name: 'Rolled Oats',
    state: 'Dry old-fashioned rolled oats',
    gPerCup: 89,
    source: 'King Arthur Baking Company (89g / cup reference)',
    altSource: 'USDA Food Buying Guide lists 81g per cup',
    calcVal: 100,
    calcCups: '1.124',
    practical: '≈ 1 ⅛ cups'
  },
  'rice': {
    name: 'Uncooked White Rice',
    state: 'Uncooked, long grain dry',
    gPerCup: 185,
    source: 'USDA FoodData Central (185g / cup reference)',
    calcVal: 100,
    calcCups: '0.541',
    practical: '≈ ½ cup + 1 tbsp'
  },
  'honey': {
    name: 'Honey',
    state: 'Liquid (21g per tbsp)',
    gPerCup: 336,
    source: 'King Arthur Baking Company (336g / cup reference)',
    sourceUrl: 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart',
    calcVal: 100,
    calcCups: '0.298',
    practical: '≈ ¼ cup + 2 tsp'
  },
  'oil': {
    name: 'Vegetable / Olive Oil',
    state: 'Liquid (density 0.915 g/mL)',
    gPerCup: 216,
    source: 'USDA FoodData Central (216g / cup reference)',
    calcVal: 100,
    calcCups: '0.463',
    practical: '≈ ⅓ cup + 2 tbsp'
  },
  'milk': {
    name: 'Whole Milk',
    state: 'Liquid (density 1.03 g/mL)',
    gPerCup: 244,
    source: 'USDA FoodData Central (244g / cup reference)',
    calcVal: 100,
    calcCups: '0.410',
    practical: '≈ 6.5 tablespoons'
  }
};

function generateIngredientFallback(ingId) {
  const d = INGREDIENT_DATA[ingId];
  if (!d) return '';

  const altLine = d.altSource ? `
          <div class="provenance-line">
            <span class="provenance-label">Alternative Reference:</span>
            <span>${d.altSource}</span>
          </div>` : '';

  return `      <div class="calculator-card">
        <div class="calculator-grid-inputs">
          <div class="form-group">
            <label class="form-label" for="fallback-input">Grams (g)</label>
            <input type="number" id="fallback-input" class="form-input" value="${d.calcVal}" />
          </div>
          <div class="form-group">
            <label class="form-label" for="fallback-select">Select Ingredient</label>
            <select id="fallback-select" class="form-select">
              <option value="${ingId}">${d.name} (${d.state})</option>
            </select>
          </div>
        </div>
        <div class="results-box">
          <div class="results-primary">
            <span class="result-number">${d.calcCups}</span>
            <span class="result-unit">US Customary Cups</span>
          </div>
          <div class="practical-badge">
            <span>Practical measure: <strong>${d.practical}</strong></span>
          </div>
          <div class="provenance-card">
            <div class="provenance-line">
              <span class="provenance-label">Reference Source:</span>
              <span>${d.source}</span>
            </div>${altLine}
          </div>
        </div>
      </div>`;
}

function generateQuantityFallback(val) {
  const calcCups = val === 50 ? '0.417' : '0.833';
  const practical = val === 50 ? '≈ 6.5 tablespoons' : '≈ ¾ cup + 1 tbsp + 1 tsp';

  return `      <div class="calculator-card">
        <div class="calculator-grid-inputs">
          <div class="form-group">
            <label class="form-label" for="fallback-input">Grams (g)</label>
            <input type="number" id="fallback-input" class="form-input" value="${val}" />
          </div>
          <div class="form-group">
            <label class="form-label" for="fallback-select">Select Ingredient</label>
            <select id="fallback-select" class="form-select">
              <option value="flour">All-Purpose Flour (Dry, spooned and leveled)</option>
              <option value="sugar">Granulated White Sugar (Granulated)</option>
              <option value="butter">Butter (Solid / softened)</option>
            </select>
          </div>
        </div>
        <div class="results-box">
          <div class="results-primary">
            <span class="result-number">${calcCups}</span>
            <span class="result-unit">US Customary Cups</span>
          </div>
          <div class="practical-badge">
            <span>Practical measure: <strong>${practical}</strong></span>
          </div>
          <div class="provenance-card">
            <div class="provenance-line">
              <span class="provenance-label">Reference Source:</span>
              <span>King Arthur Baking Company (120g / cup reference)</span>
            </div>
          </div>
        </div>
      </div>`;
}

function generateCupsToGramsFallback() {
  return `      <div class="calculator-card">
        <div class="calculator-grid-inputs">
          <div class="form-group">
            <label class="form-label" for="fallback-input">Cups</label>
            <input type="number" id="fallback-input" class="form-input" value="1" />
          </div>
          <div class="form-group">
            <label class="form-label" for="fallback-select">Select Ingredient</label>
            <select id="fallback-select" class="form-select">
              <option value="flour">All-Purpose Flour (120g / cup)</option>
              <option value="sugar">Granulated Sugar (198g / cup)</option>
              <option value="butter">Butter (227g / cup)</option>
            </select>
          </div>
        </div>
        <div class="results-box">
          <div class="results-primary">
            <span class="result-number">120</span>
            <span class="result-unit">Grams (g)</span>
          </div>
          <div class="practical-badge">
            <span>Calculation: <strong>1 US Customary Cup of All-Purpose Flour</strong></span>
          </div>
          <div class="provenance-card">
            <div class="provenance-line">
              <span class="provenance-label">Reference Density:</span>
              <span>120g per US Customary Cup (King Arthur Baking)</span>
            </div>
          </div>
        </div>
      </div>`;
}

export {
  SHARED_HEADER_AND_DRAWER,
  SHARED_FOOTER,
  STANDARD_HEAD_FONTS,
  INGREDIENT_DATA,
  generateIngredientFallback,
  generateQuantityFallback,
  generateCupsToGramsFallback,
  generateOgMeta
};

/**
 * Generates Open Graph and Twitter Card meta tags for a page.
 * @param {string} title - Page title (without site suffix)
 * @param {string} description - Page description
 * @param {string} url - Full canonical URL (https://thegramstocups.com/...)
 */
function generateOgMeta(title, description, url) {
  return `  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Grams to Cups" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://thegramstocups.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://thegramstocups.com/og-image.png" />`;
}
