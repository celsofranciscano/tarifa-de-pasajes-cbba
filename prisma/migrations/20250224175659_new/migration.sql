/*
  Warnings:

  - You are about to drop the column `chargedAmount` on the `tbcomplaints` table. All the data in the column will be lost.
  - You are about to drop the column `correctAmount` on the `tbcomplaints` table. All the data in the column will be lost.
  - Added the required column `violations` to the `tbcomplaints` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "tbtransportline" (
    "PK_transport" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "route" TEXT,
    "association" TEXT,
    "representative" TEXT,
    "contactNumber" TEXT,
    "startLocation" TEXT,
    "endLocation" TEXT,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbcomplaints" (
    "PK_complaint" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_passenger" INTEGER NOT NULL,
    "FK_status" INTEGER NOT NULL,
    "FK_transport" INTEGER,
    "transportLine" TEXT NOT NULL,
    "vehiclePlate" TEXT NOT NULL,
    "violations" TEXT NOT NULL,
    "incidentRelation" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbcomplaints_FK_passenger_fkey" FOREIGN KEY ("FK_passenger") REFERENCES "tbpassenger" ("PK_passenger") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbcomplaints_FK_status_fkey" FOREIGN KEY ("FK_status") REFERENCES "tbstatuscomplaints" ("PK_status") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbcomplaints_FK_transport_fkey" FOREIGN KEY ("FK_transport") REFERENCES "tbtransportline" ("PK_transport") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tbcomplaints" ("FK_passenger", "FK_status", "PK_complaint", "createdAt", "description", "image", "incidentRelation", "status", "transportLine", "updatedAt", "vehiclePlate") SELECT "FK_passenger", "FK_status", "PK_complaint", "createdAt", "description", "image", "incidentRelation", "status", "transportLine", "updatedAt", "vehiclePlate" FROM "tbcomplaints";
DROP TABLE "tbcomplaints";
ALTER TABLE "new_tbcomplaints" RENAME TO "tbcomplaints";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
