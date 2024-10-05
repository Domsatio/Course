/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
DROP COLUMN "quantity",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "grossAmount" TEXT,
ADD COLUMN     "settlementTime" TEXT,
ADD COLUMN     "token" JSONB,
ADD COLUMN     "transactionStatus" TEXT,
ADD COLUMN     "transactionTime" TEXT;

-- DropEnum
DROP TYPE "OrderStatus";
