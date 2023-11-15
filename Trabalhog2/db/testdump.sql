 CREATE DATABASE livros;
 
 USE livros;

 CREATE TABLE book(
       book_id INT PRIMARY KEY AUTO_INCREMENT, 
       book_name VARCHAR(60), 
       release_year INT,
       book_author VARCHAR(60)
);  
INSERT INTO book(
       book_name, 
       release_year,
       book_author) 
VALUES(
       "O Nome do vento", 
        2007,
        "Patrick Rothfuss"
);
INSERT INTO book(
        book_name, 
       release_year,
       book_author) 
VALUES(
       "Mistborn", 
        2006,
        "Brandon Sanderson"
);