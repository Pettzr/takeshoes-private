/*
  Warnings:

  - You are about to drop the column `name` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the `_SizeVariants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `size` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SizeVariants" DROP CONSTRAINT "_SizeVariants_A_fkey";

-- DropForeignKey
ALTER TABLE "_SizeVariants" DROP CONSTRAINT "_SizeVariants_B_fkey";

-- DropIndex
DROP INDEX "Size_name_key";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "name",
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "variantId" INTEGER NOT NULL,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "quantity" DROP DEFAULT;

-- DropTable
DROP TABLE "_SizeVariants";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
