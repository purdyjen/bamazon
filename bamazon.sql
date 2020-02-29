DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(200) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASICS Men's GEL Venture 5 Running Shoe", "Shoes", 47.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASICS Women's GEL Venture 5 Running Shoe", "Shoes", 51.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson DC65 Animal Upright Vacuum, Purple", "Appliances", 594.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cuisinart Cast Iron Casserole, Mint Green, 5.5 Quart", "Home & Kitchen", 54.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AMICCOM Outdoor Security Camera", "Electronics", 29.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Fragility: Why It's So Hard for White People to Talk About Racism", "Books", 9.67, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kenneth Cole Reaction Keystone 1680d Polyester Dual Compartment 17\" Laptop Business Portfolio, Black", "Luggage & Travel", 51.78, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocketbook Smart Reusable Notebook", "Office Products", 27.20, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gotideal 12 metallic marker pens", "Arts, Crafts, & Sewing", 9.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ARTDOT Diamond Painting Storage Container", "Arts, Crafts, & Sewing", 13.99, 37);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Shoes", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Kitchen", 300);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 400);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 150);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Luggage & Travel", 50);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Office Products", 20);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Arts, Crafts, & Sewing", 100);

ALTER TABLE products
	ADD product_sales DECIMAL(10,2) NULL;