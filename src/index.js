/*Импортируем аксиос,создаем ключ для апи и асинхронную самовызывающуюся
функцию с методом класса getDataApi.getData
 */

// const API_URL = "https://gateway.marvel.com/v1/public/comics";

// const API_URL = "https://gateway.marvel.com/v1/public/characters";

import { API_KEY, API_URL, URL_COMICS } from "../constants/api";

import { getDataApi } from "./utils/getDataApi";

// Асинхронная самовызывающаяся функция

(async () => {
  const data = await getDataApi.getData(API_URL + URL_COMICS);
  console.log(data);
})();
