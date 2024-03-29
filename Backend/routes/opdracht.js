const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Post request
router.get('/', async (req, res) => {
    try {
        const opdrachten = await prisma.Opdracht.findMany({
            include: {
                OpdrachtElement: {},
            },
        });
        if (opdrachten) {
            console.log(opdrachten);
            return res.status(200).json(opdrachten);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
