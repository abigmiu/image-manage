import { Controller, Get } from "@nestjs/common";
import { CloudUploadService } from "./cloudUpload.service";

@Controller('cloud-upload')
export class CloudUploadController {
    constructor(
        private readonly cloudUploadService: CloudUploadService
    ) { }

    @Get('qiniu')
    getQiNiuUploadConfig() {
        return this.cloudUploadService.getQiNiuUploadConfig();
    }
}
