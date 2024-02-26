import { FeedPostsGenerator } from './feedPostGenerator';

const generator = new FeedPostsGenerator(25);

// eslint-disable-next-line no-console
console.log(generator.generate());
