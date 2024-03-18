export class MessagesRenderer {
  //Suffixes
  #MESSAGE_BUTTON_SUFFIX = '__button';
  #MESSAGE_DIALOG_SUFFIX = '__inner';

  constructor() {
    this.messageElement = null;
    this.messageDialog = null;
    this.messageCloseButton = null;
    this.callback = null;
    this.onDocumentKeyDown = this.#onDocumentKeyDown.bind(this);
    this.onMessageOutsideClick = this.#onMessageOutsideClick.bind(this);
    this.onCloseButtonClick = this.#onCloseButtonClick.bind(this);
  }

  #getTemplate(templateId, templatePartName = templateId){
    const template = document.querySelector(`#${templateId}`)?.content;
    return template.querySelector(`.${templatePartName}`);
  }

  #showMessage(templateId) {
    const template = this.#getTemplate(templateId);
    const templateInstance = template.cloneNode(true);
    document.body.insertBefore(templateInstance, document.body.lastChild);
    return templateInstance;
  }

  #onDocumentKeyDown(event) {
    if (event.key === 'Escape') {
      this.#closeMessage();
    }
  }

  #onMessageOutsideClick(event) {
    if (this.messageDialog && !this.messageDialog.contains(event.target)) {
      this.#closeMessage();
    }
  }

  #onCloseButtonClick() {
    if(this.messageElement) {
      this.#closeMessage();
    }
  }

  #closeMessage() {
    if (this.callback){
      this.callback();
    }

    if (this.messageElement) {
      document.removeEventListener('keydown', this.#onDocumentKeyDown.bind(this));
      this.messageElement.removeEventListener('click', this.#onMessageOutsideClick.bind(this));
      this.messageElement.remove();
      this.messageElement = null;
      this.messageDialog = null;
    }

    if (this.messageCloseButton) {
      this.messageCloseButton.removeEventListener('click', this.onCloseButtonClick);
      this.messageCloseButton = null;
    }
  }

  #subscribeOnCloseEvents() {
    this.messageCloseButton.addEventListener('click', this.onCloseButtonClick);
    this.messageElement.addEventListener('click', this.onMessageOutsideClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  renderLoadError(templateId){
    this.messageElement = this.#showMessage(templateId);

    setTimeout(() => {
      if (this.messageElement) {
        this.messageElement.remove();
        this.messageElement = null;
      }
    }, 5000);
  }

  renderUploadError(templateId, callback) {
    this.callback = callback;
    this.messageElement = this.#showMessage(templateId);
    this.messageDialog = this.messageElement.querySelector(`.${templateId}${this.#MESSAGE_DIALOG_SUFFIX}`);
    this.messageCloseButton = this.messageElement.querySelector(`.${templateId}${this.#MESSAGE_BUTTON_SUFFIX}`);

    this.#subscribeOnCloseEvents();
  }

  renderSuccess(templateId, callback) {
    this.callback = callback;
    this.messageElement = this.#showMessage(templateId);
    this.messageDialog = this.messageElement.querySelector(`.${templateId}${this.#MESSAGE_DIALOG_SUFFIX}`);
    this.messageCloseButton = this.messageElement.querySelector(`.${templateId}${this.#MESSAGE_BUTTON_SUFFIX}`);

    this.#subscribeOnCloseEvents();
  }
}
