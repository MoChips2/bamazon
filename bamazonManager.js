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
    managementTasks()
});

function managementTasks() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory (>10 items)",
                "Add to Inventory",
                "Add New Product",
                "Log Off"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory (>10 items)":
                    viewLowInv();
                    break;

                case "Add to Inventory":
                    updateInv();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
                
                case "Log Off":
                    connection.end();
                    break;
            }
        });
}


function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n______________BAMAZON MANAGEMENT_______________")
        console.log("\n-------------- Current Inventory --------------\n")
        console.log(" ID: || Name: || Dept: || Price: || Stock: ||");
        for (let i = 0; i < results.length; i++) {
            var inv = results[i];
            console.log("\n" + " " + inv.item_id + " || " + inv.product_name +
                " || " + inv.department_name + " || " + inv.price +
                " || " + inv.stock_quantity + " || ");
        }
        console.log("\n---------------------------------------------\n")
        managementTasks();
    })
}

// this function will display all items with an inventory count below 10.
// I'm using 10 since this store has higher quantities
function viewLowInv() {
    var query = "SELECT * FROM products WHERE stock_quantity < 10";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.log("\n______________BAMAZON MANAGEMENT_______________")
        console.log("\n------------ Low Inventory Count ------------\n")
        console.log(" ID: || Name: || Dept: || Price: ||");
        for (let i = 0; i < results.length; i++) {
            var inv = results[i];
            console.log("\n" + " " + inv.item_id + " || " + inv.product_name +
                " || " + inv.department_name + " || " + inv.price +
                " || " + inv.stock_quantity + " || ");
        }
        console.log("\n---------------------------------------------\n")
        managementTasks();
    }
    )
}

function updateInv() {

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Let's stock up. For the product you wish to stock, please enter the ID: ",
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
                message: "How many units are you adding?: ",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    console.log(" Please enter a valid number.");
                }
            }
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?",
            [{
                item_id: answer.item
            },
            {
                stock_quantity: answer.quantity
            }],
            function (err, res) {
                if (err) throw err;
                var stockQ = parseInt(res[0].stock_quantity) + parseInt(answer.quantity);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQ
                        },
                        {
                            item_id: answer.item
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("\n-------------------------------------")
                        console.log(answer.quantity + " units added to " + res[0].product_name + "!");
                        console.log("-------------------------------------\n")
                        managementTasks();
                    }
                )
            }
            )
        });
}

function addProduct() {

    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of your new product? ",
                
            },
            {
                name: "dept",
                type: "input",
                message: "What department would you categorize this product? ",
        
            },
            {
                name: "price",
                type: "input",
                message: "How much will you intially sell your product for? ",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    console.log(" Please enter a valid number.");
                }
            },
            {
                name: "stock",
                type: "input",
                message: "What will the intial inventory count be? ",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    console.log(" Please enter a valid number.");
                }
            }
        ])
        .then(function(answer) {

            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.name,
                    department_name: answer.dept,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function(err) {
                    if (err) throw err;
                    console.log("\n-------------------------------------")
                    console.log(answer.stock + " " + answer.name + " added to the inventory!");
                    console.log("-------------------------------------\n")
                    managementTasks();
                }
            )
        })
}