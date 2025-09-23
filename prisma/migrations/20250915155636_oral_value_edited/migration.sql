/*
  Warnings:

  - The values [VERBAL] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `is_verbal` on the `question_log_question` table. All the data in the column will be lost.
  - You are about to drop the column `is_verbally_correct` on the `question_log_question` table. All the data in the column will be lost.
  - You are about to drop the column `verbal_answer` on the `question_log_question` table. All the data in the column will be lost.
  - You are about to drop the column `verbal_end_time` on the `question_log_question` table. All the data in the column will be lost.
  - You are about to drop the column `verbal_response` on the `question_log_question` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."QuestionType_new" AS ENUM ('MULTIPLE_CHOICE', 'CHOICE', 'ORAL');
ALTER TABLE "public"."question_log_question" ALTER COLUMN "question_type" DROP DEFAULT;
ALTER TABLE "public"."question_log_question" ALTER COLUMN "question_type" TYPE "public"."QuestionType_new" USING ("question_type"::text::"public"."QuestionType_new");
ALTER TYPE "public"."QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "public"."QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
ALTER TABLE "public"."question_log_question" ALTER COLUMN "question_type" SET DEFAULT 'CHOICE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."question_log" ADD COLUMN     "is_oral" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."question_log_question" DROP COLUMN "is_verbal",
DROP COLUMN "is_verbally_correct",
DROP COLUMN "verbal_answer",
DROP COLUMN "verbal_end_time",
DROP COLUMN "verbal_response",
ADD COLUMN     "is_oral" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_orally_correct" BOOLEAN DEFAULT false,
ADD COLUMN     "oral_answer" TEXT,
ADD COLUMN     "oral_end_time" TIMESTAMPTZ(6),
ADD COLUMN     "oral_response" TEXT;
