const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Post csv data
router.post('/', async (req, res, next) => {
    try {
        const csvData = res.body;
        console.log("csvData:" + csvData);
        res.status(200).json(csvData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//TODO: Fix

// csvData.forEach(async (row) => {
//     const Student = await prisma.Student.create({
//         data: {
//             id: values[0],
//             name: values[1],
//             gebruikersNaam: values[2],
//             familieNaam: values[3],
//             voorNaam: values[4],
//             email: values[6],
//         },
//     });



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