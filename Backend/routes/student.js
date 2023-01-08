const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET studenten */
router.get('/', async (req, res, next) => {
  try {
    const alleStudenten = await prisma.Student.findMany();
    console.log("studenten:" + alleStudenten);
    return res.status(200).json(alleStudenten);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/* GET student by email. */
router.get('/:email', async (req, res, next) => {
  try {
    const student = await prisma.Student.findUnique({
      where: {
        email: parseInt(req.params.email),
      },
    });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;