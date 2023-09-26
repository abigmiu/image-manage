import { IAppConfig } from "src/types/app";
import { join } from 'path';

const config: IAppConfig = {
    db: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'image-manage',
        synchronize: true,
        entities: [join(__dirname, '../entities/**/*{.ts,.js}')]
    },
    port: 3000,
    globalPrefix: '/api',
    host: '0.0.0.0',
    uploadAbsolutePath: join(__dirname, 'upload'),
    staticAssetsPath: '/static',
    cloudUpload: {
        qiniu: {
            accessKey: '',
            secretKey: '',
            scope: '',
            accessHost: '',
            uploadHost: '',
        }
    },
    jwtExpiresIn: 1,
    jwtSecret: '',
};
export default config;
