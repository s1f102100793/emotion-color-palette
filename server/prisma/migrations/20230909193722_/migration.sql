/*
  Warnings:

  - The `color` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "color",
ADD COLUMN     "color" INTEGER[];
