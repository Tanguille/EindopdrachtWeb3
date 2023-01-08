const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Get request
router.get('/', async (req, res) => {
    try {
        console.log(req.student);
        const rapporten = await prisma.Rapport.findMany({
            orderBy: {
                opdrachtElementId: 'asc',
            },
            where: {
                studentId: parseInt(req.student.studentId),
            },
        });
        if (rapporten) return res.status(200).json(rapporten);
        else return res.status(204).json({ message: 'No rapporten found' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

//Post request
router.post('/extraTijd', async (req, res) => {
    try {
        const aggregations = await prisma.Rapport.aggregate({
            _avg: {
                extraMinuten: true,
            },
            where: {
                opdrachtElementId: req.body.opdrachtElementId,
            },
        })
        if (aggregations._avg.extraMinuten) return res.status(200).json(aggregations._avg.extraMinuten);
        else return res.status(200).json(0);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

//Post request
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const bestaandeRapporten = await prisma.Rapport.findMany({
            where: {
                studentId: req.student.studentId,
                opdrachtElementId: req.body.opdrachtElementId,
            },
        });

        if (bestaandeRapporten.length > 0) {
            const rapport = await prisma.Rapport.update({
                where: {
                    id: bestaandeRapporten[0].id,
                },
                data: {
                    status: req.body.status,
                    extraMinuten: req.body.extraMinuten,
                },
            });
            return res.status(200).json(rapport);
        } else {
            const rapport = await prisma.Rapport.create({
                data: {
                    studentId: req.student.studentId,
                    opdrachtElementId: req.body.opdrachtElementId,
                    //Indien geen status gekend gaan we er vanuit dat het op de default value bezig staat, enkel indien status effectief aangepast wordt wordt dit geupdate
                    status: req.body.status || "bezig",
                    extraMinuten: req.body.extraMinuten,
                },
            });
            return res.status(200).json(rapport);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

//Put request to reset aantal extra minuten
router.put('/removeExtraTime/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const opdrachtElement = await prisma.OpdrachtElement.findUnique({
            where: {
                id: id,
            },
        });
        const rapporten = await prisma.Rapport.findMany({
            where: {
                opdrachtElementId: opdrachtElement.id,
            },
        });

        //Voor alle rapporten van dit opdrachtElement de extraMinuten op 0 zetten
        for (let i = 0; i < rapporten.length; i++) {
            const rapport = await prisma.Rapport.update({
                where: {
                    id: rapporten[i].id,
                },
                data: {
                    extraMinuten: parseInt(0),
                },
            });
            return res.status(200).json(rapport);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;