import axios from "axios";
import { getOganiSession } from "@ogani/spa-shared-module";

const baseURL = "http://localhost:3000/product-details";

export default class CategoryService {

  public static getCategoryList = () => {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    return axios.get(baseURL + '/category/name', config);
  };

  public static getProductsByCategoryId = (id: number) => {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    return axios.get(`${baseURL}/category/${id}`, config);
  };

}