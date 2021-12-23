/*Создаем класс для получения персонажей комикса и рендеринга на страницу */
// Импортируем экземпляр класса с методом для запроса(getData)
import { getDataApi } from "../../utils/getDataApi";
//Импортируем ссылку на узел html
import { ROOT_MODAL } from "../../../constants/root";

import { IMG_STANDARD_XLARGE } from "../../../constants/api";

import Notification from "../Notification/Notification";

// Импортируем класс CSS
import * as classes from "./Characters.css";

//Импортируем изображение для закрытия в переменную imgCloseWhite,в которой при сборке оно будет хранится
import imgCloseWhite from "./img/icons8-удалить.svg";

class Characters {
  //Метод,который будет отображать полученных персонажей
  renderContent(data) {
    let htmlContent = ``;

    data.forEach(({ name, thumbnail: { path, extension } }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

      htmlContent += `
        <li class = "${classes.characters__item}">
            <img  class = "img-cover ${classes.characters__img}"src = "${imgSrc}"/>
            <span class = "${classes.characters__name}">${name}</span>
        </li>
      
      `;
    });

    const htmlWrapper = `
       <div class = "${classes.wrapper}">
            <ul class = "${classes.characters__container}">
            ${htmlContent}
            </ul>
            <button class = "btn btn-contain ${classes.characters__close}"
            onclick = "modal.innerHTML = ''"
            style = "background-image: url(${imgCloseWhite})"
            ></button>

       </div>
    `;

    ROOT_MODAL.innerHTML = htmlWrapper;
  }

  async render(uri) {
    const data = await getDataApi.getData(uri);
    /*if (data.length) {
      this.renderContent();
    } else {
      this.renderNotification();
    }*/
    //Запись проверки тернарным оператором
    data.length ? this.renderContent(data) : Notification.render();
  }
}

export default new Characters();
