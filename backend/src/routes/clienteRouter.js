const clienteRouter = require("express").Router();
const clienteController = require("../controllers/clienteController");

clienteRouter.get("/", clienteController.obtenerClientes);
clienteRouter.get("/qr/:qr_code", clienteController.obtenerClientePorQR);
clienteRouter.post("/login", clienteController.loginCliente);
clienteRouter.post("/register", clienteController.registrarCliente);

module.exports = clienteRouter;