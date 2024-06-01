const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password ,name,lastname } = req.body;
        const user = new User({  username, password ,name,lastname,role:'client'});
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !' });
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign(
            { userId: user._id },
            'SECRET_KEY', // Utilisez une clé secrète plus sécurisée et idéalement stockée dans les variables d'environnement
            { expiresIn: '24h' }
        );

        // Ajoutez les informations nécessaires de l'utilisateur dans la réponse
        // Assurez-vous de ne pas renvoyer le mot de passe ou d'autres informations sensibles
        const userForResponse = {
            username: user.username,
            name: user.name,
            role: user.role,
            lastname: user.lastname,
            // autres champs selon les besoins
        };

        res.status(200).json({
            userId: user._id,
            token,
            user: userForResponse // Envoyez ces informations à l'application frontale
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

