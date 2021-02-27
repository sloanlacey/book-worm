// Require express and models
const express = require('express');
const axios = require('axios');
const db = require('../models');
const googleKey = 'AIzaSyDT1yyStTIyISfsmZ0T0AnShc606GKUPAk';

// Create router function
const router = express.Router();
// Home route

router.get('/', async (req, res) => {
    const data = await db.Book.findAll()
    const hbsObject = {
      books: data
    };
    res.render('index', hbsObject);
});

router.get('/api/search/:term', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.term}&key=${googleKey}&maxResults=10`)
    .then(googleResponse => {
      res.json(googleResponse.data);
    })
    .catch(console.error);
});

router.get('/api/book/:id', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${googleKey}`)
    .then(googleResponse => {
      res.json(googleResponse.data);
    })
    .catch(console.error);
});

router.post('/api/books', async (req, res) => {
  const newBook = await db.Book.create(req.body);
  res.json(newBook);
});
// Route for individual burgers by their id
router.put('/api/books/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  book.updateOne(
    {
      // eslint-disable-next-line camelcase
      have_read: req.body.have_read
    },
    condition,
    (result) => {
      if(result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// open library
//author
router.get('/a/:author', (req, res) => {

  axios.get(`http://openlibrary.org/search.json?author=${req.params.author}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

//title
router.get('/a/:title', (req, res) => {

  axios.get(`http://openlibrary.org/search.json?title=${req.params.title}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

//subject
router.get('/a/:subject', (req, res) => {
  axios.get(`https://openlibrary.org/subjects/${req.params.subject}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

module.exports = router;