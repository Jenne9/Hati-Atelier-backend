const express = require('express');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { getToken, checkToken } = require('../tools/jwt');
const router = express.Router();
const UserModel = mongoose.model('User');


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hache le mot de passe avec bcrypt
    let hashPassword = await bcrypt.hash(password, 10);
    // Crée un nouvel utilisateur avec le nom d'utilisateur et le mot de passe haché.
    const user = await UserModel.create({
        username,
        password: hashPassword
    });

    if(user) {
        res.json(user); // Affiche l'utilisateur créé.
    } else {
        res.json('error'); // Affiche une erreur en cas d'echec.
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Recherche l'utilisateur dans la base de données par son nom.
    const user = await UserModel.findOne({ username });
    if(!user) {
        res.status(401).json('Username or Password does not match')
    } else {
        // Vérifie si le mot de passe fourni correspond au mot de passe haché de l'utilisateur.
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            res.status(401).json('Username or Password does not match');
        } else {
            // Génère un token JWT en fonction des informations de l'utilisateur.
            const token = getToken(user);
            res.json({
                token
            });
        }
    }
});

router.get('/profile', checkToken, async (req, res) => {
    if(req.decoded) {
        // Récupère le profil de l'utilisateur en fonction de l'ID décodé depuis le token.
        const user = await UserModel.findById(req.decoded._id);
        res.json(user); // Affiche les données de l'utilisateur.
    } else {
        throw new Error('Unexpected Error'); // Affiche une erreur en cas d'echec.
    }
});


module.exports = router; 