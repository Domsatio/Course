/*
  Warnings:

  - Made the column `grossAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `settlementTime` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transactionStatus` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transactionTime` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "grossAmount" SET NOT NULL,
ALTER COLUMN "settlementTime" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "transactionStatus" SET NOT NULL,
ALTER COLUMN "transactionTime" SET NOT NULL;
