/*
  Warnings:

  - You are about to drop the column `price` on the `Size` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "price";
