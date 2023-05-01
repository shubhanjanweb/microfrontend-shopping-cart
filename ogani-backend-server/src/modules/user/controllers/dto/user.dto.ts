import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {

  readonly userName: string;
  readonly emailId: string;
  readonly password: string;
  readonly fullName: string;
  readonly mobileNumber: string;
  readonly type: string;
  readonly photoUrl: string;


  // @MaxLength(50, { message: 'MaxLength 50' })
  // @IsString({ message: 'not a string' })
  // @IsCurrency({ message: 'price not a valid currency' })
  // @ValidateIf((o) => o.imageUrl != '')
  // @IsOptional()

}
