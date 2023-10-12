const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const { checkToken } = require('../tools/jwt');
const BookModel = mongoose.model('Book');

router.use(checkToken)

router.get('/', asyncErrorHandler(async (req, res, next) => {
    res.json(await BookModel.find({}));
}));

router.get('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
        logger.warn(`404 - Book ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'Book not found' });
    } 

    res.json(book);

}));

router.post('/', asyncErrorHandler(async (req, res) => {
    const body = req.body;
    const book = await BookModel.create(body);
    res.json(book);

}));

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