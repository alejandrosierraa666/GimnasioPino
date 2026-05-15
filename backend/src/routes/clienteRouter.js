const clienteRouter = require("express").Router();
const clienteController = require("../controllers/clienteController");
const { authenticateCliente } = require("../middlewares/authMiddleware");

clienteRouter.get("/", clienteController.obtenerClientes);
clienteRouter.post("/login", clienteController.loginCliente);
clienteRouter.post("/register", clienteController.registrarCliente);
clienteRouter.post("/logout", clienteController.logout);

clienteRouter.get("/me", authenticateCliente, clienteController.getMe);
module.exports = clienteRouter;