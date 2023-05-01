import { BehaviorSubject, Observable } from "rxjs";
import axios from "axios";
import { pathToActiveWhen, navigateToUrl } from "single-spa";

const SESSION_STORE_KEY = 'OganiSessionStore';
const CART_STORE_KEY = 'OganiCartStore';
const FAVOURITE_STORE_KEY = 'OganiFavouriteStore';
const BASE_URL = "http://localhost:3000";

function readFromLocalStorage(key: string) {
  const val = localStorage.getItem(key);
  if (val)
    return JSON.parse(localStorage.getItem(key));
  else
    return null;
}
function saveInLocalStorage(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function deleteFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
function getObservable(obj: BehaviorSubject<any>): Observable<any> {
  return obj.asObservable();
}
async function readFromObservable(obj$: BehaviorSubject<any>): Promise<any> {
  return new Promise((resolve, reject) => {
    resolve(obj$.getValue());
  });
}
function saveInObservable(obj$: BehaviorSubject<any>, val: any) {
  obj$.next(val);
}

export class OganiSessionStore {
  constructor(
    public accessToken: string | null,
    public userName: string | null,
    public fullName: string | null,
    public photoUrl: string | null
  ) { }
}
export class OganiCartStore {
  constructor(
    public id: number | null,
    public status: string | null,
    public totalPrice: number | null,
    public shoppings?: OganiShopping[] | null
  ) { }
}
export class OganiShopping {
  constructor(
    public productId: number | null,
    public quantity: number | null,
    public price: number | null
  ) { }
}
export class OganiProduct {
  constructor(
    public productId: number | null,
    public price: number | null
  ) { }
}
export class OganiFavouriteStore {
  constructor(
    public productList: string[] | null
  ) { }
}

let sessionStore: OganiSessionStore;
let cartStore: OganiCartStore;
let favouriteStore: OganiFavouriteStore;
let sessionStore$: BehaviorSubject<OganiSessionStore>;
let cartStore$: BehaviorSubject<OganiCartStore>;
let favouriteStore$: BehaviorSubject<OganiFavouriteStore>;
let appInitDone$: BehaviorSubject<boolean> = new BehaviorSubject(false);

// GET the Watchers **********************************************************************************************

export function getSessionObservable(): Observable<OganiSessionStore> {
  return getObservable(sessionStore$);
}
export function getCartObservable(): Observable<OganiCartStore> {
  return getObservable(cartStore$);
}
export function getFavouriteObservable(): Observable<OganiFavouriteStore> {
  return getObservable(favouriteStore$);
}

// Session Details ***********************************************************************************************

export function getOganiSession(): OganiSessionStore {
  return readFromLocalStorage(SESSION_STORE_KEY);
}
export function saveOganiSession(val: OganiSessionStore) {
  saveInLocalStorage(SESSION_STORE_KEY, val);
  sessionStore$.next(val);
}

// CART Details ***********************************************************************************************

async function readCartFromDB(): Promise<OganiCartStore> {
  const session = getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + '/cart', config).then(result => {
      resolve(result.data);
    }).catch(err => reject(err));
  });
}
async function saveCartInDB(cart: OganiCartStore): Promise<boolean> {
  const session = getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    const { id, ...body } = cart;
    axios.patch(BASE_URL + '/cart/' + cart.id, body, config).then(result => {
      resolve(result.data);
    }).catch(err => reject(err));
  });
}
async function addProductToCartAndSaveInDB(productId: number, quantity: number): Promise<boolean> {
  const session = getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  let body: any = {};

  return new Promise((resolve, reject) => {
    readCart().then(cart => {
      body.cartId = cart.id;
      body.productId = productId;
      body.quantity = quantity;
      axios.post(BASE_URL + '/shopping', body, config).then(result => {
        resetCart().then(rsp => {
          resolve(true);
        })
      }).catch(err => reject(err));
    });
  });
}
async function deleteProductFromCartAndSaveInDB(productId: number, quantity: number): Promise<boolean> {
  const session = getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  let body: any = {};
  return new Promise((resolve, reject) => {
    readCart().then(cart => {
      body.cartId = cart.id;
      body.productId = productId;
      body.quantity = quantity;
      axios.patch(BASE_URL + '/shopping', body, config).then(result => {
        resetCart().then(rsp => {
          resolve(true);
        })
      }).catch(err => reject(err));
    });
  });
}
async function readCart(): Promise<OganiCartStore> {
  return new Promise((resolve, reject) => {
    readFromObservable(cartStore$).then(rsp => {
      resolve(rsp);
    }).catch(err => {
      // readFromLocalStorage(CART_STORE_KEY).then(rsp => {
      //   saveInObservable(cartStore$, rsp);
      //   resolve(rsp);
      // }).catch(err => {
      //   readCartFromDB().then(rsp => {
      //     saveInLocalStorage(CART_STORE_KEY, rsp);
      //     saveInObservable(cartStore$, rsp);
      //   }).catch(err => {
      //     reject(null);
      //   })
      // })
    })
  });
}
async function overrideCart(val: OganiCartStore): Promise<boolean> {
  return new Promise((resolve, reject) => {
    saveCartInDB(val).then(status => {
      if (status) {
        saveInLocalStorage(CART_STORE_KEY, val);
        saveInObservable(cartStore$, val);
      }
      resolve(true);
    }).catch(err => {
      reject(null);
    });
  });
}
async function resetCart(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    readCartFromDB().then(cart => {
      saveInLocalStorage(CART_STORE_KEY, cart);
      saveInObservable(cartStore$, cart);
      resolve(true);
    });
  });
}

