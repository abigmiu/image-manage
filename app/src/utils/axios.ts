import type { IApiResponse } from '@/types/apis/base';
import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults, AxiosResponse, AxiosRequestConfig } from 'axios';
import { createMessage } from './naive';
import { toLoginPage } from '@/router';

class IAxios {
    private instance: AxiosInstance;

    constructor(config: CreateAxiosDefaults) {
        this.instance = axios.create(config);
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
        this.instance.interceptors.response.use((response: AxiosResponse<IApiResponse>) => {
            if (response.status !== 200 || response.data.code !== 200) {
                this.handleError(response);
                return Promise.reject();
            }
            return response.data.data;
        });
    }

    private handleError(response: AxiosResponse<IApiResponse>) {
        if (response.status !== 200) {
            createMessage().error(`服务器错误 ${response.status}`);
            return;
        }

        const { code } = response.data;
        switch(code) {
            case 401:
                createMessage().error('未登录或登录过期');
                toLoginPage();
                break;
            default:
                break;
        }
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config);
    }
}

const instance = new IAxios({
    baseURL: '/api',
    timeout: 60 * 1000, 
});

export default instance;