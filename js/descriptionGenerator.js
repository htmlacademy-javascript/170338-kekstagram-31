import { Utils } from './utils';

export class DescriptionGenerator {
  static #subjects = ['Кот', 'Собака', 'Птица', 'Закат', 'Рассвет', 'Дерево', 'Город', 'Мост', 'Автомобиль', 'Цветок'];
  static #adjectives = ['красивый', 'уникальный', 'загадочный', 'оживленный', 'тихий', 'живописный', 'сияющий', 'мирный', 'величественный', 'яркий'];
  static #actions = ['играет в парке', 'отдыхает на природе', 'летает в небе', 'светит над горизонтом', 'растет в лесу', 'стоит у реки', 'пересекает улицу', 'цветет в саду', 'плавает в озере', 'бежит по полю'];
  static #places = ['в городе', 'в деревне', 'на улице', 'в парке', 'на пляже', 'в лесу', 'на острове', 'в пустыне', 'в горах', 'на реке'];

  /**
  * Генерирует случайное описание из предложенных объектов свойств действий и мест
  * @param {subjects} Массив объектов для генерации описания
  * @param {adjectives} Массив свойств для генерации описания
  * @param {actions} Массив действий для генерации описания
  * @param {places} Массив мест для генерации описания
  * @returns {String} Строка с описанием формирующаяся из параметров
  */
  static generateRandomDescription(subjects = this.#subjects, adjectives = this.#adjectives, actions = this.#actions, places = this.#places) {
    const subject = Utils.getRandomValueFromArray(subjects);
    const adjective = Utils.getRandomValueFromArray(adjectives);
    const action = Utils.getRandomValueFromArray(actions);
    const place = Utils.getRandomValueFromArray(places);

    return `${subject}, ${adjective}, ${action} ${place}.`;
  }
}
