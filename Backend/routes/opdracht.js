const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Post request
router.post('/', async (req, res) => {
    try {
        const opdrachten = await prisma.Opdracht.findMany({
            include: {
                OpdrachtElement: true
            }
        });
        if (opdrachten) {
            console.log(opdrachten);
            res.status(200).json(opdrachten);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
