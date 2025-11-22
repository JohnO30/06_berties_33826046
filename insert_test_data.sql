# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price) VALUES('The Lion, The Witch and the Wardrobe', 20.25),
('One Piece', 25.00);

# Insert test user for marking (username: gold, password: smiths)
INSERT INTO users (username, first_name, last_name, email, hashedPassword) 
VALUES('gold', 'Gold', 'Smiths', 'gold@smiths.ac.uk', '$2b$10$APX5/ePVv.DK4lUC45KkiureqNNf.Upjv7aS9V0vunTpLFdUFYjpG');


-- Users table stores information about registered users.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Login audit table tracks user login attempts.
CREATE TABLE login_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESS', 'FAILURE') NOT NULL,
    message VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE SET NULL
);

-- Books table stores information about the books in the shop.
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    price  DECIMAL(5, 2),
    PRIMARY KEY(id));



CREATE TABLE IF NOT EXISTS login_audit (
    id            INT AUTO_INCREMENT,
    username      VARCHAR(50) NOT NULL,
    login_time    DATETIME DEFAULT CURRENT_TIMESTAMP,
    status        VARCHAR(20) NOT NULL,
    message       VARCHAR(255),
    PRIMARY KEY(id));