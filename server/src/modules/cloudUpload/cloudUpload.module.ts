import { Module } from "@nestjs/common";
import { CloudUploadController } from "./cloudUpload.controller";
import { CloudUploadService } from "./cloudUpload.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [CloudUploadController],
    imports: [ConfigModule.forRoot()],
    providers: [CloudUploadService]
})
export class CloudUploadModule { }
