var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table3");

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

function viewSales() {
  var table = new Table({
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "\n╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      right: "║",
      "right-mid": "╢"
    },
    style: {
      head: [],
      border: []
    }
      ,
    head: ['department_id', 'department_name',
    'over_head_costs', 'product_sales', 'total_profit']
  });

  var query =
    "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, over_head_costs - product_sales AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].department_id,
        res[i].department_name,
        res[i].over_head_costs,
        res[i].product_sales,
        res[i].total_profit
      ]);
    }
    console.log(table.toString());
  });
  supervise();
}

function createDept() {}

function supervise() {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]
      }
    ])
    .then(function(answer) {
      switch (answer.options) {
        case "View Product Sales by Department":
          viewSales();
        case "Create New Department":
          createDept();
        default:
          supervise();
      }
    }); //end then function
} //end supervise function

supervise();
