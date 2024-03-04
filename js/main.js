import { FeedPostsGenerator } from './feedPostGenerator';
import { PicturesPreviewRenderer } from './picturesPreviewRenderer';
import { PictureFullScreenRenderer } from './pictureFullScreenRenderer';

const thumbnailsContainer = document.querySelector('.pictures');

const generator = new FeedPostsGenerator(25);
const picturesRenderer = new PicturesPreviewRenderer('picture');
const pictureFullScreenRenderer = new PictureFullScreenRenderer('big-picture');

const feedPosts = generator.generate();
const thumbnailsFragments = picturesRenderer.render(feedPosts);

thumbnailsContainer?.appendChild(thumbnailsFragments);

thumbnailsContainer.addEventListener('click', (evt) => {
  const targetElement = evt.target;
  const container = targetElement.closest('.picture');
  if (container?.dataset?.id) {
    const postIdentity = Number(container.dataset.id);
    pictureFullScreenRenderer.render(feedPosts.get(postIdentity));
  }
});
