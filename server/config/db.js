// # MongoDB connection

const Mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose Connected ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);

    }
};

module.exports = ConnectDB;