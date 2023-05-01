import { IsOptional } from 'class-validator';
import { QueryOptionsDto } from 'src/modules/shared/dto/query.options.dto';

export class ProductReqDto extends QueryOptionsDto {
  id?: number;
}
