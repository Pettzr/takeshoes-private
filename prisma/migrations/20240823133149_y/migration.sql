/*
  Warnings:

  - A unique constraint covering the columns `[productId,color]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductVariant_color_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_color_key" ON "ProductVariant"("productId", "color");
