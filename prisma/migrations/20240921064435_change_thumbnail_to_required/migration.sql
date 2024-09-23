/*
  Warnings:

  - Made the column `thumbnail` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "thumbnail" SET NOT NULL;
