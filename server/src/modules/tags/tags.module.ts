import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsEntity } from "src/entities/tags/tags.entity";

/* 标签 module */
@Module({
    imports: [
        TypeOrmModule.forFeature([TagsEntity])
    ],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {

}
