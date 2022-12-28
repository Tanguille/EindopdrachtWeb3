const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

//POST route maken voor login
router.post('/', async (req, res) => {
    try {
        const { email, pinCode } = req.body;
        const student = await prisma.Student.findFirst({
            where: {
                email: email.toLowerCase(),
                pinCode: pinCode
            }
        });

        const token = jwt.sign({
            studentId: student.studentId
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '4h' },
        );

        console.log("token:", token)
        console.log("student:", student);

        if (student) {
            res.cookie('token', token, { path: '/', httpOnly: true, withCredentials: true, sameSite: 'none', secure: true });
            res.status(200).json(student);
        } else {
            res.send('Email of wachtwoord is onjuist');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;