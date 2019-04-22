INSERT INTO Top5000 (id, artist, song, year, popscore_world, popscore_usa, popscore_uk, popscore_europe, popscore_other)
VALUES 

LOAD DATA INFILE '../TopSongs.csv' 
INTO TABLE discounts 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

-- this is all junk, you just do it in the gui --