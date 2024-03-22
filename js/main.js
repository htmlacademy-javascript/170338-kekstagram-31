import { PicturesPreviewRenderer } from './pictures-preview-renderer';
import { PictureFullScreenRenderer } from './picture-fullscreen-renderer';
import { UploadPhotoRenderer } from './upload-photo-renderer';
import { ApiClient } from './api-client';
import { MessagesRenderer } from './messages-renderer';
import { PictureFilterRenderer } from './picture-filter-renderer';
import { FeedPostsGenerator } from './feed-posts-generator';

//Selectors
const thumbnailsContainer = document.querySelector('.pictures');
const photoUploadInput = document.querySelector('.img-upload__input');

//Classes Initialization
const messageRenderer = new MessagesRenderer();
const apiClient = new ApiClient('https://31.javascript.htmlacademy.pro/kekstagram/', messageRenderer);
const feedPostGenerator = new FeedPostsGenerator();
const picturesRenderer = new PicturesPreviewRenderer('picture');
const pictureFullScreenRenderer = new PictureFullScreenRenderer('big-picture');
const uploadPictureRenderer = new UploadPhotoRenderer('img-upload', apiClient, messageRenderer);

//Logic
apiClient.getData().then((feedPosts) => {
  if (feedPosts === null) {
    feedPosts = feedPostGenerator.generate();
  }

  const filterRenderer = new PictureFilterRenderer('img-filters', feedPosts, thumbnailsContainer, picturesRenderer);
  filterRenderer.render();
  const thumbnailsFragments = picturesRenderer.render(feedPosts);
  thumbnailsContainer?.appendChild(thumbnailsFragments);

  //Subscriptions
  thumbnailsContainer.addEventListener('click', (evt) => {
    const targetElement = evt.target;
    const container = targetElement.closest('.picture');
    if (container?.dataset?.id) {
      const postIdentity = Number(container.dataset.id);
      pictureFullScreenRenderer.render(feedPosts.get(postIdentity));
    }
  });
});

photoUploadInput.addEventListener('change', () => {
  const files = photoUploadInput.files;
  if (files.length > 0) {
    const file = files[0];
    uploadPictureRenderer.render(file);
  }
});
