-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CHECKED', 'UNCHECKED');

-- AlterTable
ALTER TABLE "snackBars" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNCHECKED';
