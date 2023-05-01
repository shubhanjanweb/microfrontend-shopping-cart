import axios from "axios";
import { getOganiSession, oganiCurrency } from "@ogani/spa-shared-module";

const BASE_URL = 'http://localhost:3000/cart';

export default {
  async getCartDetails() {
    const session = getOganiSession();
    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };
    let res = await axios.get(BASE_URL, config);
    return res.data;
  },

  toInr(val) {
    return oganiCurrency(val);
  }
}