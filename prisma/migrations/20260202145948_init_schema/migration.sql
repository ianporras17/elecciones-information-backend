/*
  Warnings:

  - You are about to drop the column `accessCode` on the `rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[access_code]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_code` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'PAUSED');

-- DropIndex
DROP INDEX "rooms_accessCode_key";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "accessCode",
ADD COLUMN     "access_code" VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE "room_users" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "status" "TournamentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_matches" (
    "id" UUID NOT NULL,
    "tournament_id" UUID NOT NULL,
    "option_a" UUID NOT NULL,
    "option_b" UUID NOT NULL,
    "winner" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tournament_matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "room_users_user_id_idx" ON "room_users"("user_id");

-- CreateIndex
CREATE INDEX "room_users_room_id_idx" ON "room_users"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_users_user_id_room_id_key" ON "room_users"("user_id", "room_id");

-- CreateIndex
CREATE INDEX "tournaments_room_id_idx" ON "tournaments"("room_id");

-- CreateIndex
CREATE INDEX "tournaments_topic_id_idx" ON "tournaments"("topic_id");

-- CreateIndex
CREATE INDEX "tournaments_user_id_idx" ON "tournaments"("user_id");

-- CreateIndex
CREATE INDEX "tournament_matches_tournament_id_idx" ON "tournament_matches"("tournament_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_access_code_key" ON "rooms"("access_code");

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
