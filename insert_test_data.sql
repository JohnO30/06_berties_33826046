# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price) VALUES('The Lion, The Witch and the Wardrobe', 20.25),
('One Piece', 25.00);

# Insert test user for marking (username: gold, password: smiths)
INSERT INTO users (username, first_name, last_name, email, hashedPassword) 
VALUES('gold', 'Gold', 'Smiths', 'gold@smiths.ac.uk', '$2b$10$APX5/ePVv.DK4lUC45KkiureqNNf.Upjv7aS9V0vunTpLFdUFYjpG');
