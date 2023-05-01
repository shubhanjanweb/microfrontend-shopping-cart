import axios from "axios";
import { addProductToFavourite, addProductToShoppingCart, deleteProductFromFavourite, getOganiSession } from "@ogani/spa-shared-module";

const baseURL = "http://localhost:3000/product-details";

export default class ProductService {

  public static getProductList = () => {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    return axios.get(baseURL + '/product', config);
  };

  public static getProductById = (id: number) => {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    return axios.get(`${baseURL}/product/${id}`, config);
  };


  public static addProductToList = (obj: { type: string, val: any }) => {
    if (obj.type === 'fav') {
      if (obj.val.isFavourite) {
        return deleteProductFromFavourite(obj.val.productId);
      } else {
        return addProductToFavourite(obj.val.productId);
      }
    } else if (obj.type === 'cart') {
      return addProductToShoppingCart(obj.val);
    } else {
      console.log('Wrong option chosen.');
    }
  };

}