export class PictureFullScreenRenderer {
  //Suffixes
  #IMG_SUFFIX = '__img';
  #COMMENTS_COMMENT_SUFFIX = '__comment';
  #COMMENTS_COMMENTS_SUFFIX = '__comments';
  #COMMENTS_SHOW_COUNT_SUFFIX = '__comment-shown-count';
  #COMMENTS_TOTAL_COUNT_SUFFIX = '__comment-total-count';
  #AVATAR_SUFFIX = '__picture';
  #COMMENT_SUFFIX = '__text';
  #CAPTIOB_SUFFIX = '__caption';
  #CANCEL_SUFFIX = '__cancel';

  //Selectors
  #LIKES_SELECTOR = '.likes-count';
  #COMMENTS_LOADER_SELECTOR = '.comments-loader';

  //PARTS
  #SOCIAL_PART = 'social';

  //CLASSES
  #HIDEN_CLASS = 'hidden';
  #MODAL_DIALOG_CLASS = 'modal-open';

  constructor(modalDialogName) {
    this.modalDialogName = modalDialogName;

    this.modalDialog = document.querySelector(`.${this.modalDialogName}`);
    this.closeButton = document.querySelector(`.${this.modalDialogName}${this.#CANCEL_SUFFIX}`);
    this.commentTemplate = this.modalDialog.querySelector(`.${this.#SOCIAL_PART}${this.#COMMENTS_COMMENT_SUFFIX}`);
    this.commentContainer = this.modalDialog.querySelector(`.${this.#SOCIAL_PART}${this.#COMMENTS_COMMENTS_SUFFIX}`);

    this.onCloseButtonClick = () => this.#hideModalDialog();
    this.onDocumentKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        this.#hideModalDialog();
      }
    };
  }

  #showModalDialog() {
    document.body.classList.add(this.#MODAL_DIALOG_CLASS);

    this.modalDialog.classList.remove(this.#HIDEN_CLASS);
    this.#hideLoadMoreCommentsPart();
  }

  #hideModalDialog() {
    document.body.classList.remove(this.#MODAL_DIALOG_CLASS);
    const modalDialog = document.querySelector(`.${this.modalDialogName}`);
    modalDialog.classList.add(this.#HIDEN_CLASS);
    this.#showLoadMoreCommentsPart(modalDialog);

    //Clean Up
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    this.closeButton.removeEventListener('click', this.onCloseButtonClick);
  }

  #fillPictureInfo({ url, description }) {
    const imagePart = this.modalDialog.querySelector(`.${this.modalDialogName}${this.#IMG_SUFFIX} img`);
    imagePart.src = url;

    const imageDescription = this.modalDialog.querySelector(`.${this.#SOCIAL_PART}${this.#CAPTIOB_SUFFIX}`);
    imageDescription.textContent = description;
  }

  #fillLikesInfo({ likes }) {
    const likesPart = this.modalDialog.querySelector(this.#LIKES_SELECTOR);
    likesPart.textContent = likes;
  }

  #updateLoadedCommentsCount() {
    const allCommentsCount = this.modalDialog.querySelectorAll(`.${this.#SOCIAL_PART}${this.#COMMENTS_COMMENT_SUFFIX}`).length;
    const showCommentsCountPart = this.modalDialog.querySelector(`.${this.#SOCIAL_PART}${this.#COMMENTS_SHOW_COUNT_SUFFIX}`);
    showCommentsCountPart.textContent = allCommentsCount;
  }

  #hideLoadMoreCommentsPart() {
    const loadMoreCommentsPart = this.modalDialog.querySelector(this.#COMMENTS_LOADER_SELECTOR);
    loadMoreCommentsPart.classList.add(this.#HIDEN_CLASS);
  }

  #showLoadMoreCommentsPart(){
    const loadMoreCommentsPart = this.modalDialog.querySelector(this.#COMMENTS_LOADER_SELECTOR);
    loadMoreCommentsPart.classList.remove(this.#HIDEN_CLASS);
  }

  #fillCommentInfo(commentNode, { avatar, name, message }) {
    const userAvatarPart = commentNode.querySelector(`.${this.#SOCIAL_PART}${this.#AVATAR_SUFFIX}`);
    userAvatarPart.src = avatar;
    userAvatarPart.alt = name;

    const comment = commentNode.querySelector(`.${this.#SOCIAL_PART}${this.#COMMENT_SUFFIX}`);
    comment.textContent = message;
  }

  #fillCommentsInfo({ comments }) {
    const showCommentsTotalCountPart = this.modalDialog.querySelector(`.${this.#SOCIAL_PART}${this.#COMMENTS_TOTAL_COUNT_SUFFIX}`);
    showCommentsTotalCountPart.textContent = comments.length;



    while (this.commentContainer.firstChild) {
      this.commentContainer.removeChild(this.commentContainer.firstChild);
    }

    const fragment = document.createDocumentFragment();
    for(let i = 0; i < comments.length; i++) {
      const commentNode = this.commentTemplate.cloneNode(true);
      this.#fillCommentInfo(commentNode, comments[i]);
      fragment.appendChild(commentNode);
    }

    this.commentContainer.appendChild(fragment);
    this.#updateLoadedCommentsCount();
  }

  #subscribeOnClickCloseButton() {
    this.closeButton.addEventListener('click', this.onCloseButtonClick);
  }

  #subscribeOnKeyDownCloseButton() {
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  render(picture) {
    if(!picture) {
      throw new Error('Информация о посте не найдена');
    }

    this.#showModalDialog();
    this.#fillPictureInfo(picture);
    this.#fillLikesInfo(picture);
    this.#fillCommentsInfo(picture);

    this.#subscribeOnClickCloseButton();
    this.#subscribeOnKeyDownCloseButton();
  }
}
