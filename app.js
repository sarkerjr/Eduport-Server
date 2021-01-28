const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const studentRouters = require("./routes/student");
const courseRoutes = require("./routes/course");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.use("/student", studentRouters);
app.use("/course", courseRoutes);

sequelize
    .sync()
    .then((result) => {
        console.log("DATABASE CONNECTED");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
