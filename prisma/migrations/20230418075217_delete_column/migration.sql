/*
  Warnings:

  - You are about to drop the column `expires_in` on the `user_refresh_token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_refresh_token" DROP COLUMN "expires_in";
