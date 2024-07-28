import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/modules/common/app-logger/app-logger.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private appLoggerService: AppLoggerService,
    ) { }

    async canActivate(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (token) {
            try {
                const payload = await this.jwtService.verifyAsync(token);
                request['user'] = payload;
                console.log("🚀 ~ AuthGuard ~ canActivate ~ payload:", payload);
            } catch(e) {
                this.appLoggerService.error('token 校验失败')
            }
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // @ts-ignore
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}