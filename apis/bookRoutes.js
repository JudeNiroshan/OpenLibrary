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
    if (err) res.json({name: 'error getting all books'});

    // send the books if success
    res.json(books);
  })
});

// Get a single book by id
router.get('/id/:id', (req, res) => {

  bookModel.find({'_id' : req.params.id}, 'isbn title author', (err, books) => {
    if (err) res.json({result: 'Oops, something went wrong :(', err});

    res.json(books);
  });
});

// Get book by isbn
router.get('/isbn/:isbn', (req, res) => {

  bookModel.find({'isbn' : req.params.isbn}, 'isbn title author', (err, books) => {
    if (err) res.json({result: 'Oops, something went wrong :(', err});

    res.json(books);
  });
});

// Add a book
router.post('/', (req, res) => {

  var param = req.body;

  //New book created using model
  var newBook = new bookModel({
    isbn: param.isbn,
    title: param.title,
    author: param.author
  });

  // Save the new book
  newBook.save(function (err) {
    if (err) res.json({name: 'error adding book'});

    // send book added message
    res.json({name: 'book added'});
  });
});

// Update a book
router.put('/', (req, res) => {
  res.json({name: 'yet to implement'});
});

// Delete a book
router.delete('/:id', (req, res) => {
  res.json({name: 'yet to implement'});
});

//export this router to use in our routes.js
module.exports = router;