/*
  Warnings:

  - Added the required column `question_count` to the `question_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_log" ADD COLUMN     "question_count" INTEGER NOT NULL;
