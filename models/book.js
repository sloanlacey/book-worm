// Require ORM
const orm = require('../config/orm.js');

const book = {
  selectAll: function(cb) {
    orm.selectAll('books', (res) => {
      cb(res);
    });
  },

  insertOne: function(cols, vals, cb) {
    orm.insertOne('books', cols, vals, (res) => {
      cb(res);
    });
  },

  updateOne: function(objColVals, condition, cb) {
    orm.updateOne('books', objColVals, condition, (res) => {
      cb(res);
    });
  }
};
// Export burger for use by model
module.exports = book;