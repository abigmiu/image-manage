import { CloudUploadModule } from "./cloudUpload/cloudUpload.module";
import { ImageModule } from "./image/image.module";
import { TagsModule } from "./tags/tags.module";
import { UploadModule } from "./upload/upload.module";

export const appModules = [TagsModule, UploadModule, ImageModule, CloudUploadModule];