export async function getOganiCart(): Promise<OganiCartStore> {
  return readCart();
}
export async function clearShoppingCart(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    readCart().then(cart => {
      cart.shoppings = [];
      cart.totalPrice = 0;
      overrideCart(cart).then(rsp => {
        resolve(true);
      });
    }).catch(err => reject(err));
  });
}
export async function addProductToShoppingCart(shop: OganiShopping): Promise<boolean> {
  return addProductToCartAndSaveInDB(shop.productId, shop.quantity);
}
export async function deleteProductFromShoppingCart(shop: OganiShopping): Promise<boolean> {
  return deleteProductFromCartAndSaveInDB(shop.productId, shop.quantity);
}

// FAVOURITE DETAILS ************************************************************************************* */

async function readFavouriteFromDB(): Promise<OganiFavouriteStore> {
  const session = await getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + '/favourite/productids', config).then(result => {
      resolve({ productList: result.data });
    }).catch(err => reject(err));
  });
}
async function addProductToFavouriteAndSaveInDB(productId: number): Promise<boolean> {
  const session = await getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + '/favourite/add/' + productId, config).then(result => {
      resetFavourite().then(rsp => {
        resolve(true);
      })
    }).catch(err => reject(err));
  });
}
async function deleteProductFromFavouriteAndSaveInDB(productId: number): Promise<boolean> {
  const session = await getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    axios.delete(BASE_URL + '/favourite/remove/' + productId, config).then(result => {
      resetFavourite().then(rsp => {
        resolve(true);
      })
    }).catch(err => reject(err));
  });
}
async function getProductsFromFavouriteList(): Promise<OganiProduct[]> {
  const session = await getOganiSession();
  const config = {
    headers: { Authorization: `Bearer ${session.accessToken}` }
  };
  return new Promise((resolve, reject) => {
    axios.delete(BASE_URL + '/favourite/product', config).then(result => {
      console.log(result.data);
      resolve(result.data);
    }).catch(err => reject(err));
  });
}
async function readFavourite(): Promise<OganiFavouriteStore> {
  return new Promise((resolve, reject) => {
    readFromObservable(favouriteStore$).then(rsp => {
      resolve(rsp);
    }).catch(err => {
      readFromLocalStorage(FAVOURITE_STORE_KEY).then(rsp => {
        saveInObservable(favouriteStore$, rsp);
        resolve(rsp);
      }).catch(err => {
        readFavouriteFromDB().then(rsp => {
          saveInLocalStorage(FAVOURITE_STORE_KEY, rsp);
          saveInObservable(favouriteStore$, rsp);
          resolve(rsp);
        })
      })
    })
  });
}
async function resetFavourite(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    readFavouriteFromDB().then(favourite => {
      saveInLocalStorage(FAVOURITE_STORE_KEY, favourite);
      saveInObservable(favouriteStore$, favourite);
      resolve(true);
    }).catch(err => {
      reject(null);
    });
  });
}


export async function getOganiFavouriteProducts(): Promise<OganiProduct[]> {
  return getProductsFromFavouriteList();
}
export async function getOganiFavouriteIds(): Promise<OganiFavouriteStore> {
  return readFavourite();
}
export async function addProductToFavourite(productId: number): Promise<boolean> {
  return addProductToFavouriteAndSaveInDB(productId);
}
export async function deleteProductFromFavourite(productId: number): Promise<boolean> {
  return deleteProductFromFavouriteAndSaveInDB(productId);
}

// SESSION ************************************************************************************** */

export function getAppInitStatus(): Observable<boolean> {
  return getObservable(appInitDone$);
}
export async function appInit(): Promise<boolean> {
  sessionStore = readFromLocalStorage(SESSION_STORE_KEY);
  cartStore = readFromLocalStorage(CART_STORE_KEY);
  favouriteStore = readFromLocalStorage(FAVOURITE_STORE_KEY);
  sessionStore$ = new BehaviorSubject<OganiSessionStore>(sessionStore);
  cartStore$ = new BehaviorSubject<OganiCartStore>(cartStore);
  favouriteStore$ = new BehaviorSubject<OganiFavouriteStore>(favouriteStore);
  if (sessionStore) {
    saveInObservable(appInitDone$, true)
    return true;
  } else {
    saveInObservable(appInitDone$, false)
    return false;
  }
}
export async function sessionInit(): Promise<boolean> {
  await resetCart();
  await resetFavourite();
  saveInObservable(appInitDone$, true)
  return true;
}
export function sessionDestroy() {
  deleteFromLocalStorage(SESSION_STORE_KEY);
  deleteFromLocalStorage(FAVOURITE_STORE_KEY);
  deleteFromLocalStorage(CART_STORE_KEY);
  saveInObservable(sessionStore$, null);
  saveInObservable(cartStore$, null);
  saveInObservable(favouriteStore$, null);
}

// PATH ***************************************************************************************** */

export function checkForActivatedPath(path: string): boolean {
  const activeWhen = pathToActiveWhen(path);
  return activeWhen(window.location);
}

export function singleSpaNavigate(e: any) {
  navigateToUrl(e);
}

export function oganiCurrency(val: number) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  });
  return formatter.format(val);
}

