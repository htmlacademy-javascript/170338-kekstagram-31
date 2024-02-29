import { FeedPostsGenerator } from './feedPostGenerator';
import { PicturesTemplateRenderer } from './picturesTemplateRenderer';

const generator = new FeedPostsGenerator(25);
const picturesRenderer = new PicturesTemplateRenderer('picture', 'picture', 'pictures');

picturesRenderer.render(generator.generate());
