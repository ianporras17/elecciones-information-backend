/*
  Warnings:

  - Added the required column `order` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "topic_contents" (
    "id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "participant_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "topic_contents_topic_id_idx" ON "topic_contents"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_contents_topic_id_participant_id_key" ON "topic_contents"("topic_id", "participant_id");

-- AddForeignKey
ALTER TABLE "topic_contents" ADD CONSTRAINT "topic_contents_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
