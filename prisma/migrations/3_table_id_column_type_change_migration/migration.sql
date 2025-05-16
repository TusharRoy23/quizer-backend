-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "uuid" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "department" INTEGER,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "department_name_key" ON "department"("name");

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_department_fkey" FOREIGN KEY ("department") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

