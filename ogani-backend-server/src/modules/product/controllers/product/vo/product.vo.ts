import { FavouriteVo } from "src/modules/favourite/controllers/vo/favourite.vo";
import { QueryListVo } from "src/modules/shared/vo/query.list.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";

export class ProductVo extends QueryVo {
  productName: string;
  price: number;
  imageUrl?: string;
  description?: string;
  discountPercentage: number;
}

export class ProductListVo extends QueryListVo {
  data: ProductVo[];
}
