const express = require("express");
const sequelize = require("./util/database");

//For routes
const studentRouters = require("./routes/student");
const courseRoutes = require("./routes/course");
const resultRouters = require("./routes/result");
const teacherRouters = require("./routes/teacher");
const authRouters = require('./routes/auth');

//For Database Models
const Student = require("./models/Student");
const Course = require("./models/Course");
const Result = require("./models/Result");
const Teacher = require("./models/Teacher");
const StudentProfile = require("./models/StudentProfile");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//For adding headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

//Routes
app.use("/student", studentRouters);
app.use("/course", courseRoutes);
app.use("/result", resultRouters);
app.use("/teacher", teacherRouters);
app.use("/auth", authRouters);

//Database Relations
Student.hasMany(Result, {
    foreignKey: {
        name: "studentId",
        allowNull: false,
    },
});

// Course.hasMany(Result, {
//     foreignKey: {
//         name: "courseId",
//         allowNull: false,
//     },
// });

Course.hasMany(Result);

Result.belongsTo(Course);

Student.hasOne(StudentProfile, {
    foreignKey: {
        name: "studentNo",
        allowNull: false
    }
});

//Starting listning to app
sequelize
    .sync()
    .then((result) => {
        console.log("DATABASE CONNECTED");
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
