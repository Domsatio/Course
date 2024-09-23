/*
  Warnings:

  - You are about to drop the column `image` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "image",
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscribeEnd" TIMESTAMP(3),
ADD COLUMN     "subscribeStart" TIMESTAMP(3);
