import { NameGenerator } from './nameGenerator';
import { Utils } from './utils';

export class CommentsGenerator {
  static MAX_COMMENTS_COUNT = 30;
  #COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  #commentsStore = new Map();

  constructor(count = 25){
    this.commentsMaxCout = count * CommentsGenerator.MAX_COMMENTS_COUNT;
  }

  #generateRandomComment(comments) {
    const MINIMUM_IDENTITY = 1;
    return {
      id: Utils.generateUniqueIdentity(MINIMUM_IDENTITY, this.commentsMaxCout, this.#commentsStore),
      avatar: `img/avatar-${Utils.generateRandomNumber(1, 6)}.svg`,
      message: Utils.getRandomValueFromArray(comments),
      name: NameGenerator.generateRandomName()
    };
  }

  /**
  * Генерирует случайное количество комментариев.
  * @param {comments} Массив из которого берутся комментарии.
  * @returns {Array} Массив случайного количество комментариев в диапазоне от 0 до 30.
  */
  generate(comments = this.#COMMENTS) {
    const result = [];
    const commentsCout = Utils.generateRandomNumber(0, 30);
    for (let index = 0; index < commentsCout; index++) {
      const comment = this.#generateRandomComment(comments);
      result.push(comment);
      this.#commentsStore.set(comment.id, comment);
    }

    return result;
  }
}
