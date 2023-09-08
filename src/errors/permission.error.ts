import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class UserHasNotPermissionException extends UnauthorizedException {
  constructor() {
    super({ code: `${ErrorCodes.USER_HAS_NOT_PERMISSION}` });
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({ code: `${ErrorCodes.USER_NOT_FOUND}` });
  }
}