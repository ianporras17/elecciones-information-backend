-- AlterTable
ALTER TABLE "tournament_matches" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "candidates" (
    "id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_proposals" (
    "id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "candidates_room_id_idx" ON "candidates"("room_id");

-- CreateIndex
CREATE INDEX "candidate_proposals_topic_id_idx" ON "candidate_proposals"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_proposals_candidate_id_topic_id_key" ON "candidate_proposals"("candidate_id", "topic_id");

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_option_a_fkey" FOREIGN KEY ("option_a") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_option_b_fkey" FOREIGN KEY ("option_b") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_winner_fkey" FOREIGN KEY ("winner") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_proposals" ADD CONSTRAINT "candidate_proposals_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_proposals" ADD CONSTRAINT "candidate_proposals_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
