import {
  ValidationOptions,
  ValidateBy,
  buildMessage,
  isMobilePhone,
  isEmail,
} from 'class-validator';
import { usernameReg } from '../constants';

export const IS_USER_NAME = 'isUserName';

export const isUserName = (value: unknown): boolean => {
  return (
    typeof value === 'string' &&
    (usernameReg.test(value) || isMobilePhone(value, 'zh-CN') || isEmail(value))
  );
};

export function IsUserName(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_USER_NAME,
      constraints: [],
      validator: {
        validate: (value): boolean => isUserName(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property 4-20.',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
