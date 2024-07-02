-- DropForeignKey
ALTER TABLE "ReplyComment" DROP CONSTRAINT "ReplyComment_commentId_fkey";

-- AddForeignKey
ALTER TABLE "ReplyComment" ADD CONSTRAINT "ReplyComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
