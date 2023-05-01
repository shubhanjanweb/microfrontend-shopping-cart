declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "@ogani/spa-shared-module" {
  class OganiSessionStore {
    accessToken: string;
    userId: number;
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

  function getSessionObservable(): Observable<OganiSessionStore | null>;
  function getOganiSession(): OganiSessionStore;
  function saveOganiSession(s: OganiSessionStore): void;

  function getCartObservable(): Observable<OganiCartStore>
  function getOganiCart(): Promise<OganiCartStore>
  function clearShoppingCart(): void;
  function addProductToShoppingCart(shop: OganiShopping): Promise<boolean>;
  function deleteProductFromShoppingCart(shop: OganiShopping): Promise<boolean>;

  function getFavouriteObservable(): Observable<OganiFavouriteStore>
  function getOganiFavourite(): Promise<OganiFavouriteStore>
  function addProductToFavourite(productId: number): Promise<boolean>;
  function deleteProductFromFavourite(productId: number): Promise<boolean>;

  function sessionInit(): Promise<boolean>;
  function sessionDestroy(): Promise<boolean>;

  export {
    OganiSessionStore,
    OganiCartStore,
    OganiShopping,
    OganiFavouriteStore,
    getSessionObservable,
    getOganiSession,
    saveOganiSession,
    getCartObservable,
    getOganiCart,
    clearShoppingCart,
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    getFavouriteObservable,
    getOganiFavourite,
    addProductToFavourite,
    deleteProductFromFavourite,
    sessionInit,
    sessionDestroy
  };
}
