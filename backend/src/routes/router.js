const router = require("express").Router();
const clienteRouter = require("./clienteRouter.js");

router.use("/clientes", clienteRouter);


module.exports = router;