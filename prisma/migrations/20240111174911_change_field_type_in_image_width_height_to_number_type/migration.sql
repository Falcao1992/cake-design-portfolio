/*
  Warnings:

  - You are about to alter the column `height` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `width` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cakeId" TEXT NOT NULL,
    CONSTRAINT "Image_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES "Cake" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("cakeId", "createdAt", "height", "id", "publicId", "secureUrl", "signature", "url", "width") SELECT "cakeId", "createdAt", "height", "id", "publicId", "secureUrl", "signature", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
