const axios = require('axios');
const db = require('../models');
const jsdom = require("jsdom");
const { sequelize } = require('../models');
const googleKey = 'AIzaSyDT1yyStTIyISfsmZ0T0AnShc606GKUPAk';

module.exports = (app) => {

  // app.get('/', async (req, res) => {
  //     const data = await db.Book.findAll()
  //     const hbsObject = {
  //       books: data
  //     };
  //     res.render('members', hbsObject);
  // });

  app.get('/api/books', (req, res) => {
    db.Book.findAll({}).then((dbBook) => res.json(dbBook));
  });

  app.post("/api/bookshelf/:book_id", async (req, res) => {
    const id = req.user.id;
    console.log("add a new book to", id);
    const user = await db.User.findOne({id});
    const newBookshelf = user.bookshelf + req.params.book_id + ",";
    await db.User.update({
      bookshelf: newBookshelf
    }, {
      where: {id:id}
    });
    res.status('204');
    res.end()
  });

  // app.put("/api/books", (req, res) => {
  //   console.log("finish a book");
  //   const id = Number(req.body.id);
  //   db.Book.finish(id, result => {
  //     console.log(result);
  //     res.json(result);
  //   });
  // });


  app.get('/api/search/:term', (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.term}&key=${googleKey}&maxResults=1`)
      .then(googleResponse => {
        res.json(googleResponse.data);
      })
      .catch(console.error);
  });

  app.get('/api/book/:id', (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${googleKey}`)
      .then(googleResponse => {
        res.json(googleResponse.data);
      })
      .catch(console.error);
  });

  // app.post('/api/books', async (req, res) => {
  //   const newBook = await db.Book.create(req.body);
  //   res.json(newBook);
  // });

  // // Route for individual books by their id
  // app.put('/api/books/:id', (req, res) => {
  //   const condition = `id = ${req.params.id}`;

  //   book.updateOne(
  //     {
  //       // eslint-disable-next-line camelcase
  //       have_read: req.body.have_read
  //     },
  //     condition,
  //     (result) => {
  //       if (result.changedRows === 0) {
  //         return res.status(404).end();
  //       }
  //       res.status(200).end();
  //     }
  //   );
  // });

  // open library
  //author
  app.get('/api/author/:author', (req, res) => {

    axios.get(`http://openlibrary.org/search.json?author=${req.params.author}`)
      .then(openLib => {
        res.json(openLib.data);
      })
      .catch(console.error);
  });

  //title
  app.get('/api/title/:title', (req, res) => {

    axios.get(`http://openlibrary.org/search.json?title=${req.params.title}`)
      .then(openLib => {
        res.json(openLib.data);
      })
      .catch(console.error);
  });

  //subject
  app.get('/api/subject/:subject', (req, res) => {
    axios.get(`https://openlibrary.org/subjects/${req.params.subject}`)
      .then(openLib => {
        res.json(openLib.data);
      })
      .catch(console.error);
  });

  //data
  /*const chartType = '?cht=p3';
  const chartData = '&chd=t:30,20,10,40';
  // chartData = `&chd=t:${value},${value2},${value3}
  const chartSize ='&chs=700x190';
  const chartTxt = '&chl=Hi|From|data|api';
  //chartTxt =`&chl=${word}|${word2}|${word3}
  const chartColor = '&chco=EA469E|03A9F4|FFC00C|FF2027';
  const chartURL = 'https://image-charts.com/chart' + chartType + chartData + chartSize + chartTxt + chartColor

  //const chartEx = 'https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190'

  const chart = $('<img>');
  chart.attr("src", chartURL);
  const chartHtml = $("#reading-tracker").appendChild(chart);*/


  app.get('/api/chart', (req, res) => {
    axios.get(`https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190`)
      .then(chartData => {
        res.json(chartData.data);
      })
      .catch(console.error);
  });
};