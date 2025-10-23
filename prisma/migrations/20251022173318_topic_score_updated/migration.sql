/*
  Warnings:

  - You are about to drop the column `participant` on the `topic_score` table. All the data in the column will be lost.
  - Added the required column `participant_id` to the `topic_score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."topic_score" DROP COLUMN "participant",
ADD COLUMN     "participant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."topic_score" ADD CONSTRAINT "topic_score_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
