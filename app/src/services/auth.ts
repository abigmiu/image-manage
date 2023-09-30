import type { ILoginRequest } from "@/types/apis/request/auth/login";
import type { ILoginResponse } from "@/types/apis/response/auth/login";
import http from '@/utils/axios';
class AuthService {
    private readonly prefix = 'auth';

    login(data: ILoginRequest) {
        return http.request<ILoginResponse>({
            url: `${this.prefix}/login`,
            method: 'post',
            data
        });
    }
}

export const authService = new AuthService;