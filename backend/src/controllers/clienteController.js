const clienteService = require("../services/clienteService");

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

const loginCliente = async (req, res) => {
    const { email, contrasenna } = req.body;
    try {
        const result = await clienteService.loginCliente(email, contrasenna);
        if (!result)
            return res.status(404).json({ error: "Cliente no encontrado" });
        if (result.error) {
            return res.status(result.status || 500).json({ error: result.error });
        }

        return res.status(200).json(result);
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
    obtenerClientePorQR,
    loginCliente,
    registrarCliente
};