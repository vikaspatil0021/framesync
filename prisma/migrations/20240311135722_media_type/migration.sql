/*
  Warnings:

  - Changed the type of `type` on the `Media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VideoFile', 'Folder');

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "type",
ADD COLUMN     "type" "MediaType" NOT NULL;
