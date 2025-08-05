-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'CHOICE');

-- CreateTable
CREATE TABLE "question_log_question" (
    "id" SERIAL NOT NULL,
    "question_log_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" INTEGER[],
    "question_type" "QuestionType" NOT NULL DEFAULT 'CHOICE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "question_log_question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_log_question" ADD CONSTRAINT "question_log_question_question_log_id_fkey" FOREIGN KEY ("question_log_id") REFERENCES "question_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;
