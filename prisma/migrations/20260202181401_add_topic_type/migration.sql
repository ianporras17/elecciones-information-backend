-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('HEALTH', 'WORK', 'SECURITY', 'EDUCATION', 'ECONOMY', 'ENVIRONMENT', 'OTHER');

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "topic_type" "TopicType" NOT NULL DEFAULT 'OTHER';
