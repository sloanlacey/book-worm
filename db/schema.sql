DROP DATABASE IF EXISTS books_db;

CREATE DATABASE books_db;

USE books_db;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(200),
    have_read BOOLEAN
);