import { IsInt } from 'class-validator';

export class FavouriteDto {

  @IsInt({ message: 'userId must be in number' })
  readonly userId?: number;

  @IsInt({ message: 'productId must be in number' })
  readonly productId?: number;

}
