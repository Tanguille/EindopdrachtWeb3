-- DropIndex
DROP INDEX "OpdrachtElement_opdrachtId_key";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "pinCode" SET DEFAULT '0000';
