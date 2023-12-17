/*
  Warnings:

  - You are about to drop the `BuddyList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Buddy" DROP CONSTRAINT "Buddy_buddyListId_fkey";

-- DropForeignKey
ALTER TABLE "BuddyList" DROP CONSTRAINT "BuddyList_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_buddyListsId_fkey";

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "buddyListsId" DROP NOT NULL;

-- DropTable
DROP TABLE "BuddyList";

-- CreateTable
CREATE TABLE "buddy_list" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,
    "buddyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "buddy_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "buddy_list_companyId_idx" ON "buddy_list"("companyId");

-- AddForeignKey
ALTER TABLE "Buddy" ADD CONSTRAINT "Buddy_buddyListId_fkey" FOREIGN KEY ("buddyListId") REFERENCES "buddy_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buddy_list" ADD CONSTRAINT "buddy_list_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_buddyListsId_fkey" FOREIGN KEY ("buddyListsId") REFERENCES "buddy_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
