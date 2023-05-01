import { IsOptional } from 'class-validator';
import { QueryOptionsDto } from 'src/modules/shared/dto/query.options.dto';

export class ShoppingReqDto extends QueryOptionsDto {
  id?: number;
}
