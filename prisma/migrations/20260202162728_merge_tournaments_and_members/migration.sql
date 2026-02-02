/*
  Warnings:

  - You are about to drop the column `access_code` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the `room_users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accessCode]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessCode` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_room_id_fkey";

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_user_id_fkey";

-- DropIndex
DROP INDEX "rooms_access_code_key";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "access_code",
ADD COLUMN     "accessCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "room_users";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_accessCode_key" ON "rooms"("accessCode");
