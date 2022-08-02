const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DATABASE_HOST,
//         port: process.env.DATABASE_PORT,
//         ssl: true, 
//         dialectOptions: {
//             ssl: { require: true, rejectUnauthorized: false },
//         },
//     }
// );

const sequelize = new Sequelize(
    "deld9f6o4kh8ts",
    "qywvjakumbixkg",
    "2deeeb8774fac76005b899c1aec754dda6c1e7aadd50d553bdccbbf160b6323c",
    {
        dialect: "postgres",
        host: "ec2-3-229-161-70.compute-1.amazonaws.com",
        port: 5432,
        ssl: true,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
        },
    }
);

module.exports = sequelize;
