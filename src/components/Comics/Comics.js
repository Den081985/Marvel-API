/*Импортируем в модуль константы с адресом и эндпоинтом запроса
импортируем файл css и создаем класс в методе рендер которого вызываем
асинхронную функцию с методом getData запроса на сервер(репозиторий) */

/*Из полученных данных необходимо выбрать поля id, title, thumbnail(содержит путь к 
    изображению(path) и расширение(extension)) 
    data- атрибут в html-элементе является пользовательским и может быть установлен.
    пользовательские данные доступны через HTMLElementинтерфейс элемента, для которого установлен атрибут. */
import {
  API_KEY,
  API_URL,
  URL_COMICS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
  URL_CHARACTERS,
} from "../../../constants/api";

import { getDataApi } from "../../utils/getDataApi";

import { ROOT_INDEX } from "../../../constants/root";

import Error from "../Error";
// Импортируем CSS-модуль и сохраняем в объект classes.Далее обращаемся к свойствам с таким синтаксисом ${classes.comics__item}
import classes from "./Comics.css";

class Comics {
  renderComics(data) {
    let htmlContent = ``;
    data.forEach(({ id, title, thumbnail: { path, extension } }) => {
      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        //формируем путь запроса для получения персонажей комикса
        const uri = API_URL + URL_COMICS + "/" + id + URL_CHARACTERS;
        //   формируем путь запроса для получения изображений комиксов
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
        htmlContent += `
        <li class = "comics__item ${classes.comics__item}" data-uri = "${uri}">
            <span class = "${classes.comics__name}">${title}</span>
            <img class = "img-contain ${classes.comics__img}" src = "${imgSrc}"/>
        
        </li>
      
      `;
      }
    });

    const htmlWrapper = `
    <ul class = "${classes.comics__container}">${htmlContent}</ul>
    
    `;

    ROOT_INDEX.innerHTML = htmlWrapper;
  }
  /*В методе render проверяем полученные данные(data) и в случае успешного
  получения данных рендерим их в корневой элемент,в случае ошибки-вызываем Error.render()  */
  async render() {
    const data = await getDataApi.getData(API_URL + URL_COMICS);

    if (data) {
      this.renderComics(data);
    } else {
      Error.render();
    }

    // Запись проверки с помощью тернарного оператора data ?  this.renderComics(data) :  Error.render();
  }
  /*В методе получаем в DOM все элементы с классом comics__item и для каждого из них 
определяем обработчик событий и переменную uri в которую сохраняется атрибут data-uri
каждого элемента,содержащий путь к персонажам комикса*/

  eventListener() {
    document.querySelectorAll(".comics__item").forEach((element) => {
      const uri = element.getAttribute("data-uri");
      element.addEventListener("click", () => {
        console.log(uri);
      });
    });
  }
}

export default new Comics();
