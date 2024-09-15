/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
