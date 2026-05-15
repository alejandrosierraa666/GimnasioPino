const clienteService = require("../services/clienteService");
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("../config/auth");

const obtenerClientes = async (req, res) => {
    try {
        const result = await clienteService.obtenerClientes();
        if (!result)
            return res.status(404).json({ error: "No se encontraron clientes" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }

    return res.status(200).json(result);
};

const obtenerClientePorQR = async (req, res) => {
    const { qr_code } = req.params;
    try {
        const result = await clienteService.obtenerClientePorQR(qr_code);
        if (!result)
            return res.status(404).json({ error: "Cliente no encontrado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }

    return res.status(200).json(result);
};

const getMe = async (req, res) => {
    try {
        res.json({
            success: true,
            cliente: req.cliente
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener datos" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('authToken');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al cerrar sesión", detail: error.message });
    }
    return res.status(200).json({ success: true, message: "Sesión cerrada exitosamente" });
};

const loginCliente = async (req, res) => {
    const { email, contrasenna } = req.body;

    try {
        const result = await clienteService.loginCliente(email, contrasenna);
        if (!result)
            return res.status(404).json({ error: "Cliente no encontrado" });
        if (result.error) {
            return res.status(result.status || 500).json({ error: result.error });
        }

        // Configurar la cookie httpOnly
        res.cookie('authToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 días
        });

        return res.status(200).json({
            success: true,
            accessToken: result.token,
            user: result.user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    console.log("Cookies recibidas:", req.cookies);                    // ← Debug
    console.log("Refresh Token recibido:", refreshToken ? "SÍ" : "NO");

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No se encontró refresh token en las cookies"
        });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        console.log("✅ Token verificado correctamente");

        const newAccessToken = generateAccessToken({
            id: payload.qr_code,
            email: payload.email,
            name: payload.nombre,
            role: payload.rol
        });

        const newRefreshToken = generateRefreshToken({
            id: payload.qr_code,
            email: payload.email,
            name: payload.nombre,
            role: payload.rol
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,           // false en desarrollo
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        console.error("❌ Error al verificar token:", error.message);

        res.status(403).json({
            success: false,
            message: "Refresh token inválido o expirado",
            error: error.message
        });
    }
};

const registrarCliente = async (req, res) => {
    const { nombre, apellidos, email, contrasenna } = req.body;
    try {
        const result = await clienteService.registrarCliente(nombre, apellidos, email, contrasenna);
        if (result.error) {
            return res.status(result.status || 500).json({ error: result.error });
        }
        return res.status(201).json({ message: "Cliente registrado exitosamente", data: result.qr_code });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }
};

module.exports = {
    obtenerClientes,
    obtenerClientePorQR,
    loginCliente,
    registrarCliente,
    refreshToken,
    getMe,
    logout
};