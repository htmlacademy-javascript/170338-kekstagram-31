import { Utils } from './utils';

export class DescriptionGenerator {
  static #SUBJECTS = ['Кот', 'Собака', 'Птица', 'Закат', 'Рассвет', 'Дерево', 'Город', 'Мост', 'Автомобиль', 'Цветок'];
  static #ADJECTIVES = ['красивый', 'уникальный', 'загадочный', 'оживленный', 'тихий', 'живописный', 'сияющий', 'мирный', 'величественный', 'яркий'];
  static #ACTIONS = ['играет в парке', 'отдыхает на природе', 'летает в небе', 'светит над горизонтом', 'растет в лесу', 'стоит у реки', 'пересекает улицу', 'цветет в саду', 'плавает в озере', 'бежит по полю'];
  static #PLACES = ['в городе', 'в деревне', 'на улице', 'в парке', 'на пляже', 'в лесу', 'на острове', 'в пустыне', 'в горах', 'на реке'];

  /**
  * Генерирует случайное описание из предложенных объектов свойств действий и мест
  * @param {subjects} Массив объектов для генерации описания
  * @param {adjectives} Массив свойств для генерации описания
  * @param {actions} Массив действий для генерации описания
  * @param {places} Массив мест для генерации описания
  * @returns {String} Строка с описанием формирующаяся из параметров
  */
  static generateRandomDescription(subjects = this.#SUBJECTS, adjectives = this.#ADJECTIVES, actions = this.#ACTIONS, places = this.#PLACES) {
    const subject = Utils.getRandomValueFromArray(subjects);
    const adjective = Utils.getRandomValueFromArray(adjectives);
    const action = Utils.getRandomValueFromArray(actions);
    const place = Utils.getRandomValueFromArray(places);

    return `${subject}, ${adjective}, ${action} ${place}.`;
  }
}
