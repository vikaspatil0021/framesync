-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL DEFAULT '',
    "msg" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "timeStamp" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
