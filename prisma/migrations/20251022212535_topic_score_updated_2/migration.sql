/*
  Warnings:

  - You are about to drop the column `correct_answers` on the `topic_score` table. All the data in the column will be lost.
  - You are about to drop the column `question_log_id` on the `topic_score` table. All the data in the column will be lost.
  - You are about to drop the column `total_questions` on the `topic_score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."topic_score" DROP CONSTRAINT "topic_score_question_log_id_fkey";

-- AlterTable
ALTER TABLE "public"."topic_score" DROP COLUMN "correct_answers",
DROP COLUMN "question_log_id",
DROP COLUMN "total_questions";
