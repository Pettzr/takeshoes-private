/*
  Warnings:

  - You are about to drop the column `productId` on the `PurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `PurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `PurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `PurchaseHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,id]` on the table `PurchaseHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PurchaseHistory" DROP CONSTRAINT "PurchaseHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseHistory" DROP CONSTRAINT "PurchaseHistory_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseHistory" DROP CONSTRAINT "PurchaseHistory_variantId_fkey";

-- DropIndex
DROP INDEX "PurchaseHistory_userId_productId_variantId_sizeId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "purchaseHistoryId" INTEGER;

-- AlterTable
ALTER TABLE "PurchaseHistory" DROP COLUMN "productId",
DROP COLUMN "quantity",
DROP COLUMN "sizeId",
DROP COLUMN "variantId";

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseHistory_userId_id_key" ON "PurchaseHistory"("userId", "id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_purchaseHistoryId_fkey" FOREIGN KEY ("purchaseHistoryId") REFERENCES "PurchaseHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
