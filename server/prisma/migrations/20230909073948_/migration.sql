/*
  Warnings:

  - You are about to drop the column `name` on the `Color` table. All the data in the column will be lost.
  - Added the required column `txet` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "name",
ADD COLUMN     "txet" TEXT NOT NULL;
