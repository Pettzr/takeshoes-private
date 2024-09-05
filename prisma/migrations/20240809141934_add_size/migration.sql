/*
  Warnings:

  - You are about to drop the `_SizeVariants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SizeVariants" DROP CONSTRAINT "_SizeVariants_A_fkey";

-- DropForeignKey
ALTER TABLE "_SizeVariants" DROP CONSTRAINT "_SizeVariants_B_fkey";

-- DropTable
DROP TABLE "_SizeVariants";

-- CreateTable
CREATE TABLE "_ProductVariantSizes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVariantSizes_AB_unique" ON "_ProductVariantSizes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVariantSizes_B_index" ON "_ProductVariantSizes"("B");

-- AddForeignKey
ALTER TABLE "_ProductVariantSizes" ADD CONSTRAINT "_ProductVariantSizes_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantSizes" ADD CONSTRAINT "_ProductVariantSizes_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
