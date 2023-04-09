/*
  Warnings:

  - You are about to drop the column `shopping_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `shopping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_shopping_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping" DROP CONSTRAINT "shopping_user_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "shopping_id",
ADD COLUMN     "buy_id" TEXT;

-- DropTable
DROP TABLE "shopping";

-- CreateTable
CREATE TABLE "buy" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "buy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_buy_id_fkey" FOREIGN KEY ("buy_id") REFERENCES "buy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
