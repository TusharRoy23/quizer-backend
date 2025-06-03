-- AlterTable
ALTER TABLE "question_log" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_answers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_correct" INTEGER NOT NULL DEFAULT 0;
