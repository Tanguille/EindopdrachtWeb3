const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Post request
router.post('/', async (req, res) => {
    try {
        const nieuweVraag = await prisma.VraagStudent.create({
            data: {
                beschrijving: req.body.beschrijving,
                rapportId: req.body.rapportId,
            },
        });

        res.status(201).json(nieuweVraag);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


