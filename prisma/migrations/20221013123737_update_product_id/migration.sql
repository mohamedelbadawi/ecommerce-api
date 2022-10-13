/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `catItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `catItem_productId_key` ON `catItem`(`productId`);
