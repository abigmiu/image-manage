import { IsInt } from "class-validator";

export class UploadTaskRequest {
    @IsInt()
    imageId: number;

    @IsInt({each: true})
    bucketIds: number[];
}