DROP DATABASE if exists bamazon;
CREATE DATABASE if not exists bamazon;

USE bamazon;

CREATE TABLE if not exists products (
    item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

SELECT * FROM products;