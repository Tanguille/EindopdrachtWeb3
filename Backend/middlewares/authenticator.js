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
            console.log(payload);

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = auth;