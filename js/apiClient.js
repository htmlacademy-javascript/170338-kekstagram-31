export class ApiClient {
  //Suffixes
  #DATA_STORAGE_SUFFIX = 'data';

  constructor(serverAddress){
    this.serverAddress = serverAddress;
  }

  #validateResponse(response) {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText})`);
    }
  }

  async getData(onFail){
    try {
      const response = await fetch(`${this.serverAddress}/${this.#DATA_STORAGE_SUFFIX}`);
      this.#validateResponse(response);

      const postsArray = await response.json();
      return new Map(postsArray.map((post) => [post.id, post]));
    } catch {
      onFail();
    }

    return null;
  }

  async postData(formData, onFail){
    try {
      const response = await fetch(`${this.serverAddress}`, {
        method: 'POST',
        body: new FormData(formData)
      });

      this.#validateResponse(response);
    } catch (error) {
      onFail();
      return false;
    }

    return true;
  }
}
