import { QueryListVo } from "src/modules/shared/vo/query.list.vo";
import { QueryVo } from "src/modules/shared/vo/query.vo";

export class CategoryVo extends QueryVo {
  categoryName: string;
  description?: string;
}

export class CategoryListVo extends QueryListVo {
  data: CategoryVo[];
}
