/*
  Warnings:

  - Changed the type of `grossAmount` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalDiscount" DOUBLE PRECISION DEFAULT 0,
DROP COLUMN "grossAmount",
ADD COLUMN     "grossAmount" DOUBLE PRECISION NOT NULL;
