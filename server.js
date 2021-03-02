const express = require('express');
const session = require('express-session');
// const routes = require('./controllers/book_controller.js');
const passport = require('./config/passport');

const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);
require('./routes/book-routes.js')(app);

// app.use(routes);
// require('./controllers/book_controller.js')(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});