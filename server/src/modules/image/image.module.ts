import { Module } from "@nestjs/common";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEntity } from "src/entities/image/image.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([ImageEntity])
    ],
    controllers: [ImageController],
    providers: [ImageService]
})
export class ImageModule {}
