/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'CHOICE', 'VERBAL');

-- DropTable
DROP TABLE "public"."Document";

-- CreateTable
CREATE TABLE "public"."participant" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "google_id" TEXT NOT NULL DEFAULT '0',
    "session_id" VARCHAR,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."topic" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "department" SMALLINT,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "department" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "question_count" INTEGER NOT NULL,
    "participant" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "total_answers" INTEGER NOT NULL DEFAULT 0,
    "total_correct" INTEGER NOT NULL DEFAULT 0,
    "end_time" TIMESTAMPTZ(6),
    "timezone_name" TEXT,
    "timezone_offset" INTEGER DEFAULT 0,
    "generated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "question_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question_log_topic" (
    "question_log_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "question_log_topic_pkey" PRIMARY KEY ("question_log_id","topic_id")
);

-- CreateTable
CREATE TABLE "public"."question_log_question" (
    "id" SERIAL NOT NULL,
    "question_log_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "answer" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "verbal_answer" TEXT,
    "question_type" "public"."QuestionType" NOT NULL DEFAULT 'CHOICE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "selected_answer" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "verbal_response" TEXT,
    "verbal_end_time" TIMESTAMPTZ(6),
    "explanation" TEXT,
    "topic" VARCHAR,
    "sub_topic" VARCHAR,
    "is_verbally_correct" BOOLEAN DEFAULT false,
    "is_verbal" BOOLEAN NOT NULL DEFAULT false,
    "embedding" vector,

    CONSTRAINT "question_log_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question_keyword" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keyword" VARCHAR NOT NULL,
    "question_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "explanation" TEXT,
    "example" TEXT,

    CONSTRAINT "question_keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participant_uuid_key" ON "public"."participant"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "topic_uuid_key" ON "public"."topic"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "public"."user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "question_log_uuid_key" ON "public"."question_log"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "question_log_question_uuid_key" ON "public"."question_log_question"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "question_keyword_uuid_key" ON "public"."question_keyword"("uuid");

-- AddForeignKey
ALTER TABLE "public"."topic" ADD CONSTRAINT "topic_department_fkey" FOREIGN KEY ("department") REFERENCES "public"."department"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."question_log" ADD CONSTRAINT "question_log_department_fkey" FOREIGN KEY ("department") REFERENCES "public"."department"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."question_log" ADD CONSTRAINT "question_log_participant_fkey" FOREIGN KEY ("participant") REFERENCES "public"."participant"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."question_log_topic" ADD CONSTRAINT "question_log_topic_question_log_id_fkey" FOREIGN KEY ("question_log_id") REFERENCES "public"."question_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_log_topic" ADD CONSTRAINT "question_log_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_log_question" ADD CONSTRAINT "question_log_question_question_log_id_fkey" FOREIGN KEY ("question_log_id") REFERENCES "public"."question_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_keyword" ADD CONSTRAINT "question_keyword_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."question_log_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
