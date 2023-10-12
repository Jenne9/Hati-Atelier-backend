const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncErrorHandler = require('../tools/asyncErrorHandler'); //Importe une fonction pour gérer les erreurs asynchrones.
const { checkToken } = require('../tools/jwt');
const BookModel = mongoose.model('Book');

//Utilise le middleware checkToken pour toutes les routes suivantes, ce qui signifie que ces routes nécessitent une authentification via un token JWT.
router.use(checkToken)

//Gère la requête HTTP GET à la racine de la route. Renvoie tous les livres de la base de données. Si les livres ne sont pas trouvés, renvoie une réponse 404.
router.get('/', asyncErrorHandler(async (req, res, next) => {
    res.json(await BookModel.find({}));
}));

//Gère la requête HTTP GET avec un paramètre id. Renvoie un livre spécifique en fonction de l'ID fourni dans l'URL. Si le livre n'est pas trouvé, renvoie une réponse 404.
router.get('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
        logger.warn(`404 - Book ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'Book not found' });
    } 

    res.json(book);

}));

//Gère la requête HTTP POST. Crée un nouveau livre en utilisant les données fournies dans le corps de la requête.
router.post('/', asyncErrorHandler(async (req, res) => {
    const body = req.body;
    const book = await BookModel.create(body);
    res.json(book);

}));
//Gère la requête HTTP PUT avec un paramètre id. Met à jour un livre spécifique en fonction de l'ID fourni dans l'URL. Si le livre n'est pas trouvé, renvoie une réponse 404.
router.put('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const book = await BookModel.findByIdAndUpdate(id, body);

    if (!book) { 
        logger.warn(`404 - book ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'book not found' });
    };

    res.json(book);
}));

//Gère la requête HTTP DELETE avec un paramètre id. Supprime un livre spécifique en fonction de l'ID fourni dans l'URL. Si le livre n'est pas trouvé, renvoie une réponse 404. Sinon, renvoie un message de confirmation de suppression.
router.delete('/:id', asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const book = await BookModel.findByIdAndDelete(id);

    if (!book) {
        logger.warn(`404 - book ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'book not found' })
    }

    res.json({
        message: 'book deleted successfully',
    });
}));


module.exports = router;