const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Authorisation problem' });
            }
            req.student = payload;
        });

        next();
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: error.message });
    }
}

module.exports = auth;