/* создаем класс Арр с асинхронным методом рендер
для выполнения запроса на сервер(удаленный репозиторий).Экспортируем экземпляр класса.
Импортируем app.css и класс Comics */
import Comics from "../Comics";

import "./app.css";
class App {
  async render() {
    await Comics.render();
  }
}

export default new App();
