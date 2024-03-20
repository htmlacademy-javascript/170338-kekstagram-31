import { Utils } from './utils';

export class PictureFilterRenderer {
  //Constants
  #DELAY_INTERVAL = 500;
  #RANDOM_POSTS_COUNT = 10;

  //Classes
  #FILTER_CLASS = 'filter';

  //Suffixes
  #INACTIVE_SUFFIX = '--inactive';
  #ACTIVE_SUFFIX = '--active';
  #FORM_SUFFIX = '__form';
  #BUTTON_SUFFIX = '__button';
  #RANDOM_SUFFIX = '-random';
  #TOP_DISCUSSED_SUFFIX = '-discussed';

  constructor(filterSectionName, posts, thumbnailsContainer, picturesRenderer) {
    this.filterSectionName = filterSectionName;
    this.posts = posts;
    this.thumbnailsContainer = thumbnailsContainer;
    this.picturesRenderer = picturesRenderer;

    this.filter = document.querySelector(`.${filterSectionName}`);
    this.filterForm = document.querySelector(`.${filterSectionName}${this.#FORM_SUFFIX}`);
    this.filterButtons = this.filterForm.querySelectorAll(`.${filterSectionName}${this.#BUTTON_SUFFIX}`);

    this.onFilterClick = (evt) => {
      this.#setFilter(evt.target);
    };

    this.delayedUpdate = Utils.debounce((filterId) => {
      this.#applyFilter(filterId);
    }, this.#DELAY_INTERVAL);
  }

  #applyFilter(filterId) {
    let filteredPosts = this.posts;

    this.picturesRenderer.clear(this.thumbnailsContainer);

    switch (filterId) {
      case `${this.#FILTER_CLASS}${this.#RANDOM_SUFFIX}`: {
        const postsArray = Array.from(this.posts.values());
        const slicedArray = Utils.shuffle(postsArray.slice()).slice(0, this.#RANDOM_POSTS_COUNT);
        filteredPosts = new Map(slicedArray.map((post) => [post.id, post]));
        break;
      }
      case `${this.#FILTER_CLASS}${this.#TOP_DISCUSSED_SUFFIX}`: {
        const postsArray = Array.from(this.posts.values());
        const sortedArray = postsArray.slice().sort((a, b) => b.comments.length - a.comments.length);
        filteredPosts = new Map(sortedArray.map((post) => [post.id, post]));
      }
    }

    const thumbnailsFragments = this.picturesRenderer.render(filteredPosts);
    this.thumbnailsContainer?.appendChild(thumbnailsFragments);
  }

  #setFilter(target) {
    const currentFilter = this.filterForm.querySelector(`.${this.filterSectionName}${this.#BUTTON_SUFFIX}${this.#ACTIVE_SUFFIX}`);

    if (target.classList.contains(`${this.filterSectionName}${this.#BUTTON_SUFFIX}`)) {
      if (target.id === currentFilter.id) {
        return;
      }

      this.#resetActiveFilterState();
      target.classList.add(`${this.filterSectionName}${this.#BUTTON_SUFFIX}${this.#ACTIVE_SUFFIX}`);
      this.delayedUpdate(target.id);
    }
  }

  #resetActiveFilterState() {
    this.filterButtons.forEach((btn) => {
      btn.classList.remove(`${this.filterSectionName}${this.#BUTTON_SUFFIX}${this.#ACTIVE_SUFFIX}`);
    });
  }

  #showFilter() {
    this.filter.classList.remove(`${this.filterSectionName}${this.#INACTIVE_SUFFIX}`);
  }

  render() {
    this.#showFilter();

    this.filterForm.addEventListener('click', this.onFilterClick);
  }
}
