export class VisualEffectsService {
  #SLIDER_SUFFIX = '__slider';
  #SLIDER_VALUE_SUFFIX = '__value';
  #PREVIEW_IMG_SUFFIX = '__preview';
  #HIDE_OBJECT_CLASS = 'visually-hidden';

  #EMPTY_EFFECT = 'none';
  #EMPTY_EFFECT_VALUE = 100;

  #EFFECTS = {
    chrome: { min: 0, max: 1, step: 0.1, getValue: (value) => `grayscale(${value})` },
    sepia: { min: 0, max: 1, step: 0.1, getValue: (value) => `sepia(${value})` },
    marvin: { min: 0, max: 100, step: 1, getValue: (value) => `invert(${value}%)` },
    phobos: { min: 0, max: 3, step: 0.1, getValue: (value) => `blur(${value}px)` },
    heat: { min: 1, max: 3, step: 0.1, getValue: (value) => `brightness(${value})` },
    none: { min: 0, max: 100, step: 1, getValue: () => this.#EMPTY_EFFECT },
  };

  constructor(effectSection, imageContainerName, effectPrefix) {
    this.effectPrefix = effectPrefix;
    this.effectLevel = document.querySelector(`.${effectSection}`);
    this.slider = this.effectLevel.querySelector(`.${effectSection}${this.#SLIDER_SUFFIX}`);
    this.sliderValue = this.effectLevel.querySelector(`.${effectSection}${this.#SLIDER_VALUE_SUFFIX}`);
    this.imagePreview = document.querySelector(`.${imageContainerName}${this.#PREVIEW_IMG_SUFFIX} img`);
    this.currentEffect = {
      effect: this.#EMPTY_EFFECT,
      value: this.#EMPTY_EFFECT_VALUE
    };
  }

  #applyEffect() {
    this.sliderValue.value = this.currentEffect.value;
    this.imagePreview.style.filter = this.#EFFECTS[this.currentEffect.effect].getValue(this.currentEffect.value);

    this.imagePreview.classList.forEach((item) => {
      if (item.includes(this.effectPrefix)) {
        this.imagePreview.classList.remove(item);
      }
    });

    this.imagePreview.classList.add(`${this.effectPrefix}${this.currentEffect.effect}`);

    if (this.currentEffect.effect === this.#EMPTY_EFFECT) {
      this.effectLevel.classList.add(this.#HIDE_OBJECT_CLASS);
    } else {
      this.effectLevel.classList.remove(this.#HIDE_OBJECT_CLASS);
    }
  }

  #updateSliderEffect(effect) {
    this.slider.noUiSlider.updateOptions({
      range: {
        min: this.#EFFECTS[effect].min,
        max: this.#EFFECTS[effect].max,
      },
      start: this.#EFFECTS[effect].max,
      step: this.#EFFECTS[effect].step,
    });
  }

  initialize() {
    noUiSlider.create(this.slider, {
      range: {
        min: this.#EFFECTS[this.currentEffect.effect].min,
        max: this.#EFFECTS[this.currentEffect.effect].max,
      },
      start: this.#EFFECTS[this.currentEffect.effect].max,
      step: this.#EFFECTS[this.currentEffect.effect].step,
      connect: 'lower',
      format: {
        to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
        from: (value) => parseFloat(value),
      },
    });

    this.slider.noUiSlider.on('update', (values, handle) => {
      this.currentEffect.value = values[handle];

      this.#applyEffect();
    });
  }

  destroy() {
    this.slider.noUiSlider.destroy();
  }

  apply(effect) {
    this.currentEffect.effect = effect;

    this.#updateSliderEffect(effect);
    this.#applyEffect();
  }

  cancel() {
    this.currentEffect.effect = this.#EMPTY_EFFECT;
    this.currentEffect.value = this.#EMPTY_EFFECT_VALUE;

    this.#applyEffect();
  }
}
