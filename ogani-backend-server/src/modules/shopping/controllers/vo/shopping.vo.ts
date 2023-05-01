import { CartVo } from "src/modules/cart/controllers/vo/cart.vo";
import { ProductVo } from "src/modules/product/controllers/product/vo/product.vo";
import { QueryListVo } from "src/modules/shared/vo/query.list.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";

export class ShoppingVo extends QueryVo {
  quantity: number;
  price: number;
  product: ProductVo;
  cart: CartVo;
}

export class ShoppingListVo extends QueryListVo {
  data: ShoppingVo[];
}