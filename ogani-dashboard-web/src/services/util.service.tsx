import axios from "axios";
import { Observable } from "rxjs";

import { oganiCurrency } from "@ogani/spa-shared-module";

const baseURL = "http://localhost:3000/cart";

export default class UtilService {

  public static toINR(val: number): string {
    return oganiCurrency(val);
  };

}