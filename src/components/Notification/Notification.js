//Создаем класс для отображения элемента,информирующего о отсутствии персонажа комикса

import { ROOT_MODAL } from "../../../constants/root";

import * as classes from "./Notification.css";

import imgCloseBlack from "./Img/icons8-удалить.svg";

class Notification {
  render() {
    const htmlWrapper = `
    
        <div class = "${classes.notification__container}">
            <span class = "${classes.notification__text}">No contents</span>
            <button class = "btn btn-contain ${classes.notification__close}"
            onclick = "modal.innerHTML = ''"
            style = "background-image: url(${imgCloseBlack})"
            ></button>

        
        </div>
    
    `;

    ROOT_MODAL.innerHTML = htmlWrapper;
  }
}

export default new Notification();
