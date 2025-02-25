/*
  Warnings:

  - You are about to drop the column `infracciones` on the `tbpassenger` table. All the data in the column will be lost.
  - Made the column `email` on table `tbpassenger` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `tbpassenger` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbpassenger" (
    "PK_passenger" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_fare" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CI" TEXT,
    "phone" TEXT,
    "profileImage" TEXT,
    "birthDate" DATETIME,
    "address" TEXT,
    "gender" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbpassenger_FK_fare_fkey" FOREIGN KEY ("FK_fare") REFERENCES "tbfares" ("PK_fare") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tbpassenger" ("CI", "FK_fare", "PK_passenger", "address", "birthDate", "createdAt", "email", "firstName", "gender", "lastName", "password", "phone", "profileImage", "status", "updatedAt") SELECT "CI", "FK_fare", "PK_passenger", "address", "birthDate", "createdAt", "email", "firstName", "gender", "lastName", "password", "phone", "profileImage", "status", "updatedAt" FROM "tbpassenger";
DROP TABLE "tbpassenger";
ALTER TABLE "new_tbpassenger" RENAME TO "tbpassenger";
CREATE UNIQUE INDEX "tbpassenger_email_key" ON "tbpassenger"("email");
CREATE UNIQUE INDEX "tbpassenger_CI_key" ON "tbpassenger"("CI");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
