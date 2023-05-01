import axios from "axios";
import { Observable } from "rxjs";

import { addProductToFavourite, addProductToShoppingCart, getCartObservable, getOganiCart, getOganiSession, OganiCartStore } from "@ogani/spa-shared-module";

const baseURL = "http://localhost:3000/cart";

export default class CartService {

  public static getShoppingList(): Observable<OganiCartStore> {
    return getCartObservable();
  };

}