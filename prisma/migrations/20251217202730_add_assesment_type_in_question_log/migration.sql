-- CreateEnum
CREATE TYPE "public"."AssessmentType" AS ENUM ('GENERAL_INTELLIGENCE', 'KNOWLEDGE_ASSESSMENT');

-- AlterTable
ALTER TABLE "public"."question_log" ADD COLUMN     "assessment_type" "public"."AssessmentType" NOT NULL DEFAULT 'KNOWLEDGE_ASSESSMENT';
