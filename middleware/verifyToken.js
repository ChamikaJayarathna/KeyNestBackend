import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No access token" });
    }

    jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Access token is invalid" });
        }

        req.user = user;
        next();
    });
};

export default verifyToken;
