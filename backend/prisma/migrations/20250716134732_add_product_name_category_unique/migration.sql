/*
  Warnings:

  - A unique constraint covering the columns `[name,categoryId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_name_categoryId_key" ON "products"("name", "categoryId");
