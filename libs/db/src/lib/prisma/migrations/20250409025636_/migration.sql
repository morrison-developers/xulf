/*
  Warnings:

  - You are about to drop the column `token` on the `Invite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invite_token_key";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "token",
ADD COLUMN     "invitedBy" TEXT,
ADD COLUMN     "orgId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");
