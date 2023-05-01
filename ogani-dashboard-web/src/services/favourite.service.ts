import axios from "axios";
import { Observable } from "rxjs";

import { getCartObservable, getFavouriteObservable, getOganiSession, OganiCartStore, OganiFavouriteStore } from "@ogani/spa-shared-module";

const baseURL = "http://localhost:3000/favourite";

export default class FavouriteService {

  public static getFavouriteList(): Observable<OganiFavouriteStore> {
    return getFavouriteObservable();
  };

  public static getFavProductList = () => {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    return axios.get(baseURL + '/product', config);
  };

}