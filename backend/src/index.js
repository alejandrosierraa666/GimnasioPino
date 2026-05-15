const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./database/db");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
require("dotenv").config();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/apiolympo/', router);


app.listen(process.env.API_PORT ?? 3000);