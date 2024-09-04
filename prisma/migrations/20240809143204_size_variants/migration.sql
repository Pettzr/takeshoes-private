/*
  Warnings:

  - You are about to drop the `_ProductVariantSizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductVariantSizes" DROP CONSTRAINT "_ProductVariantSizes_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantSizes" DROP CONSTRAINT "_ProductVariantSizes_B_fkey";

-- DropTable
DROP TABLE "_ProductVariantSizes";

-- CreateTable
CREATE TABLE "_SizeVariants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SizeVariants_AB_unique" ON "_SizeVariants"("A", "B");

-- CreateIndex
CREATE INDEX "_SizeVariants_B_index" ON "_SizeVariants"("B");

-- AddForeignKey
ALTER TABLE "_SizeVariants" ADD CONSTRAINT "_SizeVariants_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SizeVariants" ADD CONSTRAINT "_SizeVariants_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
