-- CreateTable
CREATE TABLE "public"."question_discussion" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "role" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "question_discussion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_discussion_uuid_key" ON "public"."question_discussion"("uuid");

-- AddForeignKey
ALTER TABLE "public"."question_discussion" ADD CONSTRAINT "question_discussion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."question_log_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
