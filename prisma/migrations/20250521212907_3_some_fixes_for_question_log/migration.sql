/*
  Warnings:

  - You are about to drop the column `user` on the `question_log` table. All the data in the column will be lost.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_log" DROP CONSTRAINT "question_log_user_fkey";

-- AlterTable
ALTER TABLE "question_log" DROP COLUMN "user";

-- DropTable
DROP TABLE "participant";
