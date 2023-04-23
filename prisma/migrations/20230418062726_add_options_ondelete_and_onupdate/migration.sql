-- DropForeignKey
ALTER TABLE "buy" DROP CONSTRAINT "buy_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_snackBar_id_fkey";

-- DropForeignKey
ALTER TABLE "snackBars" DROP CONSTRAINT "snackBars_user_id_fkey";

-- AddForeignKey
ALTER TABLE "snackBars" ADD CONSTRAINT "snackBars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_snackBar_id_fkey" FOREIGN KEY ("snackBar_id") REFERENCES "snackBars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
