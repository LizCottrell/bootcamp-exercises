-- Created the DB "seinfeld_db" (only works on local connections)
CREATE DATABASE seinfeld_db;
USE seinfeld_db;

-- Created the table "actors" 
CREATE TABLE actors
(
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  coolness_points INT(10),
  attitude varchar(30),
  PRIMARY KEY (id)
);

  -- Inserted a set of records into the table
  INSERT INTO actors (name, coolness_points, attitude)
  VALUES ("Jerry", 10, "cool"), ("Elaine", 20, "sassy"), ("Kramer", 100, "funny"), ("George", 1, "heel");

  SELECT * FROM actors;
