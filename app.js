var inquirer = require("inquirer");
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

showOptions();

function showOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please choose from the following options:",
            choices: viewOptions
        })
        .then(function (answer) {

                switch (answer.action) {
                case viewOptions[0]:
                    viewDepartment();
                    break;

                case viewOptions[1]:
                    viewRole();
                    break;

                case viewOptions[2]:
                    viewEmployee();
                    break;

                case viewOptions[4]:
                    addDepartment();
                    break;

                case viewOptions[5]:
                    addRole();
                    break;

                case viewOptions[6]:
                    addEmployee();
                    break;

                case viewOptions[7]:
                    updateEmployee();
                    break;
        
                case viewOptions[8]:
                    connection.end();
                    break
              }
        })
}

// Viewing functions......................................................

function viewDepartment() { 
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        showOptions();
    })
}

function viewRole() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        showOptions();
    })
}

function viewEmployee() {
    var sqlStr = "SELECT * FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.table(result)
        showOptions();
    })
}


// Adding functions......................................................

function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                showOptions();
            }
        )
    })
  }

function addRole() { 
  connection.query("SELECT role.title AS title, role.salary AS salary, role.department_id AS department_id FROM role",   
  function(err, res) {
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is the role's title?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the role's salary?"
        }, 
        {
          name: "department_id",
          type: "input",
          message: "What is the Department ID?"
        } 
    ]).then(function(res) {
      var query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
              department_id: res.department_id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                showOptions();
            }
        )
    });
  });
  }

function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          showOptions()
      })
  })
}

// "Update Employee Roles"................................................................

function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            showOptions()
        })
    });
  });
}; 
