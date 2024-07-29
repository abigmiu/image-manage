import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBucketDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    config: Object;

    @IsInt()
    type: number

    @IsString()
    @IsOptional()
    remark?: string
}