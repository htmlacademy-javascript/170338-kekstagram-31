export class FormValidator {
  //CONSTS
  #HASHTAGS_MAX_COUNT = 5;
  #HASHTAG_MAX_LENGTH = 20;
  #DESCRIPTION_MAX_LENGTH = 140;

  //Classes
  #HASHTAGS_CLASS = 'text__hashtags';
  #DESCRIPTION_CLASS = 'text__description';

  constructor(form){
    this.pristine = new Pristine(form, {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__field-wrapper--invalid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    });

    this.hashTags = document.querySelector(`.${this.#HASHTAGS_CLASS}`);
    this.description = document.querySelector(`.${this.#DESCRIPTION_CLASS}`);
    this.hashTagsErrorMessage = '';

    this.pristine.addValidator(
      this.hashTags,
      this.#validateHashtags.bind(this),
      () => this.hashTagsErrorMessage || 'Ошибка в хэштегах',
      false,
      true);

    this.pristine.addValidator(
      this.description,
      this.#validateDescriptionLength.bind(this),
      'Комментарий слишком длинный'
    );
  }

  #validateHashtags(value){
    const hashtagsArray = value.split(/\s+/).filter(Boolean);
    const hashtagRegex = /^#[A-Za-z0-9а-яА-Я]+$/;
    const uniqueHashtags = new Set();

    if (hashtagsArray.length > this.#HASHTAGS_MAX_COUNT) {
      this.hashTagsErrorMessage = 'Нельзя указать больше пяти хэштегов';
      return false;
    }

    for (const tag of hashtagsArray) {
      if (!hashtagRegex.test(tag)) {
        this.hashTagsErrorMessage = 'Неверный формат хэштега';
        return false;
      }
      if (tag.length > this.#HASHTAG_MAX_LENGTH) {
        this.hashTagsErrorMessage = 'Хэштеги не должны быть длиннее 20 символов';
        return false;
      }

      if (uniqueHashtags.has(tag.toLowerCase())) {
        this.hashTagsErrorMessage = 'Хэштеги не должны повторяться';
        return false;
      }
      uniqueHashtags.add(tag.toLowerCase());
    }

    return true;
  }

  #validateDescriptionLength(value) {
    return value.length <= this.#DESCRIPTION_MAX_LENGTH;
  }

  reset() {
    this.pristine.reset();
    this.pristine.destroy();
  }

  validate() {
    return this.pristine.validate();
  }
}
