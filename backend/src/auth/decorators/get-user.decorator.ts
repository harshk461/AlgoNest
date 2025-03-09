import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/admin-user.entity';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    // If data is provided, return specific field
    if (data) {
      return request.user[data];
    }

    // Return whole user object
    return request.user;
  },
);
