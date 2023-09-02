import { Controller, Get, Query } from "@nestjs/common";
import { CloudUploadService } from "./cloudUpload.service";
import { ICloudUploadQuery } from "src/transformObject/cloudUpload/cloudUpload.dto";

@Controller('cloud-upload')
export class CloudUploadController {
    constructor(
        private readonly cloudUploadService: CloudUploadService
    ) { }

    @Get('qiniu')
    getQiNiuUploadConfig(@Query() query: ICloudUploadQuery) {
        return this.cloudUploadService.getQiNiuUploadConfig(query);
    }
}
