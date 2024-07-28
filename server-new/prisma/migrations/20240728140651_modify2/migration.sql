/*
  Warnings:

  - You are about to drop the column `file_id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `thumb_id` on the `image` table. All the data in the column will be lost.
  - Added the required column `originId` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbId` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `file_id`,
    DROP COLUMN `thumb_id`,
    ADD COLUMN `originId` INTEGER NOT NULL,
    ADD COLUMN `thumbId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_originId_fkey` FOREIGN KEY (`originId`) REFERENCES `file`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_thumbId_fkey` FOREIGN KEY (`thumbId`) REFERENCES `file`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
