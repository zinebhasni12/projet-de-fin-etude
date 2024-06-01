const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect('mongodb+srv://zinebalaoui123go:F5KK3aZTuieoWbTA@zinebshop.cgq20vu.mongodb.net/', () =>
            console.log("Mongo connecté")
        );
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

module.exports = connectDB;