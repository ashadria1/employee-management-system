var inquirer = require("inquirer");
var mysql = require("mysql");
// const mysql = require("mysql");
var connection = require('./connection');

/* * The command-line application should allow users to:
  * View departments, roles, employees
  * Add departments, roles, employees
  * Update employee roles */
  
  const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Add Departments",
    "Add Roles",
    "Add Employees",
    "Update Employee Roles",
    "exit"
]

const employeeOptions = [
    "Thewolf OfWallStreet",
    "Kevin Flynn",
    "Itzhak Stern",
    "Perry Mason",
    "Boss Hogg",
    "Tom Sawyer",
    "Huck Finn",
    "Bilbo Baggins",
    "exit"
];

const updateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "exit"
];

runSearch();

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please choose from the following options:",
            choices: viewOptions
        })
        .then(function (answer) {
/* 
            const viewOptions = [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Departments",
                "Add Roles",
                "Add Employees",
                "exit" */

                switch (answer.action) {
                case viewOptions[0]:
                    departmentView();
                    break;

                case viewOptions[1]:
                    roleView();
                    break;

                case viewOptions[2]:
                    employeeView();
                    break;

                case viewOptions[4]:
                    departmentAdd();
                    break;

                case viewOptions[5]:
                    roleAdd();
                    break;

                case viewOptions[6]:
                    employeeAdd();
                    break;

                case viewOptions[7]:
                    employeeUpdate();
                    break;
        
                case viewOptions[8]:
                    connection.end();
                    break
              }
        })
}

// Viewing functions......................................................

function departmentView() { 
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        runSearch();
    })
}
function employeeView() {
    var sqlStr = "SELECT * FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        runSearch();
    })
}
function roleView() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        runSearch();
    })
}


// Adding functions......................................................

/* 
function departmentAdd() {
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}
function employeeAdd() {
    var sqlStr = "SELECT * FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}
function roleAdd() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
} */

// "Update Employee Roles"................................................................

const employeeUpdate = () => {

    function runUpdateSearch() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which employee would you like to update?",
                choices: employeeOptions
            })
    }
    runUpdateSearch();  
}; 
