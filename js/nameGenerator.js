import { Utils } from './utils';

export class NameGenerator {
  static #namePrefixes = ['Bel', 'Nar', 'Xan', 'Jin', 'Far', 'Kas', 'Ver', 'Rin', 'Sar', 'Zen'];
  static #nameSuffixes = ['dor', 'han', 'thos', 'lian', 'mar', 'ser', 'ion', 'en', 'lar', 'an'];

  /**
  * Генерирует случайное имя из предложенных префиксов и суффиксов
  * @param {namePrefixes} Массив объектов для генерации описания
  * @param {nameSuffixes} Массив свойств для генерации описания
  * @returns {String} Имя получившееся в результате объединения префикса и суффикса
  */
  static generateRandomName(namePrefixes = this.#namePrefixes, nameSuffixes = this.#nameSuffixes) {
    const prefix = Utils.getRandomValueFromArray(namePrefixes);
    const suffix = Utils.getRandomValueFromArray(nameSuffixes);
    return prefix + suffix;
  }
}
