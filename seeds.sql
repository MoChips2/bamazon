USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("TV", "Electronics", 300.00, 20),
	("Cell Phone", "Electronics", 500.00, 5),
	("Boots", "Clothing", 150.00, 10),
	("Jacket", "Clothing", 90.00, 5),
    ("Sweater", "Clothing", 40.00, 12),
    ("Shampoo", "Bath_Body", 5.00, 40),
    ("Deodorant", "Bath_Body", 3.00, 30),
    ("Thriller", "Music", 12.00, 50),
    ("Donut", "Food", 1.00, 12),
    ("Banana", "Food", 1.50, 200),
    ("Coffee", "Food", 15.00, 4),
    ("Advil", "Pharmacy", 4.00, 9),
    ("Vitamins", "Pharmacy", 13.00, 15);
    
    USE bamazon;
    
    SELECT * FROM products;
    
    UPDATE products
    SET stock_quantity = 20
    WHERE item_id = 1;
    
    SELECT * FROM products
    WHERE stock_quantity < 6;
    