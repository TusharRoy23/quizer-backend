/*
  Warnings:

  - Added the required column `participant` to the `question_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_log" ADD COLUMN     "participant" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "participant" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_log" ADD CONSTRAINT "question_log_participant_fkey" FOREIGN KEY ("participant") REFERENCES "participant"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
