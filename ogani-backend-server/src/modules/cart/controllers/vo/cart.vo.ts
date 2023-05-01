import { PaymentVo } from "src/modules/payment/controllers/vo/payment.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";
import { ShoppingListVo, ShoppingVo } from "src/modules/shopping/controllers/vo/shopping.vo";
import { UserVo } from "src/modules/user/controllers/vo/user.vo";

export class CartVo extends QueryVo {
  status: string;
  user?: UserVo;
  payment?: PaymentVo;
  shoppings?: ShoppingVo[];
}