var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // insert starting function below
    begin();
});


function begin() {
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "Would you like to shop at BAMAZON?",
            choices: ["SHOP", "LOG OFF"]
        }).then(function(answer) {
            if (answer.start === "SHOP") {
                displayInv();
            }
            else {
                connection.end();
            }
        })
}

// displays all inventory (id, name, dept, price, stock)
function displayInv() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n______________WELCOME TO BAMAZON!______________")
        console.log("\n-------------- Current Inventory --------------\n")
        console.log(" ID: | Name: | Dept: | Price: |");
        for (let i = 0; i < results.length; i++) {
            var inv = results[i];
            console.log("\n" + " " + inv.item_id + " | " + inv.product_name +
                " | " + inv.department_name + " | " + inv.price +
                " | ");
        }
        console.log("\n---------------------------------------------\n")

        shop();
    })

}


function shop() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Which item would like to buy? Please enter the Item ID:",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                console.log(" Please enter a valid number.");
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                console.log(" Please enter a valid number.");
            }
        }
    ])
        .then(function (answer) {
            // grab item from database, checking if quantity is sufficient

            connection.query(
                "SELECT * FROM products WHERE ?",
                [{
                    item_id: answer.item
                },
                {
                    stock_quantity: answer.quantity
                }],
                function (err, res) {
                    if (err) throw err;
                    // console.log(res[0].product_name + " " + res[0].stock_quantity);
                    var stockQ = res[0].stock_quantity;
                    if (stockQ >= answer.quantity) {
                        console.log("\n---------------------------------------------")
                        console.log(" " + res[0].product_name + "... we have this in stock!")
                        var newStock = stockQ - answer.quantity;
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newStock
                                },
                                {
                                    item_id: answer.item
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                                var price = res[0].price * answer.quantity;
                                console.log("Your order was successfully placed! Total cost: $" + price)
                                console.log("---------------------------------------------\n")
                                begin();
                            }
                        )
                    } else {
                        console.log(" Sorry, we only have " + stockQ + " of these in stock!");
                        begin();
                    }

                }
                
            )    
        })
}