CREATE DATABASE playlist_db;

USE playlist_db;

CREATE TABLE songs (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50),
	artist VARCHAR(50),
	genre VARCHAR(50)
);

INSERT INTO songs (title, artist, genre)
VALUES ("Smells Like Teen Spirit", "Nirvana", "Alternative"), 
("Walkin After Midnight", "Patsy Cline", "Country"),  
("Ring of Fire", "Johnny Cash", "Country"),  
("Poppies", "Marcy's Playground", "Alternative"),  
("I'm Every Woman", "Chaka Khan", "Disco"), 
('I Will Always Love You', 'Whitney Houston', 'R&B'), 
('Goodbye Horses', 'Q Lazzarus', '80s'), 
('Fast Car', 'Tracy Chapman', 'Alternative'), 
('Just a Little Respect', 'Erasure', '80s'), 
('Once in a Lifetime', 'Talking Heads', '80s'), 
('Who is Johnny', 'Debarge', '80s');

SELECT * FROM songs;