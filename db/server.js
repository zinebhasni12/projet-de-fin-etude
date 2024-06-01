const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model'); // Assurez-vous que le chemin est correct

connectDB();
const createAdminUser = async () => {
    try {
        // Vérifier si l'administrateur existe déjà
        const adminExists = await User.findOne({ username: "admin" });
        if (adminExists) {
            console.log("L'administrateur existe déjà.");
            return;
        }

        // Créer un nouvel administrateur
        const adminUser = new User({
            username: "admin",
            password: "admin123", // Remplacez par un mot de passe sûr
            name: "Admin",
            role: "admin",
            lastname: "User"
        });

        await adminUser.save();
        console.log("Administrateur créé avec succès.");
    } catch (error) {
        console.error("Erreur lors de la création de l'administrateur :", error);
    }
};

mongoose.connection.once('open', () => {
    console.log("Connecté à MongoDB.");
    createAdminUser(); // Appeler la fonction pour créer l'administrateur
});

const app = express();
app.use(cors());

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/api", require("./routes/auth.routes"));
app.use('/api/categories', require("./routes/category.routes"));
app.use('/api/products', require("./routes/product.routes"));
app.use('/uploads', express.static('uploads'));

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port  " + port));