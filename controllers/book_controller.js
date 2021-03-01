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
router.get('/api/author/:author', (req, res) => {

  axios.get(`http://openlibrary.org/search.json?author=${req.params.author}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

//title
router.get('/api/title/:title', (req, res) => {

  axios.get(`http://openlibrary.org/search.json?title=${req.params.title}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

//subject
router.get('/api/subject/:subject', (req, res) => {
  axios.get(`https://openlibrary.org/subjects/${req.params.subject}`)
    .then(openLib => {
      res.json(openLib.data);
    })
    .catch(console.error);
});

//data
const chartType = '?cht=p3';
const chartData = '&chd=t:30,20,10,40';
// chartData = `&chd=t:${value},${value2},${value3}
const chartSize ='&chs=700x190';
const chartTxt = '&chl=Hi|From|data|api';
//chartTxt =`&chl=${word}|${word2}|${word3}
const chartColor = '&chco=EA469E|03A9F4|FFC00C|FF2027';
const chartURL = 'https://image-charts.com/chart' + chartType + chartData + chartSize + chartTxt + chartColor

const chartEx = 'https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190'

const chartHtml = `
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <img src="${chartEx}" />
  <br>
</body>
</html>`

router.get('/api/chart', async (req, res) => {
  let data = chartEx
  res.append(chartHtml);
  console.log(data)
});

module.exports = router;
