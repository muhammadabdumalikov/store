import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

export class EmailAlreadyRegistered extends BadRequestException {
  constructor() {
    super({ code: `${ErrorCodes.EMAIL_ALREADY_REGISTERED}` });
  }
}

export class PhoneAlreadyRegistered extends BadRequestException {
  constructor() {
    super({ code: `${ErrorCodes.PHONE_ALREADY_REGISTERED}` });
  }
}

export class IncorrectOtpException extends BadRequestException {
  constructor() {
    super({ code: `${ErrorCodes.INCORRECT_OTP}` });
  }
}

export class UserHasNotOwnerPermissionException extends BadRequestException {
  constructor() {
    super({ code: `${ErrorCodes.USER_HAS_NOT_OWNER_PERMISSION}` });
  }
}

export class ProductNotFoundException extends NotFoundException {
  constructor() {
    super({ code: `${ErrorCodes.PRODUCT_NOT_FOUND}` });
  }
}

export class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super({ code: `${ErrorCodes.CATEGORY_NOT_FOUND}` });
  }
}
