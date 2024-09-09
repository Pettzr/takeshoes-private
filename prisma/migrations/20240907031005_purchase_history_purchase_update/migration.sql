/*
  Warnings:

  - You are about to drop the column `purchaseHistoryId` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `purchaseId` to the `PurchaseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_purchaseHistoryId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseHistoryId";

-- AlterTable
ALTER TABLE "PurchaseHistory" ADD COLUMN     "purchaseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseHistory" ADD CONSTRAINT "PurchaseHistory_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
