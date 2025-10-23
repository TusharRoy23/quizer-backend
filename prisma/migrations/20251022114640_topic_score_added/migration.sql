-- CreateTable
CREATE TABLE "public"."topic_score" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participant" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "question_log_id" INTEGER NOT NULL,
    "correct_answers" INTEGER NOT NULL DEFAULT 0,
    "total_questions" INTEGER NOT NULL DEFAULT 0,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "topic_score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "topic_score_uuid_key" ON "public"."topic_score"("uuid");

-- AddForeignKey
ALTER TABLE "public"."topic_score" ADD CONSTRAINT "topic_score_question_log_id_fkey" FOREIGN KEY ("question_log_id") REFERENCES "public"."question_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."topic_score" ADD CONSTRAINT "topic_score_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
