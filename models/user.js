// Importation du module Mongoose, qui est utilisé pour interagir avec la base de données MongoDB
const mongoose = require('mongoose');
const book = require('./book');

// Création d'un schéma Mongoose pour le modèle de données des utilisateurs
const Schema = mongoose.Schema;

// Définition du schéma du modèle de données pour les utilisateurs
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },  // Nom d'utilisateur, de type String, requis, et unique
    password: { type: String, required: true },  // Mot de passe, de type String, requis
    role: {
        type: String,
        enum: ['user', 'admin'],
        
    },  // Rôle de l'utilisateur, de type String, avec une valeur parmi 'user' ou 'admin', la valeur par défaut étant 'user'
}, {
    timestamps: true // Ajout automatique des horodatages createdAt updatedAt.
});



// Exportation du modèle de données 'User' qui utilise le schéma 'userSchema'
module.exports = mongoose.model('User', userSchema);
