-- DropForeignKey
ALTER TABLE "Rapport" DROP CONSTRAINT "Rapport_opdrachtElementId_fkey";

-- DropIndex
DROP INDEX "Rapport_opdrachtElementId_key";

-- AlterTable
ALTER TABLE "OpdrachtElement" ADD COLUMN     "rapportId" INTEGER;

-- AddForeignKey
ALTER TABLE "OpdrachtElement" ADD CONSTRAINT "OpdrachtElement_rapportId_fkey" FOREIGN KEY ("rapportId") REFERENCES "Rapport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
