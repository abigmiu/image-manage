import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ImageInfoCreateRequest {
    @IsInt()
    originId: number

    @IsInt()
    thumbId: number;

    @IsString()
    name: string;
}