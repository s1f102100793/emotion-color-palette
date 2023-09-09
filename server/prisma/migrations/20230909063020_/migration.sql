/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iine` on the `Color` table. All the data in the column will be lost.
  - The `id` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `color` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `like` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
DROP COLUMN "iine",
ADD COLUMN     "like" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "color",
ADD COLUMN     "color" TEXT[],
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");
