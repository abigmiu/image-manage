/*
  Warnings:

  - You are about to drop the column `coverFilePath` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `image` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_id` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb_id` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `height` INTEGER NULL,
    ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mimetype` INTEGER NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL,
    ADD COLUMN `width` INTEGER NULL;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `coverFilePath`,
    DROP COLUMN `file_path`,
    DROP COLUMN `height`,
    DROP COLUMN `width`,
    ADD COLUMN `file_id` INTEGER NOT NULL,
    ADD COLUMN `thumb_id` INTEGER NOT NULL;
