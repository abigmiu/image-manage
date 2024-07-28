import { Expose } from "class-transformer";
import { IsString, IsUrl, Matches, ValidateIf } from "class-validator";

export class RegisterRequestDto {
    @Matches(/^[a-z0-9]{4,16}$/, {
        message: '账号为4-16位小写英文字母和数字组合'
    })
    account: string;

    @Matches(/^[\u4e00-\u9fa5\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\ua000-\uA48F\ua4d0-\uA4FF\uAC00-\uD7A3a-zA-Z0-9]{2,16}$/, {
        message: '昵称为4-16位中文、英文字母、日文、数字组合'
    })
    nickname: string;

    @Matches(/^[ A-Za-z0-9]{8,16}$/, {
        message: '密码为8到16位字母数字组合'
    })
    password: string;

    @IsUrl({}, { message: '头像地址不正确' })
    avatar: string;
}

export class RegisterResponseDto {
    constructor(data) {
        Object.assign(this, data);
    }

    @Expose()
    nickname: string;
}