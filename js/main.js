import { FeedPostsGenerator } from './feedPostGenerator';
import { PicturesPreviewRenderer } from './picturesPreviewRenderer';
import { PictureFullScreenRenderer } from './pictureFullScreenRenderer';
import { UploadPhotoRenderer } from './uploadPhotoRenderer';
import { FormValidator } from './formValidator';
import { Utils } from './utils';

//Selectors
const thumbnailsContainer = document.querySelector('.pictures');
const photoUploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');

//Classes Initialization
const generator = new FeedPostsGenerator(25);
const picturesRenderer = new PicturesPreviewRenderer('picture');
const pictureFullScreenRenderer = new PictureFullScreenRenderer('big-picture');
const uploadPictureRenderer = new UploadPhotoRenderer('img-upload');
const validator = new FormValidator(uploadForm);

//Logic
const feedPosts = generator.generate();
const thumbnailsFragments = picturesRenderer.render(feedPosts);
thumbnailsContainer?.appendChild(thumbnailsFragments);
Utils.supressKeydown('Escape', 'text__hashtags');
Utils.supressKeydown('Escape', 'text__description');

//Subscriptions
thumbnailsContainer.addEventListener('click', (evt) => {
  const targetElement = evt.target;
  const container = targetElement.closest('.picture');
  if (container?.dataset?.id) {
    const postIdentity = Number(container.dataset.id);
    pictureFullScreenRenderer.render(feedPosts.get(postIdentity));
  }
});

photoUploadInput.addEventListener('change', () => {
  const files = photoUploadInput.files;
  if (files.length > 0) {
    const fileName = files[0].name;
    uploadPictureRenderer.render(fileName);
  }
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validator.validate()) {
    uploadForm.submit();
  }
});
