-- AlterTable
ALTER TABLE "public"."department" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "participant_id" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."topic" ADD COLUMN     "is_global" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "participant_id" INTEGER DEFAULT 0;
