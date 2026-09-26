import fs from 'fs';
import path from 'path';
import {
  SHARED_HEADER_AND_DRAWER,
  SHARED_FOOTER,
  STANDARD_HEAD_FONTS,
  INGREDIENT_DATA,
  generateIngredientFallback,
  generateQuantityFallback,
  generateCupsToGramsFallback
} from './templates.mjs';

function cleanAndFormatHead(title, description, canonical, schema = null) {
  let headInner = `  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />

${STANDARD_HEAD_FONTS}`;

  if (schema) {
    headInner += `\n\n  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2)}
  </script>`;
  }

  return headInner;
}

// 1. Update index.html
{
  const filePath = 'index.html';
  let html = fs.readFileSync(filePath, 'utf8');

  // Ensure head has standard fonts
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    let head = headMatch[1];
    head = head.replace(/<!-- Google Fonts[\s\S]*?<link rel="stylesheet" href="\/src\/styles\/main\.css" \/>/gi, '');
    head = head.replace(/<link\s+rel=["']preconnect["'][\s\S]*?>/gi, '');
    head = head.replace(/<link\s+href=["']https:\/\/fonts\.googleapis\.com[\s\S]*?>/gi, '');
    head = head.replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/src\/styles\/main\.css["']\s*\/?>/gi, '');
    head = head.trim() + '\n\n' + STANDARD_HEAD_FONTS + '\n';
    html = html.replace(headMatch[1], head);
  }

  // Replace header & add drawer
  const bodyStart = html.indexOf('<body>');
  const mainStart = html.indexOf('<main');
  if (bodyStart !== -1 && mainStart !== -1) {
    const beforeBody = html.substring(0, bodyStart + 6);
    const fromMain = html.substring(mainStart);
    html = `${beforeBody}\n\n${SHARED_HEADER_AND_DRAWER}\n\n  ${fromMain}`;
  }

  // Replace footer
  const mainEnd = html.indexOf('</main>');
  if (mainEnd !== -1) {
    const beforeFooter = html.substring(0, mainEnd + 7);
    html = `${beforeFooter}\n\n${SHARED_FOOTER}\n\n  <script type="module" src="/src/main.ts"></script>\n</body>\n</html>\n`;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 2. Update Ingredient Pages
const INGREDIENT_SLUGS = [
  'flour', 'sugar', 'butter', 'brown-sugar', 'powdered-sugar',
  'oats', 'rice', 'honey', 'oil', 'milk'
];

for (const slug of INGREDIENT_SLUGS) {
  const filePath = `grams-to-cups/${slug}/index.html`;
  if (!fs.existsSync(filePath)) continue;

  const d = INGREDIENT_DATA[slug];
  const title = `${d.name} Grams to Cups Converter | Source-Backed Kitchen Scale`;
  const desc = `Convert ${d.name.toLowerCase()} from grams to cups with verified density reference (${d.gPerCup}g/cup). Includes practical spoon fractions and kitchen charts.`;
  const canonical = `https://thegramstocups.com/grams-to-cups/${slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": `${d.name} Grams to Cups`, "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">${d.name} Grams to Cups</h1>
      <p class="hero-subhead">
        Convert grams of ${d.name.toLowerCase()} (${d.state.toLowerCase()}) to precise cups, tablespoons, and kitchen measures. Reference density: <strong>${d.gPerCup}g per cup</strong>.
      </p>
    </section>

    <!-- Centerpiece Calculator Card Container -->
    <div id="calculator-app" data-ingredient="${slug}" data-value="100">
${generateIngredientFallback(slug)}
    </div>

    <!-- Educational Callout -->
    <div class="educational-callout">
      <div class="callout-title">Density &amp; Measurement Sourcing</div>
      <div class="callout-text">
        100g of ${d.name} equals <strong>${d.calcCups} US Customary Cups</strong> (${d.practical}). Primary reference source: <strong>${d.source}</strong>.
      </div>
    </div>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <!-- Quick Reference Table -->
    <section class="content-section">
      <h2 class="section-title">Common ${d.name} Grams to Cups Conversions</h2>
      <div class="prose">
        <p>
          Reference conversion table for ${d.name.toLowerCase()} using standard US Customary Cups (236.6 mL) at <strong>${d.gPerCup} grams per cup</strong>.
        </p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Grams (g)</th>
              <th>US Cups</th>
              <th>Practical Measure</th>
              <th>Metric Cups (250 mL)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>25g</strong></td>
              <td>${(25 / d.gPerCup).toFixed(3)} cups</td>
              <td>≈ ${((25 / d.gPerCup) * 16).toFixed(1)} tbsp</td>
              <td>${(25 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
            <tr>
              <td><strong>50g</strong></td>
              <td>${(50 / d.gPerCup).toFixed(3)} cups</td>
              <td>≈ ${((50 / d.gPerCup) * 16).toFixed(1)} tbsp</td>
              <td>${(50 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
            <tr>
              <td><strong>100g</strong></td>
              <td>${(100 / d.gPerCup).toFixed(3)} cups</td>
              <td>${d.practical}</td>
              <td>${(100 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
            <tr>
              <td><strong>150g</strong></td>
              <td>${(150 / d.gPerCup).toFixed(3)} cups</td>
              <td>≈ ${(150 / d.gPerCup).toFixed(2)} cups</td>
              <td>${(150 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
            <tr>
              <td><strong>200g</strong></td>
              <td>${(200 / d.gPerCup).toFixed(3)} cups</td>
              <td>≈ ${(200 / d.gPerCup).toFixed(2)} cups</td>
              <td>${(200 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
            <tr>
              <td><strong>250g</strong></td>
              <td>${(250 / d.gPerCup).toFixed(3)} cups</td>
              <td>≈ ${(250 / d.gPerCup).toFixed(2)} cups</td>
              <td>${(250 / (d.gPerCup * (250 / 236.588))).toFixed(3)} cups</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Explore Other Ingredients Grid -->
    <section class="content-section">
      <h2 class="section-title">Explore More Ingredient Guides</h2>
      <div class="grid-cards">
        <a href="/grams-to-cups/flour/" class="card-link">
          <span class="card-title">All-Purpose Flour</span>
          <span class="card-desc">120g/cup reference</span>
        </a>
        <a href="/grams-to-cups/sugar/" class="card-link">
          <span class="card-title">Granulated Sugar</span>
          <span class="card-desc">198g/cup reference</span>
        </a>
        <a href="/grams-to-cups/butter/" class="card-link">
          <span class="card-title">Butter</span>
          <span class="card-desc">227g/cup • Cups, sticks & tbsp</span>
        </a>
        <a href="/grams-to-cups/brown-sugar/" class="card-link">
          <span class="card-title">Brown Sugar</span>
          <span class="card-desc">213g/cup packed reference</span>
        </a>
        <a href="/grams-to-cups/powdered-sugar/" class="card-link">
          <span class="card-title">Powdered Sugar</span>
          <span class="card-desc">113g/cup unsifted reference</span>
        </a>
        <a href="/grams-to-cups/oats/" class="card-link">
          <span class="card-title">Rolled Oats</span>
          <span class="card-desc">89g/cup dry oats</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 3. Matrix & Converter Pages
// 50-grams-to-cups
{
  const filePath = '50-grams-to-cups/index.html';
  const title = '50 Grams to Cups by Ingredient | Cross-Ingredient Matrix';
  const desc = 'See how many cups 50 grams equals for flour, sugar, butter, oats, rice, honey, oil, and milk. Compare all ingredients in one reference chart.';
  const canonical = 'https://thegramstocups.com/50-grams-to-cups/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "50 Grams to Cups", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">50 Grams to Cups by Ingredient</h1>
      <p class="hero-subhead">
        Compare how many cups 50 grams equals across different baking and cooking ingredients using standard US Customary Cups (236.6 mL).
      </p>
    </section>

    <!-- Centerpiece Calculator Card Container -->
    <div id="calculator-app" data-value="50">
${generateQuantityFallback(50)}
    </div>

    <!-- Educational Callout -->
    <div class="educational-callout">
      <div class="callout-title">50 Grams Conversion Rule</div>
      <div class="callout-text">
        Because ingredients have different densities, 50g of All-Purpose Flour is <strong>0.417 cups</strong> (≈ 6.5 tbsp), while 50g of granulated sugar is <strong>0.253 cups</strong> (≈ ¼ cup).
      </div>
    </div>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">50 Grams Cross-Ingredient Comparison Matrix</h2>
      <div class="prose">
        <p>
          Quick comparison table showing how 50 grams converts to cups and practical kitchen spoon measurements across 10 staple culinary ingredients.
        </p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>50g in Cups</th>
              <th>Practical Kitchen Measure</th>
              <th>Reference Source</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>All-Purpose Flour</strong></td><td>0.417 cups</td><td>≈ 6.5 tablespoons</td><td>120g/cup (King Arthur)</td></tr>
            <tr><td><strong>Granulated Sugar</strong></td><td>0.253 cups</td><td>≈ ¼ cup</td><td>198g/cup (King Arthur)</td></tr>
            <tr><td><strong>Butter</strong></td><td>0.220 cups</td><td>≈ 3.5 tbsp (0.44 sticks)</td><td>227g/cup (King Arthur)</td></tr>
            <tr><td><strong>Brown Sugar</strong> (packed)</td><td>0.235 cups</td><td>≈ 3.75 tablespoons</td><td>213g/cup (King Arthur)</td></tr>
            <tr><td><strong>Powdered Sugar</strong></td><td>0.442 cups</td><td>≈ 7 tablespoons</td><td>113g/cup (King Arthur)</td></tr>
            <tr><td><strong>Rolled Oats</strong></td><td>0.562 cups</td><td>≈ ½ cup + 1 tbsp</td><td>89g/cup (King Arthur)</td></tr>
            <tr><td><strong>Uncooked Rice</strong></td><td>0.270 cups</td><td>≈ ¼ cup + 1 tbsp</td><td>185g/cup (USDA)</td></tr>
            <tr><td><strong>Honey</strong></td><td>0.149 cups</td><td>≈ 2.4 tablespoons</td><td>336g/cup (King Arthur)</td></tr>
            <tr><td><strong>Cooking Oil</strong></td><td>0.231 cups</td><td>≈ 3.7 tablespoons</td><td>216g/cup (USDA)</td></tr>
            <tr><td><strong>Whole Milk</strong></td><td>0.205 cups</td><td>≈ 3.3 tablespoons</td><td>244g/cup (USDA)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Explore Related Conversion Guides</h2>
      <div class="grid-cards">
        <a href="/100-grams-to-cups/" class="card-link">
          <span class="card-title">100 Grams to Cups</span>
          <span class="card-desc">100g cross-ingredient matrix</span>
        </a>
        <a href="/cups-to-grams/" class="card-link">
          <span class="card-title">Cups to Grams</span>
          <span class="card-desc">Reverse volume to weight tool</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Complete grams per cup reference</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 100-grams-to-cups
{
  const filePath = '100-grams-to-cups/index.html';
  const title = '100 Grams to Cups by Ingredient | Cross-Ingredient Matrix';
  const desc = 'See how many cups 100 grams equals for flour, sugar, butter, oats, rice, honey, oil, and milk. Compare all ingredients in one reference chart.';
  const canonical = 'https://thegramstocups.com/100-grams-to-cups/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "100 Grams to Cups", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">100 Grams to Cups by Ingredient</h1>
      <p class="hero-subhead">
        Compare how many cups 100 grams equals across common baking and cooking ingredients using standard US Customary Cups (236.6 mL).
      </p>
    </section>

    <!-- Centerpiece Calculator Card Container -->
    <div id="calculator-app" data-value="100">
${generateQuantityFallback(100)}
    </div>

    <!-- Educational Callout -->
    <div class="educational-callout">
      <div class="callout-title">100 Grams Reference Benchmark</div>
      <div class="callout-text">
        100g is the culinary standard reference weight. For All-Purpose Flour, 100g equals <strong>0.833 cups</strong> (≈ ¾ cup + 1 tbsp + 1 tsp). For Granulated Sugar, 100g is <strong>0.505 cups</strong> (≈ ½ cup).
      </div>
    </div>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">100 Grams Cross-Ingredient Comparison Matrix</h2>
      <div class="prose">
        <p>
          Reference table for 100 grams of standard baking and cooking ingredients converted into US Customary Cups.
        </p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>100g in Cups</th>
              <th>Practical Kitchen Measure</th>
              <th>Reference Source</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>All-Purpose Flour</strong></td><td>0.833 cups</td><td>≈ ¾ cup + 1 tbsp + 1 tsp</td><td>120g/cup (King Arthur)</td></tr>
            <tr><td><strong>Granulated Sugar</strong></td><td>0.505 cups</td><td>≈ ½ cup</td><td>198g/cup (King Arthur)</td></tr>
            <tr><td><strong>Butter</strong></td><td>0.441 cups</td><td>≈ 7 tbsp (0.88 sticks)</td><td>227g/cup (King Arthur)</td></tr>
            <tr><td><strong>Brown Sugar</strong> (packed)</td><td>0.469 cups</td><td>≈ ½ cup - 1 tbsp</td><td>213g/cup (King Arthur)</td></tr>
            <tr><td><strong>Powdered Sugar</strong></td><td>0.885 cups</td><td>≈ ⅞ cup</td><td>113g/cup (King Arthur)</td></tr>
            <tr><td><strong>Rolled Oats</strong></td><td>1.124 cups</td><td>≈ 1 ⅛ cups</td><td>89g/cup (King Arthur)</td></tr>
            <tr><td><strong>Uncooked Rice</strong></td><td>0.541 cups</td><td>≈ ½ cup + 1 tbsp</td><td>185g/cup (USDA)</td></tr>
            <tr><td><strong>Honey</strong></td><td>0.298 cups</td><td>≈ ¼ cup + 1 tbsp</td><td>336g/cup (King Arthur)</td></tr>
            <tr><td><strong>Cooking Oil</strong></td><td>0.463 cups</td><td>≈ ½ cup - 1 tbsp</td><td>216g/cup (USDA)</td></tr>
            <tr><td><strong>Whole Milk</strong></td><td>0.410 cups</td><td>≈ 6.5 tablespoons</td><td>244g/cup (USDA)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Explore Related Conversion Guides</h2>
      <div class="grid-cards">
        <a href="/50-grams-to-cups/" class="card-link">
          <span class="card-title">50 Grams to Cups</span>
          <span class="card-desc">50g cross-ingredient matrix</span>
        </a>
        <a href="/cups-to-grams/" class="card-link">
          <span class="card-title">Cups to Grams</span>
          <span class="card-desc">Reverse volume to weight tool</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Complete grams per cup reference</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// cups-to-grams
{
  const filePath = 'cups-to-grams/index.html';
  const title = 'Cups to Grams Converter by Ingredient | Source-Backed Kitchen Scale';
  const desc = 'Convert cups to grams by ingredient with source-backed cup weights. Choose US customary, legal, or metric cups for flour, sugar, butter, oats, rice, honey, oil, and milk.';
  const canonical = 'https://thegramstocups.com/cups-to-grams/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Cups to Grams Converter", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Cups to Grams Converter</h1>
      <p class="hero-subhead">
        Convert recipe cup volumes to exact gram mass for baking. Select your ingredient and cup standard to calculate precise gram weights.
      </p>
    </section>

    <!-- Centerpiece Calculator Card Container -->
    <div id="calculator-app" data-direction="cupsToGrams" data-value="1">
${generateCupsToGramsFallback()}
    </div>

    <!-- Educational Callout -->
    <div class="educational-callout">
      <div class="callout-title">Converting Volume to Mass</div>
      <div class="callout-text">
        1 US Customary Cup of All-Purpose Flour weighs <strong>120 grams</strong> (spooned &amp; leveled). 1 cup of Granulated Sugar weighs <strong>198 grams</strong>. 1 cup of Butter weighs <strong>227 grams</strong> (2 sticks).
      </div>
    </div>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">Cups to Grams Conversion Reference Table</h2>
      <div class="prose">
        <p>
          Baking with a digital scale in grams ensures consistent results every time. Below is a quick conversion reference showing how many grams 1 cup, ½ cup, ⅓ cup, and ¼ cup weigh for popular ingredients using standard US Customary Cups (236.6 mL).
        </p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>1 Cup (g)</th>
              <th>¾ Cup (g)</th>
              <th>½ Cup (g)</th>
              <th>⅓ Cup (g)</th>
              <th>¼ Cup (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>All-Purpose Flour</strong> (spooned)</td><td>120g</td><td>90g</td><td>60g</td><td>40g</td><td>30g</td></tr>
            <tr><td><strong>Granulated Sugar</strong></td><td>198g</td><td>149g</td><td>99g</td><td>66g</td><td>50g</td></tr>
            <tr><td><strong>Butter</strong> (1 stick = ½ cup)</td><td>227g</td><td>170g</td><td>113.5g</td><td>76g</td><td>57g</td></tr>
            <tr><td><strong>Brown Sugar</strong> (packed)</td><td>213g</td><td>160g</td><td>107.5g</td><td>71g</td><td>53g</td></tr>
            <tr><td><strong>Powdered Sugar</strong> (unsifted)</td><td>113g</td><td>85g</td><td>56.5g</td><td>38g</td><td>28g</td></tr>
            <tr><td><strong>Rolled Oats</strong></td><td>89g</td><td>67g</td><td>44.5g</td><td>30g</td><td>22g</td></tr>
            <tr><td><strong>Uncooked White Rice</strong></td><td>185g</td><td>139g</td><td>92.5g</td><td>62g</td><td>46g</td></tr>
            <tr><td><strong>Honey</strong></td><td>336g</td><td>252g</td><td>168g</td><td>112g</td><td>84g</td></tr>
            <tr><td><strong>Cooking Oil</strong></td><td>216g</td><td>162g</td><td>108g</td><td>72g</td><td>54g</td></tr>
            <tr><td><strong>Whole Milk</strong></td><td>244g</td><td>183g</td><td>122g</td><td>81g</td><td>61g</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Explore Ingredient Guides</h2>
      <div class="grid-cards">
        <a href="/grams-to-cups/flour/" class="card-link">
          <span class="card-title">All-Purpose Flour</span>
          <span class="card-desc">120g/cup reference</span>
        </a>
        <a href="/grams-to-cups/sugar/" class="card-link">
          <span class="card-title">Granulated Sugar</span>
          <span class="card-desc">198g/cup reference</span>
        </a>
        <a href="/grams-to-cups/butter/" class="card-link">
          <span class="card-title">Butter</span>
          <span class="card-desc">227g/cup • Cups, sticks & tbsp</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// 4. Reference & Informational Pages
// grams-per-cup
{
  const filePath = 'grams-per-cup/index.html';
  const title = 'Grams per Cup Chart by Ingredient | Master Density Reference';
  const desc = 'Master reference chart comparing grams per cup for common baking and cooking ingredients. Includes cup standards, states, and primary source citations.';
  const canonical = 'https://thegramstocups.com/grams-per-cup/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Grams per Cup Chart", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Master Grams per Cup Reference Chart</h1>
      <p class="hero-subhead">Comprehensive density and reference weights for common baking and cooking ingredients across US and Metric cups.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">Master Ingredient Density Table</h2>
      <div class="prose">
        <p>
          Bulk density values used across thegramstocups.com calculators. Density determines how many grams fit into a volume cup.
        </p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Ingredient</th><th>State / Preparation</th><th>Grams / US Cup (236.6 mL)</th><th>Grams / Metric Cup (250 mL)</th><th>Primary Source</th></tr></thead>
          <tbody>
            <tr><td><strong>All-Purpose Flour</strong></td><td>Spooned &amp; leveled</td><td>120g</td><td>126.8g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Granulated Sugar</strong></td><td>Granulated, dry</td><td>198g</td><td>209.2g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Butter</strong></td><td>Solid / softened</td><td>227g</td><td>239.9g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Brown Sugar</strong></td><td>Firmly packed</td><td>213g</td><td>225.1g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Powdered Sugar</strong></td><td>Unsifted</td><td>113g</td><td>119.4g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Rolled Oats</strong></td><td>Dry old-fashioned</td><td>89g</td><td>94.0g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Uncooked Rice</strong></td><td>Dry long grain</td><td>185g</td><td>195.5g</td><td>USDA FoodData Central</td></tr>
            <tr><td><strong>Honey</strong></td><td>Liquid (21g/tbsp)</td><td>336g</td><td>355.0g</td><td>King Arthur Baking Company</td></tr>
            <tr><td><strong>Cooking Oil</strong></td><td>Density 0.915 g/mL</td><td>216g</td><td>228.8g</td><td>USDA FoodData Central</td></tr>
            <tr><td><strong>Whole Milk</strong></td><td>Density 1.03 g/mL</td><td>244g</td><td>257.5g</td><td>USDA FoodData Central</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Explore Dedicated Ingredient Converters</h2>
      <div class="grid-cards">
        <a href="/grams-to-cups/flour/" class="card-link">
          <span class="card-title">Flour Calculator</span>
          <span class="card-desc">120g/cup reference</span>
        </a>
        <a href="/grams-to-cups/sugar/" class="card-link">
          <span class="card-title">Sugar Calculator</span>
          <span class="card-desc">198g/cup reference</span>
        </a>
        <a href="/grams-to-cups/butter/" class="card-link">
          <span class="card-title">Butter Calculator</span>
          <span class="card-desc">227g/cup reference</span>
        </a>
        <a href="/cup-sizes/" class="card-link">
          <span class="card-title">Cup Sizes Guide</span>
          <span class="card-desc">US vs Metric volume differences</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// cup-sizes
{
  const filePath = 'cup-sizes/index.html';
  const title = 'US vs Metric Cup Sizes Explained | Volume Differences';
  const desc = 'Understand US customary (236.6 mL), US legal (240 mL), and metric (250 mL) cup sizes and how volume differences affect recipes.';
  const canonical = 'https://thegramstocups.com/cup-sizes/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Cup Sizes Explained", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">US vs Metric Cup Sizes Explained</h1>
      <p class="hero-subhead">Understanding milliliter volume differences between American baking cups and international metric cups.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">The Three Standard Measuring Cups</h2>
      <div class="prose">
        <p>A "cup" is not an identical physical volume across the globe. Depending on where your recipe originates, a cup may refer to three distinct volumes:</p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Cup Standard</th><th>Volume in mL</th><th>Primary Region / Context</th><th>1 Cup Flour Weight</th></tr></thead>
          <tbody>
            <tr><td><strong>US Customary Cup</strong></td><td>236.588 mL (≈237 mL)</td><td>Standard American home recipes &amp; King Arthur charts</td><td>120 grams</td></tr>
            <tr><td><strong>US Legal / FDA Cup</strong></td><td>240.0 mL</td><td>FDA nutrition labels &amp; commercial food packaging</td><td>121.7 grams</td></tr>
            <tr><td><strong>Metric Cup</strong></td><td>250.0 mL</td><td>Australia, New Zealand, UK, Canada, and international</td><td>126.8 grams</td></tr>
          </tbody>
        </table>
      </div>

      <div class="prose" style="margin-top:1.5rem;">
        <p><strong>Why It Matters:</strong> Using an Australian Metric Cup (250 mL) for an American recipe based on US Customary Cups (236.6 mL) introduces a 5.7% volume increase. For delicate pastries, this variance can affect dough hydration and crumb structure.</p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Related Tools &amp; Resources</h2>
      <div class="grid-cards">
        <a href="/cups-to-grams/" class="card-link">
          <span class="card-title">Cups to Grams</span>
          <span class="card-desc">Select US or Metric cups</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Compare weights across cup sizes</span>
        </a>
        <a href="/how-to-measure-flour/" class="card-link">
          <span class="card-title">How to Measure Flour</span>
          <span class="card-desc">Spoon and level technique guide</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// how-to-measure-flour
{
  const filePath = 'how-to-measure-flour/index.html';
  const title = 'How to Measure Flour Accurately for Baking | Spoon & Level Guide';
  const desc = 'Learn why flour weight varies by measuring method, how spoon-and-level differs from scooping, and how a kitchen scale improves recipe accuracy.';
  const canonical = 'https://thegramstocups.com/how-to-measure-flour/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "How to Measure Flour", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">How to Measure Flour Accurately</h1>
      <p class="hero-subhead">Master the spoon-and-level technique to prevent dry, dense baked goods and achieve consistent baking success.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">The Flawed Scoop vs. The Spoon-and-Level Technique</h2>
      <div class="prose">
        <p>Scooping flour directly out of a container with a cup measuring tool packs flour tightly into the cup. A scooped cup can weigh between <strong>135g and 140g</strong>, whereas a properly fluffed, spooned, and leveled cup weighs <strong>120g</strong>.</p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Measuring Technique</th><th>1 Cup Weight</th><th>Impact on Recipe</th></tr></thead>
          <tbody>
            <tr><td><strong>Direct Scoop (Packed)</strong></td><td>135g – 145g</td><td>Dry, tough, rubbery cake or bread</td></tr>
            <tr><td><strong>Spoon &amp; Level (Standard)</strong></td><td>120g</td><td>Proper moisture and tender crumb</td></tr>
            <tr><td><strong>Sifted then Measured</strong></td><td>100g – 110g</td><td>Under-measured dough structure</td></tr>
          </tbody>
        </table>
      </div>

      <div class="prose" style="margin-top:1.5rem;">
        <h3>Step-by-Step Spoon and Level Method:</h3>
        <ol style="margin-left:1.5rem; margin-bottom:1rem; color:var(--text-secondary);">
          <li><strong>Fluff the Flour:</strong> Use a fork or whisk to loosen the flour inside your container or bag.</li>
          <li><strong>Spoon Gently:</strong> Spoon the fluffed flour lightly into your measuring cup until it forms a heap over the rim. Do not shake or tap the cup.</li>
          <li><strong>Sweep Off Excess:</strong> Use the flat, straight edge of a butter knife or bench scraper to sweep across the rim, leveling off the extra flour.</li>
        </ol>
        <p>Using a digital scale set to grams removes all technique guesswork and ensures 100% baking accuracy every single time.</p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Related Guides</h2>
      <div class="grid-cards">
        <a href="/grams-to-cups/flour/" class="card-link">
          <span class="card-title">Flour Converter</span>
          <span class="card-desc">Calculate exact flour grams to cups</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Compare flour with sugar, butter & more</span>
        </a>
        <a href="/methodology/" class="card-link">
          <span class="card-title">Data Methodology</span>
          <span class="card-desc">How reference weights are established</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// methodology
{
  const filePath = 'methodology/index.html';
  const title = 'How Our Grams-to-Cups Conversions Are Calculated | Data Sourcing';
  const desc = 'Read how our grams-to-cups calculator chooses ingredient weights, cup standards, sources, rounding rules, and kitchen fractions.';
  const canonical = 'https://thegramstocups.com/methodology/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Data Methodology", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Data Methodology &amp; Sourcing Rules</h1>
      <p class="hero-subhead">Our principles for measurement accuracy, data provenance, cup standard scaling, and practical kitchen rounding.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">Core Principles of Our Data Engine</h2>
      <div class="prose">
        <h3>1. Data Provenance</h3>
        <p>Grams measure mass; cups measure volume. Because bulk density varies by preparation state, we never invent conversion values or copy unsourced numbers from competitors. Every ingredient reference is pinned to established primary baking sources (e.g. King Arthur Baking Company) or government composition databases (USDA FoodData Central).</p>

        <h3>2. Volume Scaling Across Cup Standards</h3>
        <p>When switching between US Customary (236.588 mL), US Legal (240 mL), and Metric (250 mL) cup standards, our engine dynamically scales ingredient density proportionally to the exact target cup volume.</p>

        <h3>3. Practical Kitchen Measure Decomposition</h3>
        <p>Instead of displaying obscure mathematical fractions like 5/6 cup, our engine decomposes remainder volume into familiar kitchen measuring tools: whole cups + ¾, ½, ⅓, ¼ cup + tablespoons + teaspoons.</p>

        <h3>4. Full Floating-Point Precision</h3>
        <p>Internal calculations retain 64-bit floating-point precision. Rounding is applied strictly at the final rendering stage so rounding errors never compound during bidirectional calculations.</p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Reference Data &amp; Tools</h2>
      <div class="grid-cards">
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">All source citations in one table</span>
        </a>
        <a href="/cup-sizes/" class="card-link">
          <span class="card-title">Cup Sizes Explained</span>
          <span class="card-desc">US Customary vs Metric volumes</span>
        </a>
        <a href="/about/" class="card-link">
          <span class="card-title">About Grams to Cups</span>
          <span class="card-desc">Our mission for baking accuracy</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// conversion-chart
{
  const filePath = 'conversion-chart/index.html';
  const title = 'Printable Grams to Cups Conversion Chart for Kitchens';
  const desc = 'Printable grams-to-cups conversion chart for common baking ingredients with practical kitchen fractions and source notes.';
  const canonical = 'https://thegramstocups.com/conversion-chart/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Conversion Chart", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Printable Grams to Cups Conversion Chart</h1>
      <p class="hero-subhead">A quick kitchen reference chart for common recipe quantities in grams, decimal cups, and spoon measures.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">Kitchen Reference Table</h2>
      <div class="prose">
        <p>Quick lookup table for common kitchen weights across 5 core baking staples using US Customary Cups (236.6 mL).</p>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Ingredient</th><th>25g</th><th>50g</th><th>100g</th><th>150g</th><th>200g</th><th>250g</th></tr></thead>
          <tbody>
            <tr><td><strong>Flour</strong> (120g/cup)</td><td>3 tbsp</td><td>6.5 tbsp</td><td>¾ cup + 1 tbsp</td><td>1 ¼ cups</td><td>1 ⅔ cups</td><td>2 1/16 cups</td></tr>
            <tr><td><strong>Sugar</strong> (198g/cup)</td><td>2 tbsp</td><td>¼ cup</td><td>½ cup</td><td>¾ cup + 1 tsp</td><td>1 cup</td><td>1 ¼ cups</td></tr>
            <tr><td><strong>Butter</strong> (227g/cup)</td><td>1.75 tbsp</td><td>3.5 tbsp</td><td>7 tbsp (0.88 sticks)</td><td>¾ cup</td><td>14 tbsp</td><td>1 1/10 cups</td></tr>
            <tr><td><strong>Brown Sugar</strong> (213g/cup)</td><td>2 tbsp</td><td>3.75 tbsp</td><td>½ cup - 1 tbsp</td><td>0.70 cups</td><td>0.94 cups</td><td>1 ⅙ cups</td></tr>
            <tr><td><strong>Oats</strong> (89g/cup)</td><td>¼ cup</td><td>½ cup + 1 tbsp</td><td>1 ⅛ cups</td><td>1 ⅔ cups</td><td>2 ¼ cups</td><td>2 ¾ cups</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">More Calculators &amp; Tables</h2>
      <div class="grid-cards">
        <a href="/50-grams-to-cups/" class="card-link">
          <span class="card-title">50 Grams Matrix</span>
          <span class="card-desc">10-ingredient 50g breakdown</span>
        </a>
        <a href="/100-grams-to-cups/" class="card-link">
          <span class="card-title">100 Grams Matrix</span>
          <span class="card-desc">10-ingredient 100g benchmark</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Full 10-ingredient density list</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// about
{
  const filePath = 'about/index.html';
  const title = 'About Us | The Grams to Cups Converter';
  const desc = 'Learn why this grams-to-cups tool exists, how our conversion data is researched, and our principles for baking accuracy and source transparency.';
  const canonical = 'https://thegramstocups.com/about/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">About The Grams to Cups Converter</h1>
      <p class="hero-subhead">Our mission is to eliminate baking failures by providing accurate, transparent, source-backed ingredient weight conversions.</p>
    </section>

    <!-- Pre-Reserved Ad Container -->
    <div class="ad-slot-container" aria-label="Advertisement Slot">
      <span>Advertisement</span>
    </div>

    <section class="content-section">
      <h2 class="section-title">Our Editorial &amp; Data Principles</h2>
      <div class="prose">
        <p><strong>The Problem We Solve:</strong> Most online measurement converters treat a cup of flour, a cup of sugar, and a cup of honey as if they were identical physics constants. In reality, bulk density varies dramatically depending on ingredient variety, preparation state (spooned vs scooped, packed vs loose), and international cup standards.</p>

        <p><strong>Our Solution:</strong> We built thegramstocups.com as a source-transparent kitchen scale utility. Every single calculation discloses its underlying reference source (such as King Arthur Baking Company or USDA FoodData Central), preparation assumptions, and practical kitchen spoon breakdowns.</p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">Explore Our Methodology &amp; Data</h2>
      <div class="grid-cards">
        <a href="/methodology/" class="card-link">
          <span class="card-title">Data Methodology</span>
          <span class="card-desc">Sourcing & precision rules</span>
        </a>
        <a href="/grams-per-cup/" class="card-link">
          <span class="card-title">Master Density Chart</span>
          <span class="card-desc">Complete ingredient weights</span>
        </a>
        <a href="/contact/" class="card-link">
          <span class="card-title">Contact &amp; Feedback</span>
          <span class="card-desc">Report data discrepancies</span>
        </a>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// contact
{
  const filePath = 'contact/index.html';
  const title = 'Contact Us & Report Data Issues | The Grams to Cups Converter';
  const desc = 'Contact the team to report a data conversion issue, suggest a new ingredient, question a source, or submit feedback.';
  const canonical = 'https://thegramstocups.com/contact/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Contact &amp; User Feedback</h1>
      <p class="hero-subhead">Have a question about a conversion reference or want to report a data correction?</p>
    </section>

    <section class="content-section">
      <h2 class="section-title">Get in Touch</h2>
      <div class="prose">
        <p>We take culinary measurement precision seriously. If you discover a conflicting reference source, want to request a new ingredient, or wish to submit feedback, please reach out to us:</p>
        <p style="font-size:1.125rem; font-weight:600; color:var(--brand-terracotta); margin:1rem 0;">Email: support@thegramstocups.com</p>
        <p>Our editorial team reviews all dataset inquiries within 48 business hours.</p>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// privacy
{
  const filePath = 'privacy/index.html';
  const title = 'Privacy Policy | The Grams to Cups Converter';
  const desc = 'Read how thegramstocups.com handles analytics, cookies, advertising, and personal information.';
  const canonical = 'https://thegramstocups.com/privacy/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Privacy Policy</h1>
      <p class="hero-subhead">Last updated: September 2026</p>
    </section>

    <section class="content-section">
      <div class="prose">
        <p>Your privacy is important to us. This Privacy Policy governs your use of thegramstocups.com ("the Website").</p>
        <h3>1. Information We Collect</h3>
        <p>We do not require user accounts or collect personal identifiable information (PII) to perform unit conversions. Calculations run locally in your web browser.</p>
        <h3>2. Analytics &amp; Cookies</h3>
        <p>We use standard web analytics tools (such as Google Analytics) to aggregate anonymous traffic statistics, such as pageviews, device type, and referring sites. Third-party vendors (including Google AdSense) may use cookies to serve ads based on prior visits to our site.</p>
        <h3>3. Contact Us</h3>
        <p>If you have questions regarding this Privacy Policy, email support@thegramstocups.com.</p>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

// terms
{
  const filePath = 'terms/index.html';
  const title = 'Terms of Use | The Grams to Cups Converter';
  const desc = 'Terms of use and informational disclaimer for using thegramstocups.com website and conversion tools.';
  const canonical = 'https://thegramstocups.com/terms/';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "description": desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thegramstocups.com/" },
          { "@type": "ListItem", "position": 2, "name": "Terms of Use", "item": canonical }
        ]
      }
    ]
  };

  const headContent = cleanAndFormatHead(title, desc, canonical, schema);

  const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body>

${SHARED_HEADER_AND_DRAWER}

  <main class="container">
    <section class="hero-section">
      <h1 class="hero-title">Terms of Use</h1>
      <p class="hero-subhead">Last updated: September 2026</p>
    </section>

    <section class="content-section">
      <div class="prose">
        <p>By accessing thegramstocups.com, you agree to comply with these Terms of Use.</p>
        <h3>1. Informational Disclaimer</h3>
        <p>All calculations, density charts, and measurement conversions provided on this website are for informational, baking, and culinary purposes only. While we strive for extreme data accuracy and transparent sourcing, kitchen variables (such as packing density and moisture) can affect physical volume.</p>
        <h3>2. Intellectual Property</h3>
        <p>The code, design system, layout, and original editorial content on this site are protected by copyright laws.</p>
      </div>
    </section>
  </main>

${SHARED_FOOTER}

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log(`Updated ${filePath}`);
}

console.log('All 23 website pages successfully standardized with rich content & schema!');
