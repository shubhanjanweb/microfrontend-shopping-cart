import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { minMoneyReg } from '../constants';

@ValidatorConstraint({ async: true })
export class IsMinAmountConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line
  async validate(value: number, _args: ValidationArguments) {
    if (minMoneyReg.test(String(value))) {
      return true;
    } else {
      return false;
    }
  }

  defaultMessage() {
    return 'defaultMessage';
  }
}

export function IsMinAmount(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMinAmountConstraint,
    });
  };
}
