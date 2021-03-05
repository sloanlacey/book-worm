// // // Require express and models
// const express = require('express');
// const axios = require('axios');
// const db = require('../models');
// const googleKey = 'AIzaSyDT1yyStTIyISfsmZ0T0AnShc606GKUPAk';

// // // Create router function
// const router = express.Router();
//  const apiRoutes = (req, res) => {
// // // Home route

// app.get('/', async (req, res) => {
//     const data = await db.Book.findAll()
//     const hbsObject = {
//       books: data
//      };
//     res.render('members', hbsObject);
// });

// // app.get('/members/api/search/:term', (req, res) => {
// //   axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.term}&key=${googleKey}&maxResults=20`)
// //     .then(googleResponse => {
// //       res.json(googleResponse.data);
// //     })
// //     .catch(console.error);
// // });

// // app.get('/members/api/book/:id', (req, res) => {
// //   axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${googleKey}`)
// //     .then(googleResponse => {
// //       res.json(googleResponse.data);
// //     })
// //     .catch(console.error);
// // });

// // app.post('/members/api/books', async (req, res) => {
// //   const newBook = await db.Book.create(req.body);
// //   res.json(newBook);
// // });
// // // Route for individual burgers by their id
// // app.put('/members/api/books/:id', (req, res) => {
// //   const condition = `id = ${req.params.id}`;

// //   book.updateOne(
// //     {
// //       // eslint-disable-next-line camelcase
// //       have_read: req.body.have_read
// //     },
// //     condition,
// //     (result) => {
// //       if(result.changedRows === 0) {
// //         return res.status(404).end();
// //       }
// //       res.status(200).end();
// //     }
// //   );
// // });

// // // open library
// // //author
// // app.get('/members/api/author/:author', (req, res) => {

// //   axios.get(`http://openlibrary.org/search.json?author=${req.params.author}`)
// //     .then(openLib => {
// //       res.json(openLib.data);
// //     })
// //     .catch(console.error);
// // });

// // //title
// // app.get('/members/api/title/:title', (req, res) => {

// //   axios.get(`http://openlibrary.org/search.json?title=${req.params.title}`)
// //     .then(openLib => {
// //       res.json(openLib.data);
// //     })
// //     .catch(console.error);
// // });

// // //subject
// // app.get('/members/api/subject/:subject', (req, res) => {
// //   axios.get(`https://openlibrary.org/subjects/${req.params.subject}`)
// //     .then(openLib => {
// //       res.json(openLib.data);
// //     })
// //     .catch(console.error);
// // });

// //data
// const chartType = '?cht=p3';
// const chartData = '&chd=t:30,20,10,40';
// // chartData = `&chd=t:${value},${value2},${value3}
// const chartSize ='&chs=700x190';
// const chartTxt = '&chl=Hi|From|data|api';
// //chartTxt =`&chl=${word}|${word2}|${word3}
// const chartColor = '&chco=EA469E|03A9F4|FFC00C|FF2027';
// const chartURL = 'https://image-charts.com/chart' + chartType + chartData + chartSize + chartTxt + chartColor

// //const chartEx = 'https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190'

// const chart = document.createElement("img");
// chart.setAttribute("src", chartURL);
// const chartHtml = document.getElementById("reading-tracker").appendChild(chart);




// router.get('members/api/chart', async (req, res) => {
//   let data = chartURL
//   res.send(chartHtml);
//   console.log(data)
// });

// module.exports = router;
