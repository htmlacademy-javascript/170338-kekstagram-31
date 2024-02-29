export class PicturesTemplateRenderer {
  #IMG_SUFFIX = '__img';
  #LIKES_SUFFIX = '__likes';
  #COMMENTS_SUFFIX = '__comments';

  constructor(templateId, templatePartName, targetPlace){
    this.templateId = templateId;
    this.templatePartName = templatePartName;
    this.targetPlace = targetPlace;
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
    this.#fillImageTemplatePart(templateInstance, picture);
    this.#fillLikesTemplatePart(templateInstance, picture);
    this.#fillCommentsTemplatePart(templateInstance, picture);

    return templateInstance;
  }

  /**
  * Рендерит переданное значение постов
  * @param {pictures} Массив постов для генерации DOM объектов и вставки их в задданую позицию в документе
  */
  render(pictures){
    if (!Array.isArray(pictures)) {
      throw new Error('Значение должно быть массивом');
    }

    const fragment = document.createDocumentFragment();
    for(let i = 0; i < pictures.length; i++) {
      fragment.appendChild(this.#renderPictureTemplate(pictures[i]));
    }

    const targetPlace = document.querySelector(`.${this.targetPlace}`);
    targetPlace?.appendChild(fragment);
  }
}
