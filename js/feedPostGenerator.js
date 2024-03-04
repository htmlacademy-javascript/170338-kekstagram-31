import { Utils } from './utils';
import { CommentsGenerator } from './commentsGenerator';
import { DescriptionGenerator } from './descriptionGenerator';

export class FeedPostsGenerator {
  #postsStore = new Map();

  constructor(count = 25) {
    this.conut = count;
    this.commentsGenerator = new CommentsGenerator(count);
  }

  #constructFeedPost(identity) {
    return {
      id: identity,
      url: `photos/${identity}.jpg`,
      description: DescriptionGenerator.generateRandomDescription(),
      likes: Utils.generateRandomNumber(15, 200),
      comments: this.commentsGenerator.generate()
    };
  }

  /**
  * Генерирует 25 объектов постов и комментариями к ним.
  * @param {regenerate} Признак того что нужно перегененировать посты.
  * @returns {Map} Map из 25 постов для проекта Keksogram.
  */
  generate(regenerate = false) {
    const MINIMUM_IDENTITY = 1;
    if(!regenerate && this.#postsStore.size > 0) {
      return Array.from(this.#postsStore.keys);
    }

    for (let index = 0; index < this.conut; index++) {
      const identity = Utils.generateUniqueIdentity(MINIMUM_IDENTITY, this.conut, this.#postsStore);
      const feedPost = this.#constructFeedPost(identity);
      this.#postsStore.set(identity, feedPost);
    }

    return this.#postsStore;
  }
}
