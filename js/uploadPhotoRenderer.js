import { VisualEffectsService } from './visualEffectsService';
import { ZoomingService } from './zoomingService';

export class UploadPhotoRenderer {
  //Settings
  #SUPPORTED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  //Suffixes
  #CANCEL_SUFFIX = '__cancel';
  #OVERLAY_SUFFIX = '__overlay';
  #INPUT_SUFFIX = '__input';
  #EFFECTS_SUFFIX = '__effects';
  #SUBMIT_SUFFIX = '__submit';
  #PREVIEW_IMG_SUFFIX = '__preview';

  #ZOOM_OUT_CONTROL_SUFFIX = '--smaller';
  #ZOOM_IN_CONTROL_SUFFIX = '--bigger';

  //CLASSES
  #HIDEN_CLASS = 'hidden';
  #HASHTAGS_CLASS = 'text__hashtags';
  #DESCRIPTION_CLASS = 'text__description';
  #MODAL_DIALOG_CLASS = 'modal-open';
  #EFFECT_LEVEL_CLASS = 'effect-level';
  #SCALE_CONTROL_CLASS = 'scale__control';
  #EFFECT_PREFIX = 'effects__preview';

  //LANG
  #UPLOADING_MESSAGE = 'Загрузка...';

  constructor(modalDialogName) {
    this.modalDialogName = modalDialogName;

    this.modalDialog = document.querySelector(`.${this.modalDialogName}${this.#OVERLAY_SUFFIX}`);
    this.closeButton = this.modalDialog.querySelector(`.${this.modalDialogName}${this.#CANCEL_SUFFIX}`);
    this.photoUploadInput = document.querySelector(`.${this.modalDialogName}${this.#INPUT_SUFFIX}`);
    this.effectsCollection = document.querySelector(`.${this.modalDialogName}${this.#EFFECTS_SUFFIX}`);
    this.submitButton = document.querySelector(`.${this.modalDialogName}${this.#SUBMIT_SUFFIX}`);
    this.imagePreview = document.querySelector(`.${this.modalDialogName}${this.#PREVIEW_IMG_SUFFIX} img`);
    this.hashTags = document.querySelector(`.${this.#HASHTAGS_CLASS}`);
    this.description = document.querySelector(`.${this.#DESCRIPTION_CLASS}`);

    this.submitButtonDefaultName = this.submitButton.textContent;
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
    this.hashTags.value = '';
    this.description.value = '';
    this.photoUploadInput.value = '';
  }

  #hideModalDialog() {
    document.body.classList.remove(this.#MODAL_DIALOG_CLASS);
    this.modalDialog.classList.add(this.#HIDEN_CLASS);

    //Clean Up
    this.#resetSettings();
    this.visualEffectSevice.destroy();
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.removeEventListener('click', this.onCloseButtonClick);
    this.effectsCollection.removeEventListener('change', this.onEffectChange);
  }

  #showModalDialog() {
    this.visualEffectSevice.initialize();
    document.body.classList.add(this.#MODAL_DIALOG_CLASS);
    this.modalDialog.classList.remove(this.#HIDEN_CLASS);
  }

  #SetPreviewPhoto(file){
    const fileName = file.name.toLowerCase();
    const matches = this.#SUPPORTED_FILE_TYPES.some((it) => fileName.endsWith(it));
    if(matches) {
      const objectUrl = URL.createObjectURL(file);
      this.imagePreview.src = objectUrl;
      this.visualEffectSevice.setPreviewPhoto(objectUrl);
    }
  }

  beginUploading() {
    this.submitButton.disabled = true;
    this.submitButton.textContent = this.#UPLOADING_MESSAGE;
  }

  suspendEvents(){
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  unSuspendEvents(){
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  endUploading() {
    this.submitButton.disabled = false;
    this.submitButton.textContent = this.submitButtonDefaultName;
  }

  cancel() {
    this.#hideModalDialog();
  }

  render(file){
    if(!file) {
      throw new Error('Файл с изображением не найден');
    }

    this.#showModalDialog();

    this.#SetPreviewPhoto(file);
    this.closeButton.addEventListener('click', this.onCloseButtonClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
    this.effectsCollection.addEventListener('change', this.onEffectChange);
  }
}
