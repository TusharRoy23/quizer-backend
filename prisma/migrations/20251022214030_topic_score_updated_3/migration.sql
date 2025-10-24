/*
  Warnings:

  - A unique constraint covering the columns `[participant_id,topic_id]` on the table `topic_score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "topic_score_participant_id_topic_id_key" ON "public"."topic_score"("participant_id", "topic_id");
