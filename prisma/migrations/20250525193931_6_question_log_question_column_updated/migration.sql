-- AlterTable
ALTER TABLE "question_log_question" ADD COLUMN     "selected_answer" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
