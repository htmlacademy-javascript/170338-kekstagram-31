export class Utils {
  /**
  * Генерирует случайное число
  * @returns {Number} Случайное число
  */
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
  * Выбирает случайное значение из массива
  * @returns {any} Случайное значение из массива
  */
  static getRandomValueFromArray(array) {
    if (!Array.isArray(array)) {
      throw new Error('Значение должно быть массивом');
    }

    return array[Math.floor(Math.random() * array.length)];
  }

  /**
  * Генерирует случайное число ограниченного максимальным значением
  * @param {maxIdentity} Максимальное число при генерации
  * @param {dataStore} Map в котором хранятся все уже использованные числа
  * @returns {any} Случайное значение из массива
  */
  static generateUniqueIdentity(minIdentity, maxIdentity, dataStore) {
    let result;
    do {
      result = this.generateRandomNumber(minIdentity, maxIdentity);
    } while(dataStore.has(result));
    return result;
  }

  /**
   * Позволяет заглушить эвент на заданном классе
   * @param {keyCode} Тип эвента который нужно заглушить
   * @param {elementClass} Класс объекта чей эвент нужно заглушить
   */
  static supressKeydown(keyCode, elementClass) {
    const element = document.querySelector(`.${elementClass}`);
    element.addEventListener('keydown', (evt) => {
      if (evt.key === keyCode) {
        evt.stopPropagation();
      }
    });
  }

  /**
   * Функция позволяет выполнять любую функцию переденную как callback отложено
   * @param {callback} Функция которую небоходимо выполнить с определенной задержкой
   * @returns {Function} Функцию обертку которая и выполняет callback с задержкой
   */
  static debounce(callback, interval) {
    let lastTimeout = null;

    return (...args) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        callback(...args);
      }, interval);
    };
  }

  /**
   * Функция для перемешивания массива
   * @param {Array} Массив который необходимо случайным образом перемешать
   * @returns {Array} Перемешанный исходный массив
   */
  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
