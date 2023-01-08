const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Get request
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const opdracht = await prisma.OpdrachtElement.findMany({
            where: {
                opdrachtId: parseInt(id),
            }
        });

        if (opdracht) return res.status(201).json(opdracht);
        else return res.status(204).json({ message: 'Opdracht niet gevonden' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
});

//Put request
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const opdracht = await prisma.OpdrachtElement.update({
            where: {
                id: parseInt(id),
            },
            data: {
                minuten: req.body.time,
                Rapport: {
                    status: req.body.status,
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

//Put request voor updaten tijd met gemiddelde extra tijd
router.put('/updateExtraTime/:id', async (req, res) => {
    try {
        const id = req.params.id;
        //Get the current value first
        const opdracht = await prisma.OpdrachtElement.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                minuten: true,
            }
        });
        // Add the new value to the current value
        const updatedMinuten = opdracht.minuten + req.body.time;
        // Update the record with the new value
        const updateOpdracht = await prisma.OpdrachtElement.update({
            where: {
                id: parseInt(id),
            },
            data: {
                minuten: updatedMinuten,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
