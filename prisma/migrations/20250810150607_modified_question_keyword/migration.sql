/*
  Warnings:

  - You are about to drop the column `is_main_keyword` on the `question_keyword` table. All the data in the column will be lost.
  - You are about to drop the column `parent_keyword` on the `question_keyword` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_keyword" DROP CONSTRAINT "question_keyword_parent_keyword_fkey";

-- AlterTable
ALTER TABLE "question_keyword" DROP COLUMN "is_main_keyword",
DROP COLUMN "parent_keyword";
