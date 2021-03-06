// const db = require(".");
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    haveRead: DataTypes.BOOLEAN,
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User);
  };

  return Book;
};

