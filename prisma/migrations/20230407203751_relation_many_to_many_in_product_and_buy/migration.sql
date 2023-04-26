/*
  Warnings:

  - You are about to drop the column `buy_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_buy_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "buy_id";

-- CreateTable
CREATE TABLE "_BuyToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BuyToProduct_AB_unique" ON "_BuyToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_BuyToProduct_B_index" ON "_BuyToProduct"("B");

-- AddForeignKey
ALTER TABLE "_BuyToProduct" ADD CONSTRAINT "_BuyToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "buy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuyToProduct" ADD CONSTRAINT "_BuyToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
