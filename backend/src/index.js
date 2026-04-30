const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./database/db");
const router = require("./routes/router");
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use('/apiolympo/', router);


app.listen(process.env.API_PORT ?? 3000, async () => {
    console.log(`Server running on port ${process.env.API_PORT ?? 3000}`);
    try {
        await sequelize.sync({ force: false });
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});