import type { IApiResponse } from '@/types/apis/base';
import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults, AxiosResponse, AxiosRequestConfig } from 'axios';

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
            return response.data.data;
        });
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