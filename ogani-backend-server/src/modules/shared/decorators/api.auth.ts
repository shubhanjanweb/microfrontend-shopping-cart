import { applyDecorators, SetMetadata } from '@nestjs/common';
import { API_AUTH_KEY } from '../constants';

export function ApiAuth() {
  return applyDecorators(SetMetadata(API_AUTH_KEY, true));
}
