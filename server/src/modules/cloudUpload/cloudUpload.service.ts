import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ICloudUpload } from "src/types/app";

import * as qiniu from 'qiniu';
import { CloudUploadParamsVo } from "src/transformObject/cloudUpload/cloudUpload.vo";
import { v4 as uuidv4 } from 'uuid';
import { ICloudUploadQuery } from "src/transformObject/cloudUpload/cloudUpload.dto";

@Injectable()
export class CloudUploadService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    getQiNiuUploadConfig(query: ICloudUploadQuery) {
        const qiniuConfig = this.configService.get<ICloudUpload['qiniu']>('cloudUpload.qiniu');
        if (!qiniuConfig) {
            throw new BadRequestException('未配置七牛云服务');
        }

        const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);
        const options = {
            scope: qiniuConfig.scope,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);

        let filePath = uuidv4();
        if (query.dir) {
            filePath = `${query.dir}/${filePath}`;
        }
        const config: CloudUploadParamsVo = {
            uploadUrl: qiniuConfig.uploadHost,
            accessUrl: `${qiniuConfig.accessHost}${filePath}`,
            fileField: 'file',
            form: {
                token: uploadToken,
                key: filePath
            },
            headers: {},
            driver: 'qiniu',
            method: 'POST'
        };
        return config;
    }
}
