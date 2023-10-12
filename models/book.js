// Importation du module Mongoose, qui est utilisé pour interagir avec la base de données MongoDB
const mongoose = require('mongoose');

// Création d'un schéma Mongoose pour le modèle de données des livres
const Schema = mongoose.Schema;

// Définition du schéma du modèle de données pour les livres
const BookSchema = new Schema({
    title: { type: String, required: true },  // Titre du livre, de type String, requis
    author: { type: String, required: true },  // Auteur du livre, de type String, requis
    pages: { type: Number, required: true },  // Nombre de pages du livre, de type Number, requis
    genre: { type: String, required: true },  // Genre du livre, de type String, requis
    publish: { type: Boolean, required: true },  // Statut de publication du livre, de type Boolean, requis
    user: { type: Schema.ObjectId, ref: 'User' },  // Référence à un utilisateur, utilisé pour la relation entre livres et utilisateurs
}, {timestamps: true});

// Exportation du modèle de données 'Book' qui utilise le schéma 'BookSchema'
module.exports = mongoose.model('Book', BookSchema);
