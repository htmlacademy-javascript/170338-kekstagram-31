export class ZoomingService {
  #PREVIEW_IMG_SUFFIX = '__preview';
  #SCALE_VALUE_SUFFIX = '--value';
  #ZOOM_SETTINGS = {
    Min: 25,
    Max: 100,
    Step: 25
  };

  constructor(imageContainerName, scaleControlName){
    this.imagePreview = document.querySelector(`.${imageContainerName}${this.#PREVIEW_IMG_SUFFIX} img`);
    this.scaleControlValue = document.querySelector(`.${scaleControlName}${this.#SCALE_VALUE_SUFFIX}`);
  }

  #parceScaleValue(percents) {
    return parseFloat(percents.replace('%', ''));
  }

  #zoomImage(value) {
    this.scaleControlValue.value = `${value}%`;
    this.imagePreview.style = `transform: scale(${value / 100})`;
  }

  zoomIn() {
    let value = this.#parceScaleValue(this.scaleControlValue.value) + this.#ZOOM_SETTINGS.Step;
    if (value > this.#ZOOM_SETTINGS.Max) {
      value = this.#ZOOM_SETTINGS.Max;
    }

    this.#zoomImage(value);
  }

  zoomOut() {
    let value = this.#parceScaleValue(this.scaleControlValue.value) - this.#ZOOM_SETTINGS.Step;
    if (value < this.#ZOOM_SETTINGS.Min) {
      value = this.#ZOOM_SETTINGS.Min;
    }

    this.#zoomImage(value);
  }

  cancel(){
    this.scaleControlValue.value = '100%';
  }
}
