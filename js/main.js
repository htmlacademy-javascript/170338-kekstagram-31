import { PicturesPreviewRenderer } from './picturesPreviewRenderer';
import { PictureFullScreenRenderer } from './pictureFullScreenRenderer';
import { UploadPhotoRenderer } from './uploadPhotoRenderer';
import { FormValidator } from './formValidator';
import { Utils } from './utils';
import { ApiClient } from './apiClient';
import { MessagesRenderer } from './messagesRenderer';

//Selectors
const thumbnailsContainer = document.querySelector('.pictures');
const photoUploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');

//Classes Initialization
const apiClient = new ApiClient('https://31.javascript.htmlacademy.pro/kekstagram');
const picturesRenderer = new PicturesPreviewRenderer('picture');
const pictureFullScreenRenderer = new PictureFullScreenRenderer('big-picture');
const uploadPictureRenderer = new UploadPhotoRenderer('img-upload');
const validator = new FormValidator(uploadForm);
const messageRenderer = new MessagesRenderer();

//Logic
const feedPosts = await apiClient.getData(() => messageRenderer.renderLoadError('data-error'));
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

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (validator.validate()) {
    uploadPictureRenderer.beginUploading();
    uploadPictureRenderer.suspendEvents();
    try {
      const success = await apiClient.postData(evt.target, () => messageRenderer.renderUploadError('error', () => uploadPictureRenderer.unSuspendEvents()));
      if (success) {
        uploadPictureRenderer.cancel();
        messageRenderer.renderSuccess('success', () => uploadPictureRenderer.unSuspendEvents());
      }
    } finally {
      uploadPictureRenderer.endUploading();
    }
  }
});
