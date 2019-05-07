DROP DATABASE IF EXISTS moviePlanner_db;
CREATE DATABASE moviePlanner_db;
USE moviePlanner_db;

CREATE TABLE movies
(
  id INT NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO movies (movie) 
VALUES ('San Andreas'), ('Jumanji'), ('Tooth Fairy');

SELECT * FROM movies;