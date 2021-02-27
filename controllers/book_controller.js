// Require express and models
const express = require('express');
const axios = require('axios');
const book = require('../models/book.js');
const googleKey = 'AIzaSyDT1yyStTIyISfsmZ0T0AnShc606GKUPAk';


// Create router function
const router = express.Router();
// Home route
router.get('/', (req, res) => {
  book.selectAll(function(data) {
    const hbsObject = {
      books: data
    };
    res.render('index', hbsObject);
  });
});

router.get('/search/:term', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.term}&key=${googleKey}&maxResults=10`)
    .then(googleResponse => {
      res.json(googleResponse.data);
    })
    .catch(console.error);
});

router.get('/book/:id', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${googleKey}`)
    .then(googleResponse => {
      res.json(googleResponse.data);
    })
    .catch(console.error);
});

router.post('/api/books', (req, res) => {
  book.insertOne(['book_name', 'have_read'], [req.body.book_name, req.body.have_read], (result) => {
    res.json({ id: result.insertId });
  });
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
/*router.get('/api/:author', (req, res) => { 
  axios.get(`http://openlibrary.org/search.json?author=${req.params.author}`)
    .then(openLib => {
      res.json(openLib.data);
    }) 
    .catch(console.error);
});

//title
router.get('/api/:title', (req, res) => {
  axios.get(`http://openlibrary.org/search.json?title=${req.params.title}`)
    .then(openLib => {
      res.json(openLib.data);
    }) 
    .catch(console.error);
});

//subject
router.get('/api/:subject', (req, res) => {
  axios.get(`https://openlibrary.org/subjects/${req.params.subject}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});*/

//data
router.get('/a/:subject', (req, res) => {
    axios.get(`https://image-charts.com/chart?chs=700x190&chd=t:60,40&cht=p3&chl=Hello%7CWorld&chan&chf=ps0-0,lg,45,ffeb3b,0.2,f44336,1|ps0-1,lg,45,8bc34a,0.2,009688,1`)
      .then(openLib => {
        res.json(openLib.data);
      })
      .catch(console.error);
  });
module.exports = router;