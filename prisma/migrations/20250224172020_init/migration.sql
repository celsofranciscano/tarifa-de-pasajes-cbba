-- CreateTable
CREATE TABLE "tbprivileges" (
    "PK_privilege" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "privilege" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbusers" (
    "PK_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_privilege" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "blockedUntil" DATETIME,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "lastLogin" DATETIME,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbusers_FK_privilege_fkey" FOREIGN KEY ("FK_privilege") REFERENCES "tbprivileges" ("PK_privilege") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbfares" (
    "PK_fare" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbpassenger" (
    "PK_passenger" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_fare" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "CI" TEXT NOT NULL,
    "phone" TEXT,
    "profileImage" TEXT,
    "birthDate" DATETIME NOT NULL,
    "address" TEXT,
    "gender" TEXT NOT NULL,
    "infracciones" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbpassenger_FK_fare_fkey" FOREIGN KEY ("FK_fare") REFERENCES "tbfares" ("PK_fare") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tbstatuscomplaints" (
    "PK_status" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statusName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tbcomplaints" (
    "PK_complaint" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_passenger" INTEGER NOT NULL,
    "FK_status" INTEGER NOT NULL,
    "transportLine" TEXT NOT NULL,
    "vehiclePlate" TEXT NOT NULL,
    "incidentRelation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "correctAmount" REAL NOT NULL,
    "chargedAmount" REAL NOT NULL,
    "image" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "tbcomplaints_FK_passenger_fkey" FOREIGN KEY ("FK_passenger") REFERENCES "tbpassenger" ("PK_passenger") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tbcomplaints_FK_status_fkey" FOREIGN KEY ("FK_status") REFERENCES "tbstatuscomplaints" ("PK_status") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tbprivileges_privilege_key" ON "tbprivileges"("privilege");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_email_key" ON "tbusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbpassenger_email_key" ON "tbpassenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbpassenger_CI_key" ON "tbpassenger"("CI");

-- CreateIndex
CREATE UNIQUE INDEX "tbstatuscomplaints_statusName_key" ON "tbstatuscomplaints"("statusName");
