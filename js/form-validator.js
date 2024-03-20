export class FormValidator {
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
      this.#validateDescriptionLength,
      'Комментарий слишком длинный'
    );
  }

  #validateHashtags(value){
    const hashtagsArray = value.split(/\s+/).filter(Boolean);
    const hashtagRegex = /^#[A-Za-z0-9а-яА-Я]+$/;
    const uniqueHashtags = new Set();

    if (hashtagsArray.length > 5) {
      this.hashTagsErrorMessage = 'Нельзя указать больше пяти хэштегов';
      return false;
    }

    for (const tag of hashtagsArray) {
      if (!hashtagRegex.test(tag)) {
        this.hashTagsErrorMessage = 'Неверный формат хэштега';
        return false;
      }
      if (tag.length > 20) {
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
    return value.length <= 140;
  }

  reset() {
    this.pristine.reset();
    this.pristine.destroy();
  }

  validate() {
    return this.pristine.validate();
  }
}
