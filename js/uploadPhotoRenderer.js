import { VisualEffectsService } from './visualEffectsService';
import { ZoomingService } from './zoomingService';

export class UploadPhotoRenderer {
  #CANCEL_SUFFIX = '__cancel';
  #OVERLAY_SUFFIX = '__overlay';
  #INPUT_SUFFIX = '__input';
  #EFFECTS_SUFFIX = '__effects';

  #ZOOM_OUT_CONTROL_SUFFIX = '--smaller';
  #ZOOM_IN_CONTROL_SUFFIX = '--bigger';

  //CLASSES
  #HIDEN_CLASS = 'hidden';
  #MODAL_DIALOG_CLASS = 'modal-open';
  #EFFECT_LEVEL_CLASS = 'effect-level';
  #SCALE_CONTROL_CLASS = 'scale__control';
  #EFFECT_PREFIX = 'effects__preview--';

  constructor(modalDialogName) {
    this.modalDialogName = modalDialogName;

    this.modalDialog = document.querySelector(`.${this.modalDialogName}${this.#OVERLAY_SUFFIX}`);
    this.closeButton = this.modalDialog.querySelector(`.${this.modalDialogName}${this.#CANCEL_SUFFIX}`);
    this.photoUploadInput = document.querySelector(`.${this.modalDialogName}${this.#INPUT_SUFFIX}`);
    this.effectsCollection = document.querySelector(`.${this.modalDialogName}${this.#EFFECTS_SUFFIX}`);

    this.zoomingService = new ZoomingService(this.modalDialogName, this.#SCALE_CONTROL_CLASS);
    this.visualEffectSevice = new VisualEffectsService(this.#EFFECT_LEVEL_CLASS, this.modalDialogName, this.#EFFECT_PREFIX);
    this.#configureZooming();

    this.onCloseButtonClick = () => this.#hideModalDialog();
    this.onDocumentKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        this.#hideModalDialog();
      }
    };

    this.onEffectChange = (evt) => {
      const effect = evt.target.id.split('-')[1];
      this.visualEffectSevice.apply(effect);
    };
  }

  #configureZooming(){
    const zoomOutControl = this.modalDialog.querySelector(`.${this.#SCALE_CONTROL_CLASS}${this.#ZOOM_OUT_CONTROL_SUFFIX}`);

    zoomOutControl.addEventListener('click', () => {
      this.zoomingService.zoomOut();
    });

    const zoomInControl = this.modalDialog.querySelector(`.${this.#SCALE_CONTROL_CLASS}${this.#ZOOM_IN_CONTROL_SUFFIX}`);

    zoomInControl.addEventListener('click', () => {
      this.zoomingService.zoomIn();
    });
  }

  #resetSettings() {
    this.zoomingService.cancel();
    this.visualEffectSevice.cancel();
  }

  #hideModalDialog() {
    document.body.classList.remove(this.#MODAL_DIALOG_CLASS);
    this.modalDialog.classList.add(this.#HIDEN_CLASS);

    //Clean Up
    this.visualEffectSevice.destroy();
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.removeEventListener('click', this.onCloseButtonClick);
    this.effectsCollection.removeEventListener('change', this.onEffectChange);
    this.photoUploadInput.value = '';
  }

  #showModalDialog() {
    this.#resetSettings();
    this.visualEffectSevice.initialize();
    document.body.classList.add(this.#MODAL_DIALOG_CLASS);
    this.modalDialog.classList.remove(this.#HIDEN_CLASS);
  }

  render(pictureName){
    if(!pictureName) {
      throw new Error('Файл с изображением не найден');
    }

    this.#showModalDialog();

    this.closeButton.addEventListener('click', this.onCloseButtonClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
    this.effectsCollection.addEventListener('change', this.onEffectChange);
  }
}
