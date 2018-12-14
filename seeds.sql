USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("TV", "Electronics", 300.00, 100),
	("Cell Phone", "Electronics", 500.00, 50),
	("Boots", "Clothing", 150.00, 40),
	("Jacket", "Clothing", 90.00, 80),
    ("Sweater", "Clothing", 40.00, 150),
    ("Shampoo", "Bath_Body", 5.00, 200),
    ("Deodorant", "Bath_Body", 3.00, 150),
    ("Songs in the Key of Life", "Music", 12.00, 50),
    ("Donut", "Food", 1.00, 13),
    ("Banana", "Food", 1.50, 250),
    ("Coffee", "Food", 15.00, 75),
    ("Advil", "Pharmacy", 4.00, 10),
    ("Vitamins", "Pharmacy", 13.00, 15);
    
    
    SELECT * FROM products;

