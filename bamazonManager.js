var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "passw0rd",
    database: "bamazon_db",
    insecureAuth: true
  }); //end connection var

function displayAllItems() {
    // console.log("Display all items.")
    var query = "SELECT * FROM products";
  
    connection.query(query, function(err, res) {
      var divider = "\n\n---------------------------------------\n".magenta;
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(
          
            "\nProduct ID: ".cyan +
            res[i].item_id +
            "\nProduct Name: ".cyan +
            res[i].product_name +
            "\nDepartment Name: ".cyan +
            res[i].department_name +
            "\nPrice: ".cyan +
            res[i].price +
            "\nQuantity: ".cyan +
            res[i].stock_quantity +
            divider
        );
      }
      manage();
    });

  } //end display function
  
  function displayLowInv() {
    //   console.log("Low Inventory");
    var query = "SELECT * FROM products";
  
    connection.query(query, function(err, res) {
      var divider = "\n\n---------------------------------------\n".magenta;
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 5) {
        console.log(
          "\nLOW INVENTORY:\n\n".red.underline +
            "Product ID: ".cyan +
            res[i].item_id +
            "\nProduct Name: ".cyan +
            res[i].product_name +
            "\nDepartment Name: ".cyan +
            res[i].department_name +
            "\nPrice: ".cyan +
            res[i].price +
            "\nQuantity: ".red +
            colors.red(res[i].stock_quantity) +
            divider
        );
      }
    }
    });
    manage();
  } //end display function

  function addInv() {
    //   console.log("Add Inventory.");
    inquirer
    .prompt([
        {
            name: "select",
            message: "Enter Product ID Number:",
            type: "number"
        },
        {
            name: "quantity",
            type: "number",
            message: "Enter Desired Quantity:"
          }
    ])
    .then(function(answer){
        var query = "SELECT * FROM products";
        connection.query(query, { product: answer.select }, function(err, res) {
          if (err) throw err;
          var selection;
          for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == parseInt(answer.select)) {
              selection = res[i];
            }
          }

          var query = "UPDATE products SET ? WHERE ?";
          connection.query(
            query,
            [
              {
                stock_quantity:
                  selection.stock_quantity + parseInt(answer.quantity)
              },
              {
                item_id: selection.item_id
              }
            ],
            function(error) {
                if (error) throw error;
                console.log(
                  "Successfully added inventory. The new stock quantity is " +
                      selection.stock_quantity + "."
                );
              }
          );
    }); //end query
    manage();
  }); //end then
}

  function addProduct() {
    // console.log("Add new product");
    inquirer
    .prompt([
        {
            name: "name",
            message: "Enter Product Name:",
            type: "input"
        },
        {
            name: "department",
            message: "Enter Department Name:",
            type: "input"
        },
        {
            name: "price",
            message: "Enter Product Price:",
            type: "number"
        },
        {
            name: "quantity",
            message: "Enter Product Quantity:",
            type: "number"
        }
    ])
    .then(function(answer){
        var query = connection.query(
            "INSERT INTO products SET ?",
              {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
              },
              function(error) {
                if (error) throw error;
                console.log(
                  "Successfully added Product.".green.underline
                );
              }
        ); //end query
        manage();
    }); //end then
    
  }
  function manage(){
      inquirer
      .prompt([
          {
              name: "options",
              choices: ["View Products for Sale", "View Low Inventory", new inquirer.Separator(),
            "Add to Inventory", "Add New Product"],
              type: "list"
          }
      ]).then(function(answer) {
        switch(answer.options) {
            case "View Products for Sale":
                displayAllItems();
                break;
            case "View Low Inventory":
                displayLowInv();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                manage();
        }
      }); 
  } //end manage function

  manage();