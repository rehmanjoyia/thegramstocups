import { INGREDIENTS, getIngredientById } from '../data/ingredients';
import { CUP_STANDARDS, DEFAULT_CUP_STANDARD } from '../data/cupStandards';
import { convertGramsToCups, convertCupsToGrams, formatCupDecimal, formatGramDecimal } from '../utils/converter';

export interface CalculatorState {
  direction: 'gramsToCups' | 'cupsToGrams';
  value: number | null;
  displayValue?: string;
  selectedFraction?: string | null;
  ingredientId: string;
  cupStandardId: string;
  showAlternate: boolean;
}

function parseInputValue(raw: string): { val: number | null; fraction?: string; display?: string } {
  const trimmed = raw.trim();
  if (trimmed === '') return { val: null };
  if (trimmed === '⅓' || trimmed === '1/3') return { val: 1 / 3, fraction: '1/3', display: '⅓' };
  if (trimmed === '⅔' || trimmed === '2/3') return { val: 2 / 3, fraction: '2/3', display: '⅔' };
  if (trimmed === '¼' || trimmed === '1/4') return { val: 0.25, fraction: '1/4', display: '¼' };
  if (trimmed === '½' || trimmed === '1/2') return { val: 0.5, fraction: '1/2', display: '½' };
  if (trimmed === '¾' || trimmed === '3/4') return { val: 0.75, fraction: '3/4', display: '¾' };
  if (trimmed === '1') return { val: 1, fraction: '1', display: '1' };

  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return { val: num / den, display: trimmed };
      }
    }
  }

  const num = parseFloat(trimmed);
  if (isNaN(num)) return { val: NaN };
  return { val: num, display: trimmed };
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

    const defaultDir = (el.dataset.direction as CalculatorState['direction']) || 'gramsToCups';
    const initialVal = el.dataset.value ? parseFloat(el.dataset.value) : (defaultDir === 'gramsToCups' ? 100 : 1);

    this.state = {
      direction: defaultDir,
      value: initialVal,
      displayValue: String(initialVal),
      selectedFraction: null,
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

  private generateResultsHTML(): string {
    const ingredient = getIngredientById(this.state.ingredientId) || INGREDIENTS[0];
    const cupStandard = CUP_STANDARDS[this.state.cupStandardId] || DEFAULT_CUP_STANDARD;
    const isGramsToCups = this.state.direction === 'gramsToCups';

    // Blank / empty input state: clear answer and prompt for an amount
    if (this.state.value === null) {
      return `
        <div class="results-primary">
          <span class="result-number" style="font-size:1.5rem; color:var(--text-secondary);">Enter an amount</span>
        </div>
        <div class="practical-badge" style="color:var(--text-secondary);">
          <span>Enter a ${isGramsToCups ? 'gram weight' : 'cup volume'} above to calculate the conversion.</span>
        </div>
      `;
    }

    // Negative or invalid input
    if (isNaN(this.state.value) || this.state.value < 0) {
      return `
        <div class="results-primary">
          <span class="result-number" style="font-size:1.75rem; color:var(--brand-terracotta);">Invalid input</span>
        </div>
        <div class="practical-badge" style="color:var(--brand-warm-dark);">
          <span>Please enter a positive ${isGramsToCups ? 'weight in grams' : 'volume in cups'}.</span>
        </div>
      `;
    }

    const spoonHelper = cupStandard.id === 'us_customary'
      ? 'US customary spoons'
      : '15mL tbsp · 5mL tsp';

    if (isGramsToCups) {
      const result = convertGramsToCups(this.state.value, ingredient, cupStandard);
      const effectiveDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const gtcDensityNote = cupStandard.id !== 'us_customary'
        ? ` (${effectiveDensity}g per ${cupStandard.shortName})`
        : ` (${result.sourceAttribution.gramsPerCupReference}g / cup)`;
      
      const gtcSourceLink = ingredient.primarySource.url
        ? `<a href="${ingredient.primarySource.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-underline-offset:2px;text-decoration:underline;">${result.sourceAttribution.sourceName}</a>`
        : result.sourceAttribution.sourceName;

      let altHTML = '';
      let altToggleBtn = '';

      if (result.alternateComparison) {
        const altSourceDisplay = result.alternateComparison.url
          ? `<a href="${result.alternateComparison.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-underline-offset:2px;text-decoration:underline;">${result.alternateComparison.sourceName}</a>`
          : result.alternateComparison.sourceName;
        const formattedAltCups = formatCupDecimal(result.alternateComparison.cups);
        const altCupUnit = (formattedAltCups === '1' || formattedAltCups === '<0.01') ? 'cup' : 'cups';

        if (this.state.showAlternate) {
          altHTML = `
            <div class="provenance-line" style="margin-top:0.375rem; color:var(--brand-terracotta);">
              <span class="provenance-label">Alternative Reference:</span> ${altSourceDisplay} (${result.alternateComparison.note}) &rarr; <strong>${formattedAltCups} ${altCupUnit}</strong>
            </div>
          `;
        }

        altToggleBtn = `
          <button type="button" class="alt-toggle-link" id="alt-toggle-btn">
            ${this.state.showAlternate ? 'Hide alternative reference' : `Compare with ${result.alternateComparison.sourceName}`}
          </button>
        `;
      }

      const butterBadge = result.butterSticksFormatted
        ? `<div class="practical-badge">
            <span>Butter measure: <strong>${result.butterSticksFormatted}</strong></span>
           </div>`
        : '';

      const cupUnitLabel = (result.decimalCupsFormatted === '1' || result.decimalCupsFormatted === '<0.01')
        ? cupStandard.name
        : `${cupStandard.name}s`;

      return `
        <div class="results-primary">
          <span class="result-number">${result.decimalCupsFormatted}</span>
          <span class="result-unit">${cupUnitLabel}</span>
        </div>
        
        <div class="practical-badge">
          <span>Approximately <strong>${result.practicalMeasure}</strong> <span class="spoon-standard-helper">(${spoonHelper})</span></span>
        </div>

        ${butterBadge}

        <div class="provenance-card">
          <div class="provenance-line">
            <span class="provenance-label">Reference source:</span>
            <span>${gtcSourceLink}${gtcDensityNote}</span>
          </div>
          <div class="provenance-line">
            <span class="provenance-label">Measuring method:</span>
            <span>${result.sourceAttribution.state} • ${result.sourceAttribution.method}</span>
          </div>
          ${altToggleBtn ? `<div style="margin-top:0.25rem;">${altToggleBtn}</div>` : ''}
          ${altHTML}
        </div>
      `;
    } else {
      // Cups to Grams
      const rawGrams = convertCupsToGrams(this.state.value, ingredient, cupStandard);
      const gramsFormatted = formatGramDecimal(rawGrams);
      const effectiveDensity = Math.round(ingredient.gramsPerReferenceCup * (cupStandard.volumeMl / ingredient.referenceCupMl) * 10) / 10;
      const ctgSourceLink = ingredient.primarySource.url
        ? `<a href="${ingredient.primarySource.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-underline-offset:2px;text-decoration:underline;">${ingredient.primarySource.name}</a>`
        : ingredient.primarySource.name;
      const scalingNote = cupStandard.id !== 'us_customary'
        ? ` (${ingredient.gramsPerReferenceCup}g per US Cup, scaled for ${cupStandard.name})`
        : '';

      const cupDisplay = this.state.displayValue
        ? `${this.state.displayValue} ${cupStandard.name}`
        : `${this.state.value} ${cupStandard.name}`;

      return `
        <div class="results-primary">
          <span class="result-number">${gramsFormatted}</span>
          <span class="result-unit">Grams (g)</span>
        </div>
        
        <div class="practical-badge">
          <span>Calculation: <strong>${cupDisplay}</strong> of ${ingredient.name}</span>
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
  }

  private render(focusTargetId?: string) {
    const isGramsToCups = this.state.direction === 'gramsToCups';
    const inputLabel = isGramsToCups ? 'Weight in grams' : 'Volume in cups';
    const inputPlaceholder = isGramsToCups ? 'e.g. 100' : 'e.g. 1';
    const displayVal = this.state.displayValue ?? (this.state.value === null ? '' : String(this.state.value));

    const fractionShortcutsHTML = !isGramsToCups ? `
      <div class="fraction-shortcuts" role="group" aria-label="Cup fraction shortcuts">
        <span class="fraction-shortcuts-label">Quick fractions:</span>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '1/4' ? 'active' : ''}" data-fraction="1/4" data-value="0.25" data-label="¼" aria-label="One-quarter cup">&frac14;</button>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '1/3' ? 'active' : ''}" data-fraction="1/3" data-value="${1/3}" data-label="⅓" aria-label="One-third cup">&#8531;</button>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '1/2' ? 'active' : ''}" data-fraction="1/2" data-value="0.5" data-label="½" aria-label="One-half cup">&frac12;</button>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '2/3' ? 'active' : ''}" data-fraction="2/3" data-value="${2/3}" data-label="⅔" aria-label="Two-thirds cup">&#8532;</button>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '3/4' ? 'active' : ''}" data-fraction="3/4" data-value="0.75" data-label="¾" aria-label="Three-quarters cup">&frac34;</button>
        <button type="button" class="fraction-btn ${this.state.selectedFraction === '1' ? 'active' : ''}" data-fraction="1" data-value="1" data-label="1" aria-label="One cup">1</button>
      </div>
    ` : '';

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
                type="text" 
                id="calc-value-input" 
                class="form-input" 
                value="${displayVal}" 
                placeholder="${inputPlaceholder}" 
                inputmode="decimal"
                autocomplete="off"
              />
            </div>
            ${fractionShortcutsHTML}
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
          ${this.generateResultsHTML()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    if (focusTargetId) {
      const elToFocus = this.container.querySelector(`#${focusTargetId}`) as HTMLElement | null;
      if (elToFocus) {
        elToFocus.focus();
      }
    }
  }

  private attachEventListeners() {
    const valInput = this.container.querySelector('#calc-value-input') as HTMLInputElement;
    if (valInput) {
      valInput.addEventListener('input', (e) => {
        const raw = (e.target as HTMLInputElement).value;
        const parsed = parseInputValue(raw);
        this.state.value = parsed.val;
        this.state.displayValue = raw;
        this.state.selectedFraction = parsed.fraction || null;

        // Update active fraction button highlight
        const fractionBtns = this.container.querySelectorAll('.fraction-btn');
        fractionBtns.forEach(btn => {
          const btnFraction = (btn as HTMLElement).dataset.fraction;
          if (btnFraction && btnFraction === this.state.selectedFraction) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        this.updateResultsOnly();
      });
    }

    const ingSelect = this.container.querySelector('#calc-ingredient-select') as HTMLSelectElement;
    if (ingSelect) {
      ingSelect.addEventListener('change', (e) => {
        this.state.ingredientId = (e.target as HTMLSelectElement).value;
        // Keep focus on the ingredient dropdown: update results without replacing DOM elements
        this.updateResultsOnly();
      });
    }

    const csSelect = this.container.querySelector('#calc-cup-standard') as HTMLSelectElement;
    if (csSelect) {
      csSelect.addEventListener('change', (e) => {
        this.state.cupStandardId = (e.target as HTMLSelectElement).value;
        // Keep focus on the cup standard dropdown: update results without replacing DOM elements
        this.updateResultsOnly();
      });
    }

    const btnGtc = this.container.querySelector('#btn-dir-gtc');
    if (btnGtc) {
      btnGtc.addEventListener('click', () => {
        if (this.state.direction !== 'gramsToCups') {
          this.state.direction = 'gramsToCups';
          this.state.value = 100;
          this.state.displayValue = '100';
          this.state.selectedFraction = null;
          this.render('btn-dir-gtc');
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
          this.state.displayValue = '1';
          this.state.selectedFraction = '1';
          this.render('btn-dir-ctg');
          this.attachEventListeners();
        }
      });
    }

    // Fraction buttons click listeners
    const fractionBtns = this.container.querySelectorAll('.fraction-btn');
    fractionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = (e.currentTarget as HTMLElement);
        const fraction = target.dataset.fraction || null;
        const val = parseFloat(target.dataset.value || '1');
        const label = target.dataset.label || String(val);

        this.state.value = val;
        this.state.selectedFraction = fraction;
        this.state.displayValue = label;

        if (valInput) {
          valInput.value = label;
        }

        fractionBtns.forEach(b => b.classList.remove('active'));
        target.classList.add('active');

        this.updateResultsOnly();
      });
    });

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

    resultsBox.innerHTML = this.generateResultsHTML();

    const altBtn = resultsBox.querySelector('#alt-toggle-btn');
    if (altBtn) {
      altBtn.addEventListener('click', () => {
        this.state.showAlternate = !this.state.showAlternate;
        this.updateResultsOnly();
      });
    }
  }
}
