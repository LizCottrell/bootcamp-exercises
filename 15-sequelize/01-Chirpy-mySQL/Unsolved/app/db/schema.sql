DROP DATABASE IF EXISTS chirpy_db;
CREATE DATABASE chirpy_db;
USE chirpy_db;

CREATE TABLE chirps
(
  id INT NOT NULL AUTO_INCREMENT,
  author varchar(255) NOT NULL,
  chirp varchar(255) NOT NULL,
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

SET time_zone = '+00:00';