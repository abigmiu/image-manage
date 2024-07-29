-- CreateTable
CREATE TABLE `bucket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `file_count` INTEGER NOT NULL DEFAULT 0,
    `file_size` INTEGER NOT NULL DEFAULT 0,
    `remark` VARCHAR(191) NULL,
    `config` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
