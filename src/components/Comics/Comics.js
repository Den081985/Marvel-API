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

import "./Comics.css";

class Comics {
  async render() {
    let htmlContent = ``;
    const data = await getDataApi.getData(API_URL + URL_COMICS);
    data.forEach(({ id, title, thumbnail: { path, extension } }) => {
      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        //формируем путь запроса для получения персонажей комикса
        const uri = API_URL + URL_COMICS + "/" + id + URL_CHARACTERS;
        //   формируем путь запроса для получения списков комиксов
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
        htmlContent += `
        <li class = "comics__item" data-uri = "${uri}">
            <span class = "comics__name">${title}</span>
            <img class = "comics__img" src = "${imgSrc}"/>
        
        </li>
      
      `;
      }
    });

    const htmlWrapper = `
    <ul class = "comics__container">${htmlContent}</ul>
    
    `;

    ROOT_INDEX.innerHTML = htmlWrapper;
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
