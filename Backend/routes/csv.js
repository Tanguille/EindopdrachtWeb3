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
    //TODO: Minder hardcoden
    if (csvData[0].Opdracht !== undefined) {
        try {
            for (let i = 0; i < csvData.length; i++) {
                let opdracht = await prisma.Opdracht.findFirst({
                    where: {
                        naam: csvData[i].Opdracht,
                    },
                });

                if (!opdracht) {
                    opdracht = await prisma.Opdracht.create({
                        data: {
                            naam: csvData[i].Opdracht,
                        }
                    });
                }

                if (csvData[i].Opdracht === opdracht.naam && csvData[i].Duurtijd !== undefined) {
                    const newManyOpdrachtElementen = await prisma.OpdrachtElement.createMany({
                        data: {
                            opdrachtId: opdracht.id,
                            beschrijving: csvData[i].Beschrijving,
                            minuten: parseInt(csvData[i].Duurtijd),
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    } else if (csvData[0].Code !== undefined) {
        try {
            for (let i = 0; i < csvData.length; i++) {
                let groep = await prisma.Groep.findFirst({
                    where: {
                        naam: csvData[i].Cursusgroepen,
                    },
                });

                //Zorgen dat er geen groepen zonder aangemaakt kunnen worden.
                if (!groep && csvData[i].Cursusgroepen !== "") {
                    groep = await prisma.Groep.create({
                        data: {
                            naam: csvData[i].Cursusgroepen,
                        }
                    });
                }

                const createStudent = await prisma.Student.create({
                    data: {
                        id: parseInt(csvData[i].Code),
                        gebruikersNaam: csvData[i].Gebruikersnaam,
                        familieNaam: csvData[i].Familienaam,
                        voorNaam: csvData[i].Voornaam,
                        email: csvData[i].Email,
                    },
                });

                //Zorgen dat er geen studenten zonder groep tussen komen
                if (csvData[i].Cursusgroepen !== "") {
                    const studentGroep = await prisma.GroepStudent.create({
                        data: {
                            groepId: groep.id,
                            studentId: createStudent.id,
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;