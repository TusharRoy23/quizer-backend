/*
  Warnings:

  - The `role` column on the `question_discussion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."AgenticRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- AlterTable
ALTER TABLE "public"."question_discussion" DROP COLUMN "role",
ADD COLUMN     "role" "public"."AgenticRole" NOT NULL DEFAULT 'ASSISTANT';
