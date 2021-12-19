/*Создаем асинхронную самовызывающуюся функцию с методом класса App.render()
и импортируем  экземпляр класса App*/

// const API_URL = "https://gateway.marvel.com/v1/public/comics";

// const API_URL = "https://gateway.marvel.com/v1/public/characters";

import App from "../src/components/App/app";

import Comics from "./components/Comics";

// Асинхронная самовызывающаяся функция
//после рендеринга для каждого элемента устанавливаем метод с обработчиком события
(async () => {
  await App.render();
  Comics.eventListener();
})();
