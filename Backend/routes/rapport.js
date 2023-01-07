const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Get request
router.get('/', async (req, res) => {
    try {
        const rapporten = await prisma.Rapport.findMany({
            orderBy: {
                opdrachtElementId: 'asc',
            },
            where: {
                studentId: req.student.studentId,
            },
        });
        if (rapporten) {
            res.status(200).json(rapporten);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

//Post request
router.post('/', async (req, res) => {
    try {
        const rapport = await prisma.Rapport.upsert({
            where: {
                opdrachtElementId: req.body.opdrachtElementId,
            },
            update: {
                status: req.body.status,
                extraMinuten: req.body.extraMinuten,
            },
            create: {
                //Indien geen status gekend gaan we er vanuit dat het op de default value bezig staat, enkel indien status effectief aangepast wordt wordt dit geupdate
                status: req.body.status || "bezig",
                extraMinuten: req.body.extraMinuten,
                studentId: req.student.studentId,
                opdrachtElementId: req.body.opdrachtElementId,
            },
        });
        res.status(200).json(rapport);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;