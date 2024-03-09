export class UploadPhotoRenderer {
  #CANCEL_SUFFIX = '__cancel';
  #OVERLAY_SUFFIX = '__overlay';
  //CLASSES
  #HIDEN_CLASS = 'hidden';
  #MODAL_DIALOG_CLASS = 'modal-open';
  #UPLOAD_PHOTO_CLASS = 'img-upload__input';

  constructor(modalDialogName) {
    this.modalDialogName = modalDialogName;

    this.modalDialog = document.querySelector(`.${this.modalDialogName}${this.#OVERLAY_SUFFIX}`);
    this.closeButton = document.querySelector(`.${this.modalDialogName}${this.#CANCEL_SUFFIX}`);
    this.photoUploadInput = document.querySelector(`.${this.#UPLOAD_PHOTO_CLASS}`);

    this.onCloseButtonClick = () => this.#hideModalDialog();
    this.onDocumentKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        this.#hideModalDialog();
      }
    };
  }

  #hideModalDialog() {
    document.body.classList.remove(this.#MODAL_DIALOG_CLASS);
    this.modalDialog.classList.add(this.#HIDEN_CLASS);

    //Clean Up
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.removeEventListener('click', this.onCloseButtonClick);
    this.photoUploadInput.value = '';
  }

  #showModalDialog() {
    document.body.classList.add(this.#MODAL_DIALOG_CLASS);

    this.modalDialog.classList.remove(this.#HIDEN_CLASS);
  }

  #subscribeOnClickCloseButton() {
    this.closeButton.addEventListener('click', this.onCloseButtonClick);
  }

  #subscribeOnKeyDownCloseButton() {
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  render(pictureName){
    if(!pictureName) {
      throw new Error('Файл с изображением не найден');
    }

    this.#showModalDialog();

    this.#subscribeOnClickCloseButton();
    this.#subscribeOnKeyDownCloseButton();
  }
}
