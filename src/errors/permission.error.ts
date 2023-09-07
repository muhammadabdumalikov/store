import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class UserHasNotPermissionException extends BadRequestException {
  constructor() {
    super({ code: `${ErrorCodes.USER_HAS_NOT_PERMISSION}` });
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({ code: `${ErrorCodes.USER_NOT_FOUND}` });
  }
}