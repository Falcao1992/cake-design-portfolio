/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Cake` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Cake` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cake" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cake" ("createdAt", "description", "id", "imageUrl", "title", "userId") SELECT "createdAt", "description", "id", "imageUrl", "title", "userId" FROM "Cake";
DROP TABLE "Cake";
ALTER TABLE "new_Cake" RENAME TO "Cake";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
