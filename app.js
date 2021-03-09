const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const studentRouters = require("./routes/student");
const courseRoutes = require("./routes/course");
const resultRouters = require("./routes/result");
const teacherRouters = require("./routes/teacher");

const Student = require("./models/Student");
const Course = require("./models/Course");
const Result = require("./models/Result");
const Teacher = require("./models/Teacher");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

//Routes
app.use("/student", studentRouters);
app.use("/course", courseRoutes);
app.use("/result", resultRouters);
app.use("/teacher", teacherRouters);

//Database Relations
Student.hasMany(Result, {
    foreignKey: {
        name: "studentId",
        allowNull: false,
    },
});

Course.hasMany(Result, {
    foreignKey: {
        name: "courseId",
        allowNull: false,
    },
});

sequelize
    .sync()
    .then((result) => {
        console.log("DATABASE CONNECTED");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
