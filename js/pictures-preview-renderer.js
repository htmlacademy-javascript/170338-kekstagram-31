export class PicturesPreviewRenderer {
  //Suffixes
  #IMG_SUFFIX = '__img';
  #LIKES_SUFFIX = '__likes';
  #COMMENTS_SUFFIX = '__comments';

  constructor(templateId, templatePartName = templateId){
    this.templateId = templateId;
    this.templatePartName = templatePartName;
  }

  #getTemplate(){
    const template = document.querySelector(`#${this.templateId}`)?.content;
    return template.querySelector(`.${this.templatePartName}`);
  }

  #getTemplatePart(templateInstance, partSuffix) {
    return templateInstance.querySelector(`.${this.templatePartName}${partSuffix}`);
  }

  #fillImageTemplatePart(templateInstance, { url, description }){
    const imagePart = this.#getTemplatePart(templateInstance, this.#IMG_SUFFIX);
    imagePart.src = url;
    imagePart.alt = description;
  }

  #fillLikesTemplatePart(templateInstance, { likes }) {
    const likesPart = this.#getTemplatePart(templateInstance, this.#LIKES_SUFFIX);
    likesPart.textContent = likes;
  }

  #fillCommentsTemplatePart(templateInstance, { comments }) {
    const commentsPart = this.#getTemplatePart(templateInstance, this.#COMMENTS_SUFFIX);
    commentsPart.textContent = comments.length;
  }

  #renderPictureTemplate(picture) {
    const template = this.#getTemplate();
    const templateInstance = template.cloneNode(true);
    templateInstance.dataset.id = picture.id;
    this.#fillImageTemplatePart(templateInstance, picture);
    this.#fillLikesTemplatePart(templateInstance, picture);
    this.#fillCommentsTemplatePart(templateInstance, picture);

    return templateInstance;
  }

  clear(thumbnailsContainer) {
    const pictures = thumbnailsContainer.querySelectorAll(`.${this.templateId}`);
    pictures.forEach((picture) => {
      picture.remove();
    });
  }

  /**
  * Рендерит переданное значение постов
  * @param {pictures} Массив постов для генерации DOM объектов и вставки их в задданую позицию в документе
  * @returns {DocumentFragment} Фрагмент из миниатюр изображений переданных параметром.
  */
  render(pictures){
    if (!(pictures instanceof Map)) {
      throw new Error('Значение должно быть map');
    }

    const fragment = document.createDocumentFragment();
    for(const picture of pictures.values()) {
      fragment.appendChild(this.#renderPictureTemplate(picture));
    }

    return fragment;
  }
}
