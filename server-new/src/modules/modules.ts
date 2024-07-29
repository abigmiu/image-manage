import { AuthModule } from "./auth/auth.module";
import { BucketModule } from "./bucket/bucket.module";
import { AppLoggerModule } from "./common/app-logger/app-logger.module";
import { ImageInfoModule } from "./image-info/image-info.module";

import { PrismaModule } from "./prisma/prisma.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

export const businessModules = [
    PrismaModule,
    UserModule,
    AuthModule,
    UploadModule,
    AppLoggerModule,
    ImageInfoModule,
    BucketModule
];