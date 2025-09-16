/*
  Warnings:

  - You are about to drop the column `is_orally_correct` on the `question_log_question` table. All the data in the column will be lost.
  - You are about to drop the column `oral_answer` on the `question_log_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."question_log_question" DROP COLUMN "is_orally_correct",
DROP COLUMN "oral_answer",
ADD COLUMN     "oral_expected_points" TEXT[] DEFAULT ARRAY[]::TEXT[];
