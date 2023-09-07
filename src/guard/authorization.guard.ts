import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoles } from 'src/domain/user/enum/user.enum';
import { IUser } from 'src/domain/user/interface/user.interface';
import { UserService } from 'src/domain/user/user.service';
import { UserHasNotPermissionException } from 'src/errors/permission.error';

@Injectable()
export class AdminGuard implements CanActivate {
  @Inject() private readonly userService: UserService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let tokenId = request.headers.authorization;

    if (!tokenId) {
      throw new UnauthorizedException();
    }

    if (tokenId.startsWith('Bearer ')) {
      tokenId = tokenId.substring('Bearer '.length);
    }

    const user: IUser = await this.userService.findOne(tokenId);

    if (!user || !user.id) {
      throw new UnauthorizedException();
    }

    if (user.role !== UserRoles.ADMIN) {
      throw new UserHasNotPermissionException();
    }

    request.user = user;

    return true;
  }
}
