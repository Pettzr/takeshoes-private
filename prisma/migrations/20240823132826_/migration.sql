/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_color_key" ON "ProductVariant"("color");
