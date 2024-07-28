import { IsNotEmpty } from "class-validator";

export class LoginRequestLogin {
    @IsNotEmpty()
    account: string;
    @IsNotEmpty()
    password: string;
}