const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./database/db");
const router = require("./routes/router");
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use('/apiolympo/', router);


app.listen(process.env.API_PORT ?? 3000);