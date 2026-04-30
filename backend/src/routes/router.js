const router = require("express").Router();
const Cliente = require("../database/models/Cliente.js");
const b = require("bcrypt")

router.get("/", async (req, res) => {
    try {
        const result = await Cliente.findAll();
        return res.json({ message: "Welcome to the Gym API!", data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al consultar la base de datos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await Cliente.findOne({ where: { qr_code: req.params.id } });

        if (!result) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const { nombre, apellidos, email, contrasenna } = req.body;
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
});

router.get("/login/init", async (req, res) => {
    const { email, contrasenna } = req.body;
    try {
        const result = await Cliente.findOne({ where: { email } });

        if (!result) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const isPasswordValid = b.compareSync(contrasenna, result.contrasenna);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;