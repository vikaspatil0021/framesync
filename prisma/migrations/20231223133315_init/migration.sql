/*
  Warnings:

  - A unique constraint covering the columns `[email,teamId]` on the table `invite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invite_email_teamId_key" ON "invite"("email", "teamId");
