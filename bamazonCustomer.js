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
});

function displayItems() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    var divider = "\n\n---------------------------------------\n".magenta;
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        
          "Product ID: ".cyan +
          res[i].item_id +
          "\nProduct Name: ".cyan +
          res[i].product_name +
          "\nDepartment Name: ".cyan +
          res[i].department_name +
          "\nPrice: ".cyan +
          res[i].price +
          divider
      );
    }

    chooseItem();
  });
} //end display function

displayItems();

function chooseItem() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "number",
        message: "Enter Product ID Number:"
      },
      {
        name: "quantity",
        type: "number",
        message: "Enter Desired Quantity:"
      }
    ])
    .then(function(answer) {
      var query = "SELECT * FROM products";
      connection.query(query, { product: answer.product }, function(err, res) {
        if (err) throw err;
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id == parseInt(answer.product)) {
            chosenProduct = res[i];
          }
        }

        if (chosenProduct.stock_quantity > parseInt(answer.quantity)) {
          var query = "UPDATE products SET ? WHERE ?";
          connection.query(
            query,
            [
              {
                stock_quantity:
                  chosenProduct.stock_quantity - parseInt(answer.quantity)
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function(error) {
              if (error) throw error;
              var totalPrice = parseInt(answer.quantity) * chosenProduct.price;
              console.log(
                "Thank you for your business! Your total is " +
                  "$" + totalPrice
              );
              var query = "UPDATE products SET ? WHERE ?";
          connection.query(
            query,
            [
              {
                product_sales:
                  chosenProduct.product_sales + totalPrice
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function(error) {
              if (error) throw error;
              var totalPrice = parseInt(answer.quantity) * chosenProduct.price;
              console.log(
                "Thank you for your business! Your total is " +
                  "$" + totalPrice
              );
            }
          );
            }
          );
        } else {
          console.log(
            "Sorry! We don't have enough of that product in stock to fulfill your order."
          );
          
        }
      }); //end connection query
    }); //end then response
} //end chooseItem function
