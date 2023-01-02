const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Post request
router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const opdracht = await prisma.Opdracht.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                OpdrachtElement: true,
            }
        });
        if (opdracht) {
            console.log(opdracht);
            res.status(200).json(opdracht);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
