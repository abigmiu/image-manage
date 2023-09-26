import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface ICloudUpload {
    qiniu?: {
        accessKey: string;
        secretKey: string;
        scope: string;
        accessHost: string;
        uploadHost: string;
    }
}

export interface IAppConfig {
    db: TypeOrmModuleOptions;
    port: number;
    globalPrefix: string;
    host: string;
    uploadAbsolutePath: string;
    staticAssetsPath: string;
    cloudUpload?: ICloudUpload;
    jwtSecret: string;
    jwtExpiresIn: number;
}
