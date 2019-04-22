DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE Top5000 (
  position INT NOT NULL AUTO_INCREMENT,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  popscore_total DECIMAL(10,4) NULL,
  popscore_usa DECIMAL(10,4) NULL,
  popscore_uk DECIMAL(10,4) NULL,
  popscore_europe DECIMAL(10,4) NULL,
  popscore_other DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM top5000;

