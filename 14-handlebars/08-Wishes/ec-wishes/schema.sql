DROP DATABASE IF EXISTS wishes_db;
CREATE DATABASE wishes_db;
USE wishes_db;

CREATE TABLE wishes
(
  id INT NOT NULL AUTO_INCREMENT,
  wish varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO wishes (wish) 
VALUES ('Fish.'), ('Treats.'), ('Walkies.');

SELECT * FROM wishes;