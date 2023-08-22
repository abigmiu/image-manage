import { IApiResponse } from '@/types/apis/base';
import axios from 'axios'
import { AxiosInstance, CreateAxiosDefaults, AxiosResponse, AxiosRequestConfig } from 'axios'

class IAxios {
    private instance: AxiosInstance

    constructor(config: CreateAxiosDefaults) {
        this.instance = axios.create(config);
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use((config) => {
            return config;
        })
        this.instance.interceptors.response.use((response: AxiosResponse<IApiResponse>) => {
            return response.data.data;
        })
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config);
    }
}

const instance = new IAxios({
    baseURL: '/api',
    timeout: 60 * 1000, 
})

export default instance;