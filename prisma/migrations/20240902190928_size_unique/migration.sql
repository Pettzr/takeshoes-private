/*
  Warnings:

  - A unique constraint covering the columns `[variantId,id]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Size_variantId_id_key" ON "Size"("variantId", "id");
