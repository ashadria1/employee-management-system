var inquirer = require("inquirer");
var connection = require("./connection");

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
  "exit",
];

const employeeOptions = [
  "Thewolf OfWallStreet",
  "Kevin Flynn",
  "Itzhak Stern",
  "Perry Mason",
  "Boss Hogg",
  "Tom Sawyer",
  "Huck Finn",
  "Bilbo Baggins",
  "exit",
];

const updateOptions = ["First Name", "Last Name", "Role", "exit"];

showOptions();

function showOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please choose from the following options:",
      choices: viewOptions,
    })
    .then(function (answer) {
      switch (answer.action) {
        case viewOptions[0]:
          viewDepartments();
          break;

        case viewOptions[1]:
          viewRoles();
          break;

        case viewOptions[2]:
          viewEmployees();
          break;

        case viewOptions[3]:
          addDepartments();
          break;

        case viewOptions[4]:
          addRoles();
          break;

        case viewOptions[5]:
          addEmployees();
          break;

        case viewOptions[6]:
          updateEmployees();
          break;

        case viewOptions[7]:
          connection.end();
          break;
      }
    });
}

// Viewing functions......................................................

function viewDepartments() {
  var sqlStr = "SELECT * FROM department";
  connection.query(sqlStr, function (err, result) {
    if (err) throw err;
    console.table(result);
    showOptions();
  });
}

function viewRoles() {
  var sqlStr = "SELECT * FROM role";
  connection.query(sqlStr, function (err, result) {
    if (err) throw err;
    console.table(result);
    showOptions();
  });
}

function viewEmployees() {
  var sqlStr = "SELECT * FROM employee ";
  sqlStr += "LEFT JOIN role ";
  sqlStr += "ON employee.role_id = role.id";
  connection.query(sqlStr, function (err, result) {
    if (err) throw err;
    console.table(result);
    showOptions();
  });
}

// Adding functions......................................................

//Add Departments ........................

function addDepartments() {
  connection.query(
    "SELECT department.id AS department_id, department.name AS department_name FROM department",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "name",
            type: "input",
            message:
              "What is the name of the department you would like to add?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              showOptions();
            }
          );
        });
    }
  );
}

//Add Roles ........................

function addRoles() {
  connection.query(
    "SELECT role.title AS title, role.salary AS salary, role.department_id AS department_id FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the new role's title?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the new role's salary?",
          },
          {
            name: "department_id",
            type: "input",
            message: "What is the new role's Department ID?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
              department_id: res.department_id,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              showOptions();
            }
          );
        });
    }
  );
}

//Add Employees ........................

function addEmployees() {
  connection.query(
    "SELECT employee.first_name AS first_name, employee.last_name AS last_name, employee.role_id AS role_id, employee.manager_id AS manager_id FROM employee",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "Enter the new employee's first name: ",
          },
          {
            name: "last_name",
            type: "input",
            message: "Enter the new employee's last name: ",
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the new employee's role ID? ",
          },
          {
            name: "manager_id",
            type: "input",
            message: "What is the new employee's manager ID? ",
          },
        ])

        .then(function (res) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: res.first_name,
              last_name: res.last_name,
              role_id: res.role_id,
              manager_id: res.manager_id,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              showOptions();
            }
          );
        });
    }
  );
}

// Update Employee Roles ................................................................

function updateEmployees() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "last_name",
            type: "input",
            message:
              "Enter the last name of the employee you would like to update: ",
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the employee's new role ID? ",
          },
        ])

        .then(function (res) {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE last_name = ?",
            [res.role_id, res.last_name],

            function (err) {
              if (err) throw err;
              console.table(res);
              showOptions();
            }
          );
        });
    }
  );
}
