import { INGREDIENTS, getIngredientById } from '../data/ingredients';
import { CUP_STANDARDS, DEFAULT_CUP_STANDARD } from '../data/cupStandards';
import { convertGramsToCups, convertCupsToGrams, formatDecimal } from '../utils/converter';

export interface CalculatorState {
  direction: 'gramsToCups' | 'cupsToGrams';
  value: number;
  ingredientId: string;
  cupStandardId: string;
  showAlternate: boolean;
}

export class CalculatorComponent {
  private container: HTMLElement;
  private state: CalculatorState;

  constructor(containerId: string, initialState?: Partial<CalculatorState>) {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Calculator container #${containerId} not found`);
    }
    this.container = el;

    this.state = {
      direction: 'gramsToCups',
      value: 100,
      ingredientId: 'flour',
      cupStandardId: 'us_customary',
      showAlternate: false,
      ...initialState
    };

    this.render();
    this.attachEventListeners();
  }

  public setState(newState: Partial<CalculatorState>) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.attachEventListeners();
  }

  public getState(): CalculatorState {
    return { ...this.state };
  }

  private render() {
    const ingredient = getIngredientById(this.state.ingredientId) || INGREDIENTS[0];
    const cupStandard = CUP_STANDARDS[this.state.cupStandardId] || DEFAULT_CUP_STANDARD;
    const isGramsToCups = this.state.direction === 'gramsToCups';

    const inputLabel = isGramsToCups ? 'Weight in grams' : 'Volume in cups';
    const inputPlaceholder = isGramsToCups ? 'e.g. 100' : 'e.g. 1';

    let resultHTML = '';
    if (isNaN(this.state.value) || this.state.value < 0) {
      resultHTML = `
        <div class="results-primary">
          <span class="result-number" style="font-size:1.75rem; color:var(--brand-terracotta);">Invalid input</span>
        </div>
        <div class="practical-badge" style="color:var(--brand-warm-dark);">
          <span>Please enter a positive ${isGramsToCups ? 'weight in grams' : 'volume in cups'}.</span>
        </div>
      `;
    } else if (isGramsToCups) {
      const result = convertGramsToCups(this.state.value, ingredient, cupStandard);
      const effectiveDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const gtcDensityNote = cupStandard.id !== 'us_customary'
        ? ` (${effectiveDensity}g per ${cupStandard.shortName})`
        : ` (${result.sourceAttribution.gramsPerCupReference}g / cup)`;
      
      const altHTML = (result.alternateComparison && this.state.showAlternate)
        ? `<div class="provenance-line" style="margin-top:0.375rem; color:var(--brand-terracotta);">
            <span class="provenance-label">Alternative Reference:</span> ${result.alternateComparison.sourceName} (${result.alternateComparison.note}) &rarr; <strong>${formatDecimal(result.alternateComparison.cups)} cups</strong>
           </div>`
        : '';

      const altToggleBtn = result.alternateComparison
        ? `<button type="button" class="alt-toggle-link" id="alt-toggle-btn">
            ${this.state.showAlternate ? 'Hide alternative reference' : `Compare with ${result.alternateComparison.sourceName}`}
           </button>`
        : '';

      const butterBadge = result.butterSticksFormatted
        ? `<div class="practical-badge">
            <span>Butter measure: <strong>${result.butterSticksFormatted}</strong></span>
           </div>`
        : '';

      const cupUnitLabel = (result.decimalCupsFormatted === '1' || result.decimalCupsFormatted === '<0.01')
        ? cupStandard.name
        : `${cupStandard.name}s`;

      resultHTML = `
        <div class="results-primary">
          <span class="result-number">${result.decimalCupsFormatted}</span>
          <span class="result-unit">${cupUnitLabel}</span>
        </div>
        
        <div class="practical-badge">
          <span>Approximately <strong>${result.practicalMeasure}</strong></span>
        </div>

        ${butterBadge}

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference source:</span>
            <span>${result.sourceAttribution.sourceName}${gtcDensityNote}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Measuring method:</span>
            <span>${result.sourceAttribution.state} • ${result.sourceAttribution.method}</span>
          </div>
          <div style="margin-top:0.25rem;">
            ${altToggleBtn}
          </div>
          ${altHTML}
        </div>
      `;
    } else {
      // Cups to Grams
      const gramsOutput = convertCupsToGrams(this.state.value, ingredient, cupStandard);
      const effectiveDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const ctgSourceLink = ingredient.primarySource.url
        ? `<a href="${ingredient.primarySource.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-underline-offset:2px;">${ingredient.primarySource.name}</a>`
        : ingredient.primarySource.name;
      const scalingNote = cupStandard.id !== 'us_customary'
        ? ` (${ingredient.gramsPerReferenceCup}g per US Cup, scaled for ${cupStandard.name})`
        : '';
      resultHTML = `
        <div class="results-primary">
          <span class="result-number">${formatDecimal(gramsOutput)}</span>
          <span class="result-unit">Grams (g)</span>
        </div>
        
        <div class="practical-badge">
          <span>Calculation: <strong>${this.state.value} ${cupStandard.name}</strong> of ${ingredient.name}</span>
        </div>

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Density:</span>
            <span>${effectiveDensity}g per ${cupStandard.shortName}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Source:</span>
            <span>${ctgSourceLink} (${ingredient.state})${scalingNote}</span>
          </div>
        </div>
      `;
    }

    const html = `
      <div class="calculator-card" id="calc-card-inner">
        <div class="controls-bar">
          <div class="toggle-group">
            <button type="button" class="toggle-btn ${isGramsToCups ? 'active' : ''}" id="btn-dir-gtc" aria-pressed="${isGramsToCups}">Grams &rarr; Cups</button>
            <button type="button" class="toggle-btn ${!isGramsToCups ? 'active' : ''}" id="btn-dir-ctg" aria-pressed="${!isGramsToCups}">Cups &rarr; Grams</button>
          </div>

          <div style="font-size:0.813rem; font-weight:700; color:var(--text-secondary);">
            <label for="calc-cup-standard" style="font-weight:700; color:var(--text-secondary); font-size:0.813rem;">Cup size:</label>
            <select class="form-select" id="calc-cup-standard" style="display:inline-block; width:auto; height:36px; padding:0 0.5rem; font-size:0.813rem;">
              ${Object.values(CUP_STANDARDS).map(cs => `
                <option value="${cs.id}" ${cs.id === this.state.cupStandardId ? 'selected' : ''}>
                  ${cs.shortName}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="calculator-grid-inputs">
          <div class="form-group">
            <label class="form-label" for="calc-value-input">${inputLabel}</label>
            <div class="input-wrapper">
              <input 
                type="number" 
                id="calc-value-input" 
                class="form-input" 
                value="${this.state.value || ''}" 
                placeholder="${inputPlaceholder}" 
                step="any" 
                min="0"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="calc-ingredient-select">Ingredient</label>
            <select id="calc-ingredient-select" class="form-select">
              ${INGREDIENTS.map(ing => `
                <option value="${ing.id}" ${ing.id === this.state.ingredientId ? 'selected' : ''}>
                  ${ing.name} (${ing.state})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="results-box" id="results-box" aria-live="polite" aria-atomic="true">
          ${resultHTML}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  private attachEventListeners() {
    const valInput = this.container.querySelector('#calc-value-input') as HTMLInputElement;
    if (valInput) {
      valInput.addEventListener('input', (e) => {
        const raw = (e.target as HTMLInputElement).value.trim();
        if (raw === '') {
          this.state.value = 0;
          this.updateResultsOnly();
          return;
        }
        const val = parseFloat(raw);
        this.state.value = val;
        this.updateResultsOnly();
      });
    }

    const ingSelect = this.container.querySelector('#calc-ingredient-select') as HTMLSelectElement;
    if (ingSelect) {
      ingSelect.addEventListener('change', (e) => {
        this.state.ingredientId = (e.target as HTMLSelectElement).value;
        this.render();
        this.attachEventListeners();
      });
    }

    const csSelect = this.container.querySelector('#calc-cup-standard') as HTMLSelectElement;
    if (csSelect) {
      csSelect.addEventListener('change', (e) => {
        this.state.cupStandardId = (e.target as HTMLSelectElement).value;
        this.updateResultsOnly();
      });
    }

    const btnGtc = this.container.querySelector('#btn-dir-gtc');
    if (btnGtc) {
      btnGtc.addEventListener('click', () => {
        if (this.state.direction !== 'gramsToCups') {
          this.state.direction = 'gramsToCups';
          this.state.value = 100;
          this.render();
          this.attachEventListeners();
        }
      });
    }

    const btnCtg = this.container.querySelector('#btn-dir-ctg');
    if (btnCtg) {
      btnCtg.addEventListener('click', () => {
        if (this.state.direction !== 'cupsToGrams') {
          this.state.direction = 'cupsToGrams';
          this.state.value = 1;
          this.render();
          this.attachEventListeners();
        }
      });
    }

    const altBtn = this.container.querySelector('#alt-toggle-btn');
    if (altBtn) {
      altBtn.addEventListener('click', () => {
        this.state.showAlternate = !this.state.showAlternate;
        this.updateResultsOnly();
      });
    }
  }

  private updateResultsOnly() {
    const resultsBox = this.container.querySelector('#results-box');
    if (!resultsBox) return;

    const ingredient = getIngredientById(this.state.ingredientId) || INGREDIENTS[0];
    const cupStandard = CUP_STANDARDS[this.state.cupStandardId] || DEFAULT_CUP_STANDARD;
    const isGramsToCups = this.state.direction === 'gramsToCups';

    if (isNaN(this.state.value) || this.state.value < 0) {
      resultsBox.innerHTML = `
        <div class="results-primary">
          <span class="result-number" style="font-size:1.75rem; color:var(--brand-terracotta);">Invalid input</span>
        </div>
        <div class="practical-badge" style="color:var(--brand-warm-dark);">
          <span>Please enter a positive ${isGramsToCups ? 'weight in grams' : 'volume in cups'}.</span>
        </div>
      `;
      return;
    }

    if (isGramsToCups) {
      const result = convertGramsToCups(this.state.value, ingredient, cupStandard);
      const effectiveDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const gtcDensityNote = cupStandard.id !== 'us_customary'
        ? ` (${effectiveDensity}g per ${cupStandard.shortName})`
        : ` (${result.sourceAttribution.gramsPerCupReference}g / cup)`;
      
      const altHTML = (result.alternateComparison && this.state.showAlternate)
        ? `<div class="provenance-line" style="margin-top:0.375rem; color:var(--brand-terracotta);">
            <span class="provenance-label">Alternative Reference:</span> ${result.alternateComparison.sourceName} (${result.alternateComparison.note}) &rarr; <strong>${formatDecimal(result.alternateComparison.cups)} cups</strong>
           </div>`
        : '';

      const altToggleBtn = result.alternateComparison
        ? `<button type="button" class="alt-toggle-link" id="alt-toggle-btn">
            ${this.state.showAlternate ? 'Hide alternative reference' : `Compare with ${result.alternateComparison.sourceName}`}
           </button>`
        : '';

      const butterBadge = result.butterSticksFormatted
        ? `<div class="practical-badge">
            <span>Butter measure: <strong>${result.butterSticksFormatted}</strong></span>
           </div>`
        : '';

      const cupUnitLabel = (result.decimalCupsFormatted === '1' || result.decimalCupsFormatted === '<0.01')
        ? cupStandard.name
        : `${cupStandard.name}s`;

      resultsBox.innerHTML = `
        <div class="results-primary">
          <span class="result-number">${result.decimalCupsFormatted}</span>
          <span class="result-unit">${cupUnitLabel}</span>
        </div>
        
        <div class="practical-badge">
          <span>Approximately <strong>${result.practicalMeasure}</strong></span>
        </div>

        ${butterBadge}

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference source:</span>
            <span>${result.sourceAttribution.sourceName}${gtcDensityNote}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Measuring method:</span>
            <span>${result.sourceAttribution.state} • ${result.sourceAttribution.method}</span>
          </div>
          <div style="margin-top:0.25rem;">
            ${altToggleBtn}
          </div>
          ${altHTML}
        </div>
      `;
    } else {
      const gramsOutput = convertCupsToGrams(this.state.value, ingredient, cupStandard);
      const effDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const updSourceLink = ingredient.primarySource.url
        ? `<a href="${ingredient.primarySource.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-underline-offset:2px;">${ingredient.primarySource.name}</a>`
        : ingredient.primarySource.name;
      const scalingNote = cupStandard.id !== 'us_customary'
        ? ` (${ingredient.gramsPerReferenceCup}g per US Cup, scaled for ${cupStandard.name})`
        : '';
      resultsBox.innerHTML = `
        <div class="results-primary">
          <span class="result-number">${formatDecimal(gramsOutput)}</span>
          <span class="result-unit">Grams (g)</span>
        </div>
        
        <div class="practical-badge">
          <span>Calculation: <strong>${this.state.value} ${cupStandard.name}</strong> of ${ingredient.name}</span>
        </div>

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference Density:</span>
            <span>${effDensity}g per ${cupStandard.shortName}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Source:</span>
            <span>${updSourceLink} (${ingredient.state})${scalingNote}</span>
          </div>
        </div>
      `;
    }

    const altBtn = resultsBox.querySelector('#alt-toggle-btn');
    if (altBtn) {
      altBtn.addEventListener('click', () => {
        this.state.showAlternate = !this.state.showAlternate;
        this.updateResultsOnly();
      });
    }
  }
}
