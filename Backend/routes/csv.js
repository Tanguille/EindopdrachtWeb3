const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

//Allows to access request body as object
router.use(express.json());

const prisma = new PrismaClient();

//Post csv data
router.post('/', async (req, res) => {
    try {
        //var zodat ik het uit try block de variabele kan gebruiken
        var csvData = req.body;
        res.status(200).json(csvData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    console.log(csvData);

    // if (csvData[0].includes("Officiële code")) {
    //     console.log("Opdracht");
    //     // csvData.map(element => {
    //     //     const newOpdracht = prisma.Opdracht.create({
    //     //         data: {
    //     //             id: parseInt(element[1].slice(-1), 10),
    //     //             naam: element[0],
    //     //         }
    //     //     });
    //     //     const newOpdrachtElement = prisma.OpdrachtElement.create({
    //     //         data: {
    //     //             beschrijving: element[2],
    //     //             minuten: element[3],
    //     //         }
    //     //     });
    //     // });
    // }


    // csvData.map(element => {
    //     console.log(element);
    //     //     const Student = await prisma.Student.create({
    //     //         data: {
    //     //             id: values[0],
    //     //             name: values[1],
    //     //             gebruikersNaam: values[2],
    //     //             familieNaam: values[3],
    //     //             voorNaam: values[4],
    //     //             email: values[6],
    //     //         },
    // });
});


//     const Group = await prisma.Group.create({
//         data: {
//             groepId: values[10],
//         },
//     });


//     const newOpdracht = await prisma.Opdracht.create({
//         data: {

//             id: parseInt(values[1].slice(-1), 10),
//             naam: values[0],
//         }
//     });

//     const newOpdrachtElement = await prisma.OpdrachtElement.create({
//         data: {
//             beschrijving: values[2],
//             minuten: values[3],
//         }
//     });
// });

module.exports = router;