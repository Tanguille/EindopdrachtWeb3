-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(191) NOT NULL,
    "gebruikersNaam" VARCHAR(191) NOT NULL,
    "familieNaam" VARCHAR(191) NOT NULL,
    "voorNaam" VARCHAR(191) NOT NULL,
    "sorteerNaam" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroepStudent" (
    "groepId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Groep" (
    "id" SERIAL NOT NULL,
    "naam" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "geldig" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Groep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rapport" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL,
    "extraMinuten" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1,
    "studentId" INTEGER NOT NULL,
    "opdrachtElementId" INTEGER NOT NULL,

    CONSTRAINT "Rapport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VraagStudent" (
    "id" SERIAL NOT NULL,
    "beschrijving" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1,
    "rapportId" INTEGER NOT NULL,

    CONSTRAINT "VraagStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpdrachtElement" (
    "id" SERIAL NOT NULL,
    "beschrijving" VARCHAR(191) NOT NULL,
    "minuten" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1,
    "opdrachtId" INTEGER NOT NULL,

    CONSTRAINT "OpdrachtElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opdracht" (
    "id" SERIAL NOT NULL,
    "naam" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "geldig" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Opdracht_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroepStudent_groepId_key" ON "GroepStudent"("groepId");

-- CreateIndex
CREATE UNIQUE INDEX "GroepStudent_studentId_key" ON "GroepStudent"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Rapport_opdrachtElementId_key" ON "Rapport"("opdrachtElementId");

-- CreateIndex
CREATE UNIQUE INDEX "VraagStudent_rapportId_key" ON "VraagStudent"("rapportId");

-- CreateIndex
CREATE UNIQUE INDEX "OpdrachtElement_opdrachtId_key" ON "OpdrachtElement"("opdrachtId");

-- AddForeignKey
ALTER TABLE "GroepStudent" ADD CONSTRAINT "GroepStudent_groepId_fkey" FOREIGN KEY ("groepId") REFERENCES "Groep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroepStudent" ADD CONSTRAINT "GroepStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapport" ADD CONSTRAINT "Rapport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rapport" ADD CONSTRAINT "Rapport_opdrachtElementId_fkey" FOREIGN KEY ("opdrachtElementId") REFERENCES "OpdrachtElement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VraagStudent" ADD CONSTRAINT "VraagStudent_rapportId_fkey" FOREIGN KEY ("rapportId") REFERENCES "Rapport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpdrachtElement" ADD CONSTRAINT "OpdrachtElement_opdrachtId_fkey" FOREIGN KEY ("opdrachtId") REFERENCES "Opdracht"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
