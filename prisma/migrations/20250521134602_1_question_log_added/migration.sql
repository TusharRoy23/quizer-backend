-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "department" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "question_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_log_topic" (
    "question_log_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "question_log_topic_pkey" PRIMARY KEY ("question_log_id","topic_id")
);

-- AddForeignKey
ALTER TABLE "question_log" ADD CONSTRAINT "question_log_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_log" ADD CONSTRAINT "question_log_department_fkey" FOREIGN KEY ("department") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_log_topic" ADD CONSTRAINT "question_log_topic_question_log_id_fkey" FOREIGN KEY ("question_log_id") REFERENCES "question_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_log_topic" ADD CONSTRAINT "question_log_topic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
