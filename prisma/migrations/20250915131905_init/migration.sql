-- CreateTable
CREATE TABLE "public"."department" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "uuid" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "department_name_key" ON "public"."department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "department_uuid_key" ON "public"."department"("uuid");
