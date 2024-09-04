/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId,variantId,sizeId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cart_userId_variantId_sizeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_productId_variantId_sizeId_key" ON "Cart"("userId", "productId", "variantId", "sizeId");
