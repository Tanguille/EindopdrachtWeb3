const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ message: 'Authorisation problem' });
            }

            console.log("payload:", payload);
            req.user = payload;
        });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = auth;