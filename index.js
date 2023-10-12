require('dotenv').config(); // Permet de charger des variables d'environnement à partir d'un fichier .env
const express = require('express');
const mongoose = require('mongoose'); //Module de gestion de MongoDB
const logger = require('./tools/logger'); //Fichier de configuration de Winston pour les logs
mongoose.connect(process.env.MONGODB_URI); // Connexion à la base de données MongoDB en utilisant l'URI spécifiée dans le fichier .env

//Envoie un message dans la console si la connexion à MongoDB est réussie
mongoose.connection.on('connected', () => {
    console.log("Connecte à MongoDB ");
});

//Import des modèles de données 'book' et 'user'
require('./models/book');
require('./models/user');
//Import des routes pour les modéles 'book' et 'user'
const userRouter = require('./routes/users');
const bookRouteur = require('./routes/books');

//Initialisation de l'application
const app = express();
// Permet de récupérer les données envoyées dans le body de la requête
app.use(express.json());
// Définition des routes pour les modèles 'users' et 'books'
app.use('/users', userRouter);
app.use('/books', bookRouteur);
// Middleware pour logger les requêtes
app.use((req, res, next) => {
    logger.log('info', `${req.method} ${req.path} ${req.ip}`);
    next();
});
// Middleware pour gérer les erreurs 404 (ressource non trouvée)
app.use((req, res) => {
    res.status(404).json({
        message: 'Not found'
    });
});


// Middleware pour gérer les erreurs 500 (erreurs internes du serveur) en production cela évite de révéler des informations sensibles sur les erreurs à des utilisateurs.
app.use((err, req, res, next) => {
    logger.log('error', err);

    if(process.env.NODE_ENV === 'production')
        res.status(500).json({ message: 'Something broke!' });
    else {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
})
// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
    logger.log('info',"Server is running on port 3000");
});