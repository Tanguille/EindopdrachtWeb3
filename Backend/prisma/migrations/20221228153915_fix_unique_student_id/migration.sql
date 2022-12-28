-- DropIndex
DROP INDEX "GroepStudent_studentId_key";

-- AlterTable
ALTER TABLE "GroepStudent" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GroepStudent_pkey" PRIMARY KEY ("id");
