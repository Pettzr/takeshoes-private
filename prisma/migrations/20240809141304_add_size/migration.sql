/*
  Warnings:

  - You are about to drop the `SizePrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SizePrice" DROP CONSTRAINT "SizePrice_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "SizePrice" DROP CONSTRAINT "SizePrice_variantId_fkey";

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SizePrice";

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
