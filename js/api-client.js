export class ApiClient {
  //Suffixes
  #DATA_STORAGE_SUFFIX = 'data';

  //Classes
  #DATA_ERROR = 'data-error';

  constructor(serverAddress, messageRenderer){
    this.serverAddress = serverAddress;
    this.messageRenderer = messageRenderer;
  }

  #validateResponse(response) {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText})`);
    }
  }

  async getData(){
    try {
      const response = await fetch(`${this.serverAddress}${this.#DATA_STORAGE_SUFFIX}`);
      this.#validateResponse(response);

      const postsArray = await response.json();
      return new Map(postsArray.map((post) => [post.id, post]));
    } catch {
      this.messageRenderer.renderLoadError(this.#DATA_ERROR);
    }

    return null;
  }

  async postData(formData){
    try {
      const response = await fetch(`${this.serverAddress}`, {
        method: 'POST',
        body: new FormData(formData)
      });

      this.#validateResponse(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
