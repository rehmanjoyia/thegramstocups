var $=Object.defineProperty;var M=(t,e,s)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var v=(t,e,s)=>M(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const g=[{id:"flour",name:"All-Purpose Flour",category:"flour",state:"Dry, spooned and leveled",gramsPerReferenceCup:120,referenceCupMl:236.588,measurementMethod:"Fluffed, spooned gently into cup, and leveled with a straight edge",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"Official Ingredient Weight Chart"},alternativeSources:[{name:"USDA Food Buying Guide",gramsPerCup:125,note:"USDA lists enriched white flour at 125g per cup using standard commercial packing."}],confidence:"high",aliases:["ap flour","white flour","plain flour","all purpose flour"],notes:"Flour density varies greatly with technique. Dipping a measuring cup directly into a flour bag packs it down, resulting in up to 140g per cup.",metaDescription:"Convert flour grams to cups with a source-backed 120g/cup reference (King Arthur Baking). Includes practical kitchen fractions and spooning tips."},{id:"sugar",name:"Granulated White Sugar",category:"sugar",state:"Granulated, dry",gramsPerReferenceCup:198,referenceCupMl:236.588,measurementMethod:"Poured or scooped and leveled",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"Official Ingredient Weight Chart"},alternativeSources:[{name:"Standard Kitchen Chart Rounding",gramsPerCup:200,note:"Many general recipe conversion charts round granulated sugar to 200g per cup."}],confidence:"high",aliases:["white sugar","table sugar","granulated sugar","sugar"],notes:"Granulated sugar has a consistent density because crystals do not pack or compress significantly.",metaDescription:"Convert granulated white sugar grams to cups using source-backed weights. Get precise decimal cups, kitchen fractions, and quick baking charts."},{id:"butter",name:"Butter",category:"butter",state:"Solid / softened (standard stick)",gramsPerReferenceCup:227,referenceCupMl:236.588,measurementMethod:"Packed solid into cup or measured by stick",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"113.5g per half cup (1 stick)"},confidence:"high",aliases:["unsalted butter","salted butter","butter stick"],stickEquivalentGrams:113.5,notes:"1 cup of butter equals 2 standard US sticks (8 tablespoons or 227g). 1 stick equals 1/2 cup (113.5g).",metaDescription:"Convert butter grams to cups, sticks, and tablespoons. Source-backed at 227g per cup (113.5g per stick) for precise baking."},{id:"brown-sugar",name:"Brown Sugar (Packed)",category:"sugar",state:"Firmly packed",gramsPerReferenceCup:213,referenceCupMl:236.588,measurementMethod:"Firmly packed into measuring cup until it holds its shape",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"Official Ingredient Weight Chart"},alternativeSources:[{name:"Unpacked / Loose Brown Sugar",gramsPerCup:170,note:"Unpacked brown sugar weighs roughly 170g per cup."}],confidence:"high",aliases:["light brown sugar","dark brown sugar","packed brown sugar"],notes:"Standard baking recipes specify packed brown sugar. If your recipe calls for unpacked brown sugar, density is lower.",metaDescription:"Convert packed brown sugar grams to cups with a source-backed 213g reference weight. Exposes packed vs loose preparation state."},{id:"powdered-sugar",name:"Powdered / Confectioners' Sugar",category:"sugar",state:"Unsifted",gramsPerReferenceCup:113,referenceCupMl:236.588,measurementMethod:"Lightly spooned into cup unsifted",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"Official Ingredient Weight Chart"},alternativeSources:[{name:"Sifted Powdered Sugar",gramsPerCup:100,note:"Sifted powdered sugar contains more air pockets and weighs approximately 100g per cup."}],confidence:"high",aliases:["icing sugar","confectioners sugar","10x sugar","powdered sugar"],notes:"Always verify if a recipe asks to measure powdered sugar before or after sifting.",metaDescription:"Convert powdered sugar (icing sugar) grams to cups with clear unsifted (113g/cup) vs sifted (100g/cup) reference disclosures."},{id:"oats",name:"Rolled Oats",category:"grain",state:"Dry, old-fashioned rolled oats",gramsPerReferenceCup:89,referenceCupMl:236.588,measurementMethod:"Scooped gently and leveled",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"Official Ingredient Weight Chart"},alternativeSources:[{name:"USDA Food Buying Guide",gramsPerCup:81,note:"USDA lists 81g per cup for regular and quick rolled oats."}],confidence:"high",aliases:["old fashioned oats","rolled oats","oatmeal","quick oats"],notes:"Steel-cut oats are much denser (approx 170g/cup). This reference applies to old-fashioned rolled oats.",metaDescription:"Convert rolled oats grams to cups with source-backed references (King Arthur 89g vs USDA 81g). Get practical baking fractions."},{id:"rice",name:"Uncooked White Rice",category:"grain",state:"Uncooked, long grain dry",gramsPerReferenceCup:185,referenceCupMl:236.588,measurementMethod:"Scooped and leveled dry",primarySource:{name:"USDA FoodData Central / Culinary Reference",publicationOrRecord:"USDA Standard Reference Portion Data"},confidence:"medium_pinned",aliases:["white rice","raw rice","jasmine rice","basmati rice","dry rice"],notes:"1 cup of uncooked white rice yields approximately 3 cups of cooked rice. Cooked rice density differs significantly.",metaDescription:"Convert uncooked white rice grams to cups with dry state clearly identified. See common recipe conversion tables."},{id:"honey",name:"Honey",category:"sweetener",state:"Liquid at room temperature",gramsPerReferenceCup:336,referenceCupMl:236.588,measurementMethod:"Poured liquid volume (21g per tbsp × 16 tbsp)",primarySource:{name:"King Arthur Baking Company",url:"https://www.kingarthurbaking.com/learn/ingredient-weight-chart",publicationOrRecord:"21g per tablespoon"},alternativeSources:[{name:"Commercial Conversion Charts",gramsPerCup:340,note:"Many commercial kitchen charts round honey density to 340g per cup."}],confidence:"high",aliases:["pure honey","raw honey","liquid honey"],tablespoonEquivalentGrams:21,notes:"Honey is a dense viscous liquid. 1 tablespoon weighs exactly 21 grams.",metaDescription:"Convert honey grams to cups, tablespoons, and teaspoons. Source-backed at 336g/cup (21g per tbsp) for sticky ingredient accuracy."},{id:"oil",name:"Vegetable / Olive Oil",category:"oil",state:"Liquid (density 0.915 g/mL)",gramsPerReferenceCup:216,referenceCupMl:236.588,measurementMethod:"Poured liquid measure",primarySource:{name:"USDA FoodData Central",publicationOrRecord:"FDC ID 171413 (Olive Oil / Vegetable Oil)"},confidence:"medium_pinned",aliases:["olive oil","vegetable oil","canola oil","cooking oil","sunflower oil"],notes:"Cooking oils float on water because their density (approx 0.915 g/mL) is lower than water (1.0 g/mL).",metaDescription:"Convert cooking oil grams to cups and tablespoons with liquid density (0.915 g/mL) transparency."},{id:"milk",name:"Whole Milk",category:"liquid",state:"Liquid (density 1.03 g/mL)",gramsPerReferenceCup:244,referenceCupMl:236.588,measurementMethod:"Poured liquid measure",primarySource:{name:"USDA FoodData Central",publicationOrRecord:"FDC ID 171265 (Whole Milk 3.25%)"},confidence:"medium_pinned",aliases:["whole milk","fresh milk","milk","dairy milk"],notes:"Milk is slightly denser than pure water (236.6g/cup) due to milk solids, fat, and sugar content.",metaDescription:"Convert whole milk grams to cups with USDA FoodData Central reference values and cup-standard options."}];function y(t){return g.find(e=>e.id===t)}const h={us_customary:{id:"us_customary",name:"US Customary Cup",shortName:"US Customary (236.6 mL)",volumeMl:236.588,description:"Standard American baking cup used in most US recipes & King Arthur charts.",isDefault:!0},us_legal:{id:"us_legal",name:"US Legal / Nutrition Label Cup",shortName:"US Legal (240 mL)",volumeMl:240,description:"FDA nutrition labeling standard cup (exactly 240 mL).",isDefault:!1},metric:{id:"metric",name:"Metric Cup",shortName:"Metric (250 mL)",volumeMl:250,description:"International & Commonwealth standard (Australia, NZ, UK, Canada).",isDefault:!1}},f=h.us_customary,A=[{decimal:.125,label:"1/8",unicode:"⅛"},{decimal:.25,label:"1/4",unicode:"¼"},{decimal:.33333,label:"1/3",unicode:"⅓"},{decimal:.375,label:"3/8",unicode:"⅜"},{decimal:.5,label:"1/2",unicode:"½"},{decimal:.625,label:"5/8",unicode:"⅝"},{decimal:.66667,label:"2/3",unicode:"⅔"},{decimal:.75,label:"3/4",unicode:"¾"},{decimal:.875,label:"7/8",unicode:"⅞"}];function C(t,e,s=f){if(t<0||isNaN(t)||!isFinite(t))throw new Error("Invalid grams input");if(t===0)return L(e,s);const a=e.gramsPerReferenceCup*(s.volumeMl/e.referenceCupMl),n=t/a,o=d(n),i=R(n),c=P(n);let r;if(e.id==="butter"){const p=t/113.5;r=D(p)}let l,u;const m=n*16;l=`${d(m)} tbsp`,u=`${d(m*3)} tsp`;let b;if(e.alternativeSources&&e.alternativeSources.length>0){const p=e.alternativeSources[0],k=p.gramsPerCup*(s.volumeMl/e.referenceCupMl),S=t/k;b={sourceName:p.name,grams:t,cups:S,note:p.note}}return{grams:t,cups:n,decimalCupsFormatted:o,fractionFormatted:i,practicalMeasure:c,butterSticksFormatted:r,tablespoonFormatted:l,teaspoonFormatted:u,ingredient:e,cupStandard:s,sourceAttribution:{sourceName:e.primarySource.name,gramsPerCupReference:e.gramsPerReferenceCup,state:e.state,method:e.measurementMethod},alternateComparison:b}}function w(t,e,s=f){if(t<0||isNaN(t)||!isFinite(t))throw new Error("Invalid cups input");if(t===0)return 0;const a=s.volumeMl/e.referenceCupMl,n=t*e.gramsPerReferenceCup*a;return Math.round(n*10)/10}function d(t){if(t===0)return"0";if(t>=10)return Math.round(t).toString();const e=t.toFixed(3);return parseFloat(e).toString()}function R(t){const e=Math.floor(t),s=t-e;if(s<.05)return e>0?`${e}`:"0";if(s>.95)return`${e+1}`;let a=null,n=1;for(const o of A){const i=Math.abs(s-o.decimal);i<n&&(n=i,a=o)}return a&&n<.06?e>0?`${e} ${a.unicode}`:a.unicode:d(t)}function P(t){if(t<=0)return"0 cups";const e=Math.floor(t);let a=(t-e)*16,n="";e>0&&(n=`${e} ${e===1?"cup":"cups"}`);let o="";a>=11.5?(o="¾ cup",a-=12):a>=9.5?(o="⅔ cup",a-=10.667):a>=7.5?(o="½ cup",a-=8):a>=4.8?(o="⅓ cup",a-=5.333):a>=3.5?(o="¼ cup",a-=4):a>=1.8&&(o="⅛ cup",a-=2);const i=[n,o].filter(Boolean).join(" + ");let c=Math.floor(a),r=a-c;r<0&&(c=0,r=0);let l=Math.round(r*3);l===3&&(c+=1,l=0);const u=[];return i&&u.push(i),c>0&&u.push(`${c} tbsp`),l>0&&u.push(`${l} tsp`),u.length===0?"0 cups":u.join(" + ")}function D(t){return t===0?"0 sticks":t===1?"1 stick":t===.5?"½ stick (4 tbsp)":t===.25?"¼ stick (2 tbsp)":`${Math.round(t*100)/100} sticks`}function L(t,e){return{grams:0,cups:0,decimalCupsFormatted:"0",fractionFormatted:"0",practicalMeasure:"0 cups",butterSticksFormatted:t.id==="butter"?"0 sticks":void 0,tablespoonFormatted:"0 tbsp",teaspoonFormatted:"0 tsp",ingredient:t,cupStandard:e,sourceAttribution:{sourceName:t.primarySource.name,gramsPerCupReference:t.gramsPerReferenceCup,state:t.state,method:t.measurementMethod}}}class O{constructor(e,s){v(this,"container");v(this,"state");const a=document.getElementById(e);if(!a)throw new Error(`Calculator container #${e} not found`);this.container=a,this.state={direction:"gramsToCups",value:100,ingredientId:"flour",cupStandardId:"us_customary",showAlternate:!1,...s},this.render(),this.attachEventListeners()}setState(e){this.state={...this.state,...e},this.render(),this.attachEventListeners()}getState(){return{...this.state}}render(){const e=y(this.state.ingredientId)||g[0],s=h[this.state.cupStandardId]||f,a=this.state.direction==="gramsToCups",n=a?"Grams (g)":"Cups",o=a?"e.g. 100":"e.g. 1";let i="";if(a){const r=C(this.state.value,e,s),l=r.alternateComparison&&this.state.showAlternate?`<div class="provenance-line" style="margin-top:0.375rem; color:var(--brand-terracotta);">
            <span class="provenance-label">Alternative Reference:</span> ${r.alternateComparison.sourceName} (${r.alternateComparison.note}) &rarr; <strong>${d(r.alternateComparison.cups)} cups</strong>
           </div>`:"",u=r.alternateComparison?`<button type="button" class="alt-toggle-link" id="alt-toggle-btn">
            ${this.state.showAlternate?"Hide alternative reference":`Compare with ${r.alternateComparison.sourceName}`}
           </button>`:"",m=r.butterSticksFormatted?`<div class="practical-badge">
            <span>Butter measure: <strong>${r.butterSticksFormatted}</strong></span>
           </div>`:"";i=`
        <div class="results-primary">
          <span class="result-number">${r.decimalCupsFormatted}</span>
          <span class="result-unit">${s.name}</span>
        </div>
        
        <div class="practical-badge">
          <span>Practical measure: <strong>${r.practicalMeasure}</strong></span>
        </div>

        ${m}

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Source:</span>
            <span>${r.sourceAttribution.sourceName} (${r.sourceAttribution.gramsPerCupReference}g / cup)</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">State & Method:</span>
            <span>${r.sourceAttribution.state} • ${r.sourceAttribution.method}</span>
          </div>
          <div style="margin-top:0.25rem;">
            ${u}
          </div>
          ${l}
        </div>
      `}else{const r=w(this.state.value,e,s);i=`
        <div class="results-primary">
          <span class="result-number">${d(r)}</span>
          <span class="result-unit">Grams (g)</span>
        </div>
        
        <div class="practical-badge">
          <span>Calculation: <strong>${this.state.value} ${s.name}</strong> of ${e.name}</span>
        </div>

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Density:</span>
            <span>${e.gramsPerReferenceCup}g per ${s.shortName}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Source:</span>
            <span>${e.primarySource.name} (${e.state})</span>
          </div>
        </div>
      `}const c=`
      <div class="calculator-card" id="calc-card-inner">
        <div class="controls-bar">
          <div class="toggle-group">
            <button type="button" class="toggle-btn ${a?"active":""}" id="btn-dir-gtc">Grams &rarr; Cups</button>
            <button type="button" class="toggle-btn ${a?"":"active"}" id="btn-dir-ctg">Cups &rarr; Grams</button>
          </div>

          <div style="font-size:0.813rem; font-weight:700; color:var(--text-secondary);">
            Standard: 
            <select class="form-select" id="calc-cup-standard" style="display:inline-block; width:auto; height:36px; padding:0 0.5rem; font-size:0.813rem;">
              ${Object.values(h).map(r=>`
                <option value="${r.id}" ${r.id===this.state.cupStandardId?"selected":""}>
                  ${r.shortName}
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <div class="calculator-grid-inputs">
          <div class="form-group">
            <label class="form-label" for="calc-value-input">${n}</label>
            <div class="input-wrapper">
              <input 
                type="number" 
                id="calc-value-input" 
                class="form-input" 
                value="${this.state.value||""}" 
                placeholder="${o}" 
                step="any" 
                min="0"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="calc-ingredient-select">Select Ingredient</label>
            <select id="calc-ingredient-select" class="form-select">
              ${g.map(r=>`
                <option value="${r.id}" ${r.id===this.state.ingredientId?"selected":""}>
                  ${r.name} (${r.state})
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <div class="results-box" id="results-box">
          ${i}
        </div>
      </div>
    `;this.container.innerHTML=c}attachEventListeners(){const e=this.container.querySelector("#calc-value-input");e&&e.addEventListener("input",c=>{const r=parseFloat(c.target.value);this.state.value=isNaN(r)?0:r,this.updateResultsOnly()});const s=this.container.querySelector("#calc-ingredient-select");s&&s.addEventListener("change",c=>{this.state.ingredientId=c.target.value,this.render(),this.attachEventListeners()});const a=this.container.querySelector("#calc-cup-standard");a&&a.addEventListener("change",c=>{this.state.cupStandardId=c.target.value,this.updateResultsOnly()});const n=this.container.querySelector("#btn-dir-gtc");n&&n.addEventListener("click",()=>{this.state.direction!=="gramsToCups"&&(this.state.direction="gramsToCups",this.state.value=100,this.render(),this.attachEventListeners())});const o=this.container.querySelector("#btn-dir-ctg");o&&o.addEventListener("click",()=>{this.state.direction!=="cupsToGrams"&&(this.state.direction="cupsToGrams",this.state.value=1,this.render(),this.attachEventListeners())});const i=this.container.querySelector("#alt-toggle-btn");i&&i.addEventListener("click",()=>{this.state.showAlternate=!this.state.showAlternate,this.updateResultsOnly()})}updateResultsOnly(){const e=this.container.querySelector("#results-box");if(!e)return;const s=y(this.state.ingredientId)||g[0],a=h[this.state.cupStandardId]||f;if(this.state.direction==="gramsToCups"){const i=C(this.state.value,s,a),c=i.alternateComparison&&this.state.showAlternate?`<div class="provenance-line" style="margin-top:0.375rem; color:var(--brand-terracotta);">
            <span class="provenance-label">Alternative Reference:</span> ${i.alternateComparison.sourceName} (${i.alternateComparison.note}) &rarr; <strong>${d(i.alternateComparison.cups)} cups</strong>
           </div>`:"",r=i.alternateComparison?`<button type="button" class="alt-toggle-link" id="alt-toggle-btn">
            ${this.state.showAlternate?"Hide alternative reference":`Compare with ${i.alternateComparison.sourceName}`}
           </button>`:"",l=i.butterSticksFormatted?`<div class="practical-badge">
            <span>Butter measure: <strong>${i.butterSticksFormatted}</strong></span>
           </div>`:"";e.innerHTML=`
        <div class="results-primary">
          <span class="result-number">${i.decimalCupsFormatted}</span>
          <span class="result-unit">${a.name}</span>
        </div>
        
        <div class="practical-badge">
          <span>Practical measure: <strong>${i.practicalMeasure}</strong></span>
        </div>

        ${l}

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Source:</span>
            <span>${i.sourceAttribution.sourceName} (${i.sourceAttribution.gramsPerCupReference}g / cup)</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">State & Method:</span>
            <span>${i.sourceAttribution.state} • ${i.sourceAttribution.method}</span>
          </div>
          <div style="margin-top:0.25rem;">
            ${r}
          </div>
          ${c}
        </div>
      `}else{const i=w(this.state.value,s,a);e.innerHTML=`
        <div class="results-primary">
          <span class="result-number">${d(i)}</span>
          <span class="result-unit">Grams (g)</span>
        </div>
        
        <div class="practical-badge">
          <span>Calculation: <strong>${this.state.value} ${a.name}</strong> of ${s.name}</span>
        </div>

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Density:</span>
            <span>${s.gramsPerReferenceCup}g per ${a.shortName}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Source:</span>
            <span>${s.primarySource.name} (${s.state})</span>
          </div>
        </div>
      `}const o=e.querySelector("#alt-toggle-btn");o&&o.addEventListener("click",()=>{this.state.showAlternate=!this.state.showAlternate,this.updateResultsOnly()})}}export{O as C};
