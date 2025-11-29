-- Create database script for Berties Books

-- Create the database
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    price DECIMAL(5, 2),
    PRIMARY KEY (id)
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Create the login audit table (LAB 8 COMPLIANT)
CREATE TABLE IF NOT EXISTS login_audit (
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    message VARCHAR(255),
    PRIMARY KEY (id)
);
