import { Utils } from './utils';
import { CommentsGenerator } from './comments-generator';
import { DescriptionGenerator } from './description-generator';

export class FeedPostsGenerator {
  //CONSTS
  #DEFAULT_POSTS_COUNT = 25;

  #postsStore = new Map();

  constructor(count = this.#DEFAULT_POSTS_COUNT) {
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
  * @returns {Map} Map из 25 постов для проекта Keksogram.
  */
  generate() {
    const MINIMUM_IDENTITY = 1;
    if(this.#postsStore.size > 0) {
      return this.#postsStore;
    }

    for (let index = 0; index < this.conut; index++) {
      const identity = Utils.generateUniqueIdentity(MINIMUM_IDENTITY, this.conut, this.#postsStore);
      const feedPost = this.#constructFeedPost(identity);
      this.#postsStore.set(identity, feedPost);
    }

    return this.#postsStore;
  }
}
