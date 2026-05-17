const jwt = require('jsonwebtoken');
const Cliente = require("../database/models/Cliente");

const authenticateCliente = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "No estás autenticado" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        console.log("Token decodificado:", decoded);

        const cliente = await Cliente.findOne({ qr_code: decoded.id });

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: "Usuario no existe"
            });
        }

        req.cliente = cliente;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message });
    }
};

module.exports = { authenticateCliente };