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
    loginCliente,
    registrarCliente,
    getMe,
    logout
};