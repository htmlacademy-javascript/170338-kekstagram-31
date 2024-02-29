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
}
