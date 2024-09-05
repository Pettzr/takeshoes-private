/*
  Warnings:

  - You are about to drop the column `price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_sizeId_fkey";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "sizeId";

-- CreateTable
CREATE TABLE "SizePrice" (
    "id" SERIAL NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SizePrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SizePrice" ADD CONSTRAINT "SizePrice_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizePrice" ADD CONSTRAINT "SizePrice_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
