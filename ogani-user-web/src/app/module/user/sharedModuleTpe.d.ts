declare module "@ogani/spa-shared-module" {
  class OganiSessionStore {
    accessToken: string;
    userName: string;
    fullName: string;
    photoUrl: string;
  }
  class OganiCartStore {
    cartId: number;
    status: string;
    totalPrice: number;
    shoppings?: OganiShopping[];
  }
  class OganiShopping {
    productId: number;
    quantity: number;
    price: number;
  }
  class OganiFavouriteStore {
    productList: string[];
  }

  import { Observable } from 'rxjs';

  function getSessionObservable(): Observable<OganiSessionStore>;
  function getCartObservable(): Observable<OganiCartStore>;
  function getFavouriteObservable(): Observable<OganiFavouriteStore>;
  function getOganiSession(): OganiSessionStore;
  function saveOganiSession(val: OganiSessionStore): void;
  function getOganiCart(): Promise<OganiCartStore>;
  function clearShoppingCart(): Promise<boolean>;
  function addProductToShoppingCart(shop: OganiShopping): void;
  function deleteProductFromShoppingCart(shop: OganiShopping): void;
  function getOganiFavourite(): Promise<OganiFavouriteStore>;
  function addProductToFavourite(productId: number): void;
  function deleteProductFromFavourite(productId: number): void;
  function getAppInitStatus(): Observable<boolean>;
  function appInit(): Promise<boolean>;
  function sessionInit(): Promise<boolean>;
  function sessionDestroy(): void;

  export {
    OganiSessionStore,
    OganiCartStore,
    OganiShopping,
    OganiFavouriteStore,
    getSessionObservable,
    getCartObservable,
    getFavouriteObservable,
    getOganiSession,
    saveOganiSession,
    getOganiCart,
    clearShoppingCart,
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    getOganiFavourite,
    addProductToFavourite,
    deleteProductFromFavourite,
    getAppInitStatus,
    appInit,
    sessionInit,
    sessionDestroy
  };
}
