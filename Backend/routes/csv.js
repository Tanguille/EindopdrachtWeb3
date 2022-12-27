const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

//Allows to access request body as object
router.use(express.json());

const prisma = new PrismaClient();

//Post csv data
router.post('/', async (req, res) => {
    let csvData;
    try {
        csvData = req.body;
        res.status(200).json(csvData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    //console.log(csvData[0].Opdracht);

    if (csvData[0].Opdracht !== undefined) {
        csvData.map(async csvOpdracht => {
            const newOpdracht = await prisma.Opdracht.create({
                data: {
                    id: parseInt(csvOpdracht.Titel.slice(-1), 10),
                    naam: csvOpdracht.Opdracht,
                }
            });
            const newOpdrachtElement = await prisma.OpdrachtElement.create({
                data: {
                    beschrijving: csvOpdracht.Beschrijving,
                    minuten: csvOpdracht.Duurtijd,
                }
            });
        });
    } else if (csvData[0].Code !== undefined) {
        //console.log(csvData[0].Code);
        try {

            csvData.map(async csvStudent => {
                const createManyStudents = await prisma.Student.createMany({
                    data: [
                        {
                            id: parseInt(csvStudent.Code),
                            pinCode: '0000',
                            gebruikersNaam: csvStudent.Gebruikersnaam,
                            familieNaam: csvStudent.Familienaam,
                            voorNaam: csvStudent.Voornaam,
                            email: csvStudent.Email,
                        },
                    ],
                    skipDuplicates: true,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;