import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {

    }

    validate(token?: string) {
        if (!token) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
