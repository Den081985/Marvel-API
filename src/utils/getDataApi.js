/*Импортируем аксиос для выполнения запросов на сервер или удаленный репозиторий
и ключ для марвел апи.Создаем класс с асинхронным методом  getData для выполнения запроса
и создаем экземпляр класса. */

import axios from "axios";

import { API_KEY } from "../../constants/api";

class GetDataApi {
  async getData(url) {
    try {
      const response = await axios.get(url, {
        params: {
          apikey: API_KEY,
          limit: 100,
        },
      });
      return response.data.data.results;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

export const getDataApi = new GetDataApi();
