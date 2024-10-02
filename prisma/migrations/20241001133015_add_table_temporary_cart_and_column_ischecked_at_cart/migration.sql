-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "isChecked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TemporaryCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemporaryCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryCart_userId_key" ON "TemporaryCart"("userId");

-- CreateIndex
CREATE INDEX "TemporaryCart_userId_idx" ON "TemporaryCart"("userId");

-- CreateIndex
CREATE INDEX "TemporaryCart_productId_idx" ON "TemporaryCart"("productId");

-- AddForeignKey
ALTER TABLE "TemporaryCart" ADD CONSTRAINT "TemporaryCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporaryCart" ADD CONSTRAINT "TemporaryCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
