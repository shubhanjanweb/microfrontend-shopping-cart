import { CartVo } from "src/modules/cart/controllers/vo/cart.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";

export class PaymentVo extends QueryVo {
  cart: CartVo;
}