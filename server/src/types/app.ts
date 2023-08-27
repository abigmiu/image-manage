import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface IAppConfig {
    db: TypeOrmModuleOptions;
    port: number;
    globalPrefix: string;
    host: string;
    uploadAbsolutePath: string;
    staticAssetsPath: string;
}
