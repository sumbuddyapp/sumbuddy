/*
  Warnings:

  - You are about to drop the `buddy_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Buddy" DROP CONSTRAINT "Buddy_buddyListId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_buddyListsId_fkey";

-- DropForeignKey
ALTER TABLE "buddy_list" DROP CONSTRAINT "buddy_list_companyId_fkey";

-- DropTable
DROP TABLE "buddy_list";

-- CreateTable
CREATE TABLE "BuddyList" (
    "id" TEXT NOT NULL,
    "filename" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,
    "buddyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BuddyList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BuddyList_companyId_idx" ON "BuddyList"("companyId");

-- AddForeignKey
ALTER TABLE "Buddy" ADD CONSTRAINT "Buddy_buddyListId_fkey" FOREIGN KEY ("buddyListId") REFERENCES "BuddyList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyList" ADD CONSTRAINT "BuddyList_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_buddyListsId_fkey" FOREIGN KEY ("buddyListsId") REFERENCES "BuddyList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
