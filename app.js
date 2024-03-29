const express = require("express");
const fs = require("fs");
const path = require("path");

const sequelize = require("./util/database");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

//For routes
const studentRouters = require("./routes/student");
const courseRoutes = require("./routes/course");
const resultRouters = require("./routes/result");
const facultyRouters = require("./routes/faculty");
const authRouters = require("./routes/auth");
const userRouters = require("./routes/user");
const routineRouters = require("./routes/routine");
const eventRouters = require("./routes/event");

//For Database Models
const Student = require("./models/Student");
const StudentDetail = require("./models/StudentDetail");
const Course = require("./models/Course");
const Faculty = require("./models/Faculty");
const FacultyDetails = require("./models/FacultyDetail");
const CourseAssignedTo = require("./models/CourseAssignedTo");
const Routine = require("./models/Routine");
const Result = require("./models/Result");
const ResultDetail = require("./models/ResultDetail");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//Using a fs to use it with morgan logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

//For adding various useful headers to the response
app.use(helmet());
// For compressing files
app.use(compression());
// For logging the requests properly
app.use(morgan("combined", { stream: accessLogStream }));

//For adding headers
app.use((_req, res, next) => {
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
app.use("/user", userRouters);
app.use("/student", studentRouters);
app.use("/course", courseRoutes);
app.use("/result", resultRouters);
app.use("/faculty", facultyRouters);
app.use("/auth", authRouters);
app.use("/routine", routineRouters);
app.use("/event", eventRouters);

//Database Relations
Student.hasOne(StudentDetail, { foreignKey: "studentId" });
Student.hasMany(Result, { foreignKey: "studentId" });
Faculty.hasOne(FacultyDetails, { foreignKey: "facultyId" });
Course.hasMany(Result, { foreignKey: "courseId" });
Result.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(CourseAssignedTo, { foreignKey: "courseId" });
Faculty.hasMany(CourseAssignedTo, { foreignKey: "facultyId" });
CourseAssignedTo.belongsTo(Course, { foreignKey: "courseId" });
CourseAssignedTo.belongsTo(Faculty, { foreignKey: "facultyId" });
CourseAssignedTo.hasMany(Routine, { foreignKey: "assignedCourseId" });
Routine.belongsTo(CourseAssignedTo, { foreignKey: "assignedCourseId" });
Result.hasOne(ResultDetail, { foreignKey: "resultId" });

//Start listning to app
sequelize
    .sync()
    .then(() => {
        console.log("DATABASE CONNECTED");
        app.listen(process.env.PORT || 8080);
    })
    .catch((err) => {
        console.log(err);
    });
