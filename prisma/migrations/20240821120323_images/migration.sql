/*
  Warnings:

  - You are about to drop the column `backImageUrl` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `frontImageUrl` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "backImageUrl",
DROP COLUMN "frontImageUrl",
ADD COLUMN     "images" TEXT[];
