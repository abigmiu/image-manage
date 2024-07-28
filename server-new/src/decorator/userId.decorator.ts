import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: { required: boolean } = { required: true}, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const userId = user?.id;
    if (!userId && data.required) {
      throw new UnauthorizedException();
    }
    return userId;
  },
);