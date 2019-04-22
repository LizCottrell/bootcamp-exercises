CREATE DATABASE popquiz_db;

USE popquiz_db;

CREATE TABLE people
(
  id INT NOT NULL
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
  (45) NULL,
  favfood VARCHAR
  (45) NULL,
  nickname VARCHAR
  (45) NULL
);

  INSERT INTO people
    (name, favfood, nickname)
  VALUES
    ("Edith", "Fish", "Peppercorn"),
    ("Scott", "Starbursts", "Scoot"),
    ("Eliza", "Meat", "Turbo");

  SELECT *
  FROM people;