/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `question_log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `question_log_question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "department_uuid_key" ON "department"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "participant_uuid_key" ON "participant"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "question_log_uuid_key" ON "question_log"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "question_log_question_uuid_key" ON "question_log_question"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "topic_uuid_key" ON "topic"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");
