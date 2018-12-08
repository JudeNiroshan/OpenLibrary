/**
 * All books related routes are defined and attached to express.Router() instance
 */
'use strict';

var express = require('express');
var bookModel = require('./models/book.model');// Import our BookModel
var bodyParser = require('body-parser');
var router = express.Router();
var tokenVerifier = require('./tokenVerifier');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Get all books
router.get('/', tokenVerifier.verifyUser, (req, res) => {

  // Find all books using our BookModel
  bookModel.find(function (err, books) {
    if (err) res.json({ name: 'error getting all books' });

    // send the books if success
    res.json(books);
  })
});

// Get a single book by id
router.get('/id/:id', tokenVerifier.verifyUser, (req, res) => {

  bookModel.find({ '_id': req.params.id }, 'isbn title author', (err, books) => {
    if (err) res.json({ result: 'Oops, something went wrong :(', err });

    res.json(books);
  });
});

// Get book by isbn
router.get('/isbn/:isbn', tokenVerifier.verifyUser, (req, res) => {

  bookModel.find({ 'isbn': req.params.isbn }, 'isbn title author', (err, books) => {
    if (err) res.json({ result: 'Oops, something went wrong :(', err });

    res.json(books);
  });
});

// Add a book
router.post('/', tokenVerifier.verifyAdmin, (req, res) => {

  var param = req.body;

  if (!param.isbn) return res.status(400).json({ 'message': 'isbn number missing' });
  if (!param.title) return res.status(400).json({ 'message': 'Book Title missing' });
  if (!param.description) return res.status(400).json({ 'message': 'Book Description missing' });
  if (!param.author) return res.status(400).json({ 'message': 'Book Author missing' });
  if (!param.quantity) return res.status(400).json({ 'message': 'Book quantity missing' });

  //New book created using model
  var newBook = new bookModel({
    isbn: param.isbn,
    title: param.title,
    description: param.description,
    author: param.author,
    quantity: param.quantity
  });

  // Save the new book
  newBook.save(function (err) {
    if (err) res.json({ name: 'error adding book', 'err': err });

    // send book added message
    res.json({ name: 'book added' });
  });
});

// Update a book
router.put('/', tokenVerifier.verifyAdmin, (req, res) => {
  res.json({ name: 'yet to implement' });
});

// Delete a book
router.delete('/:id', tokenVerifier.verifyAdmin, (req, res) => {
  var bookIdToDelete = req.params.id;
  if (!bookIdToDelete) return res.status(400).json({ 'message': 'Book id missing' });

  bookModel.findByIdAndDelete(bookIdToDelete, (err, deletedBook) => {
    if (err) return res.status(500).json(err);

    if (deletedBook) return res.json({ 'message': 'Book deleted' });

    return res.status(404).json({ 'message': 'Book not found' });
  });
});

//export this router to use in our routes.js
module.exports = router;