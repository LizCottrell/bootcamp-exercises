DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(30) NOT NULL,
	department_name  VARCHAR(30) NOT NULL,
	price INT(10) NOT NULL,
	stock_quantity INT(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Edith", "animals", 30, 1), 
("Fish", "food", 2, 116), 
("Hat", "clothes", 15, 5), 
("Rat", "animals", 1, 48), 
("Steak", "food", 12, 100), 
("Pants", "clothes", 50, 10), 
("Boots", "clothes", 80, 13), 
("Possum", "animals", 2, 3), 
("Treats", "food", 4, 20), 
("Cheese", "food", 3, 32);