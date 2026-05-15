const Cliente = require("../database/models/Cliente");
const b = require("bcrypt");
const { generateAccessToken } = require("../config/auth");
const jwt = require("jsonwebtoken");

//Funcion para realizar el login del cliente
const loginCliente = async (email, contrasenna) => {
    try {
        const result = await Cliente.findOne({
            where: { email }
        });

        if (!result) {
            return { error: "Cliente no encontrado" };
        }

        const isPasswordValid = b.compareSync(contrasenna, result.contrasenna);

        if (!isPasswordValid) {
            return { error: "Usuario o contraseña incorrectos" };
        }

        const cliente = {
            id: result.qr_code,
            email: result.email,
            name: result.nombre,
            rol: result.rol ?? 3
        };

        const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, {
            expiresIn: '3d'
        });

        return {
            token,
            user: cliente,
            success: true
        };

    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};

//Funcion para registrar un nuevo cliente
const registrarCliente = async (nombre, apellidos, email, contrasenna) => {
    //hasheamos la contraseña antes de guardarla en la base de datos
    let hashedPassword = b.hashSync(contrasenna, 10);

    try {
        const result = await Cliente.create({
            nombre,
            apellidos,
            email,
            contrasenna: hashedPassword
        });
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

//Funcion para obtener todos los clientes
const obtenerClientes = async () => {
    try {
        const result = await Cliente.findAll();
        return res.status(200).json({ message: "Todos los clientes de la BD:", data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }
};

//Obtener un cliente por su QR code
const obtenerClientePorQR = async (qr_code) => {
    try {
        const result = await Cliente.findOne({ where: { qr_code: qr_code } });

        if (!result) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Error al consultar la base de datos", detail: error.message });
    }
};

module.exports = {
    loginCliente,
    registrarCliente,
    obtenerClientes,
    obtenerClientePorQR
};