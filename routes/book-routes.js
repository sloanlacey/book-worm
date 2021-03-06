const axios = require('axios');
const db = require('../models');
// const jsdom = require("jsdom");
// const { sequelize } = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const googleKey = 'AIzaSyDT1yyStTIyISfsmZ0T0AnShc606GKUPAk';

module.exports = (app) => {


  app.get('/api/books', (req, res) => {
    db.Book.findAll({}).then((dbBook) => res.json(dbBook));
  });

  app.post("/api/bookshelf/:book_id", async (req, res) => {
    const user = await db.User.findOne({id: req.user.id});
    console.log('newBook : ', user.bookshelf);
    const oldBookshelf = user.bookshelf == null ? '': user.bookshelf
    const newBookshelf =oldBookshelf + req.params.book_id + ",";
    console.log('new book shelf is: ', newBookshelf);
    await db.User.update({
      ...user,
      bookshelf: newBookshelf
    }, {
      where: {id:req.user.id}
    });
    res.status('204');
    res.end()
  });


// API route to add book to DB
  app.post("/api/bookshelf", (req, res) => {
    console.log("Book Data:", req.body);
    db.Book.create({
      name: req.body.name,
      id: req.user.id
    }).then((results) => res.json(results));
  });

// API route to render books to HTML
app.get("/api/bookshelf", isAuthenticated, function(req, res) {
  db.Book.findAll({
    where: {
      id: req.user.id
    }
  }).then((dbBook) => {
    res.json(dbBook);
  });
});


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

  app.get('/api/chart', (req, res) => {
    axios.get(`https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190`)
      .then(chartData => {
        res.json(chartData.data);
      })
      .catch(console.error);
  });
};