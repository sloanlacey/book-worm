DROP DATABASE IF EXISTS books_db;

CREATE DATABASE books_db;

-- USE books_db;

-- CREATE TABLE book (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     userid INT,
--     percentread INT,
--     book_name VARCHAR(200),
--     have_read BOOLEAN,
--     apiID VARCHAR(100),
--     FOREIGN KEY (userid) references user(id)
-- );

-- CREATE TABLE user (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(50),
--     password VARCHAR (50),
--     createdAt VARCHAR(50),
--     updatedAT VARCHAR(50)
-- );