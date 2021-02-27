const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/book_controller.js');
const db = require('./models');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});