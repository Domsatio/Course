/*
  Warnings:

  - Added the required column `customerDetails` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerDetails" JSONB NOT NULL,
ALTER COLUMN "settlementTime" DROP NOT NULL,
ALTER COLUMN "transactionTime" DROP NOT NULL;
