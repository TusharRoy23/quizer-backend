/*
  Warnings:

  - You are about to drop the column `timer_duration` on the `question_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "question_log" DROP COLUMN "timer_duration",
ADD COLUMN     "timezone_name" TEXT,
ADD COLUMN     "timezone_offset" INTEGER DEFAULT 0;
