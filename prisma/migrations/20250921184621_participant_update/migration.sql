-- AlterTable
ALTER TABLE "public"."participant" ADD COLUMN     "oral_quiz_restriction_count" INTEGER DEFAULT 2,
ADD COLUMN     "quiz_restriction_count" INTEGER DEFAULT 10;
