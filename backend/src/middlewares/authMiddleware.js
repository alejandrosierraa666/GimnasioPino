const jwt = require('jsonwebtoken');

const authenticateCliente = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "No estás autenticado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.cliente = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Sesión expirada" });
    }
};

module.exports = { authenticateCliente };