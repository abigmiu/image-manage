import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ILoginRequest } from "@/transformObject/auth/login.dto";
import { Public } from "@/decorator/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @Public()
    onLogin(@Body() data: ILoginRequest) {
        return this.authService.login(data);
    }
}
