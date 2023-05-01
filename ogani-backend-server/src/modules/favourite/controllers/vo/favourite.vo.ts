import { PaymentVo } from "src/modules/payment/controllers/vo/payment.vo";
import { ProductVo } from "src/modules/product/controllers/product/vo/product.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";
import { ShoppingListVo, ShoppingVo } from "src/modules/shopping/controllers/vo/shopping.vo";
import { UserVo } from "src/modules/user/controllers/vo/user.vo";

export class FavouriteVo extends QueryVo {
  user?: UserVo;
  product?: ProductVo;
}