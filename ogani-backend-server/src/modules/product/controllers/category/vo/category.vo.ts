import { QueryListVo } from "src/modules/shared/vo/query.list.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";
import { ProductVo } from "../../product/vo/product.vo";

export class CategoryVo extends QueryVo {
  categoryName: string;
  description?: string;
  products?: ProductVo[];
}

export class CategoryListVo extends QueryListVo {
  data: CategoryVo[];
}
