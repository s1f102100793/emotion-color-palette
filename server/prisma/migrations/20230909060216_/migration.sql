-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "iine" INTEGER NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);
