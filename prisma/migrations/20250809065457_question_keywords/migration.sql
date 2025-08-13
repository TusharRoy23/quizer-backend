-- CreateTable
CREATE TABLE "question_keyword" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keyword" VARCHAR NOT NULL,
    "question_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "explanation" TEXT,
    "parent_keyword" INTEGER,
    "is_main_keyword" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "question_keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_keyword_uuid_key" ON "question_keyword"("uuid");

-- AddForeignKey
ALTER TABLE "question_keyword" ADD CONSTRAINT "question_keyword_parent_keyword_fkey" FOREIGN KEY ("parent_keyword") REFERENCES "question_keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_keyword" ADD CONSTRAINT "question_keyword_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question_log_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
