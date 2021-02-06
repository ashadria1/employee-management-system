# Using MySQL, node, and inquirer: Employee Tracker

This application aims to create an interface that makes it easy for non-developers to view and interact with information stored in databases.  In this case, the interface could be classified as a **C**ontent **M**anagement **S**ystem.  The challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.  The result is a command-line application that allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

  * Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

  * Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

## Installation Instructions

1.  Clone the repository to your local machine.
2.  Run employee-schema.sql in MySQL Workbench to create and populate tables.
3.  Open a new terminal in VSCode and enter the following commands, pausing between each command until the npm packages completely install:

**npm init -y**

**npm install**

**npm install inquirer**

**npm install mysql**

**node app.js**

## Database Design ##

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Resources

* The URL of the GitHub repository:
https://github.com/ashadria1/employee-management-system

* A video demonstrating the entirety of the app's functionality:
![Employee Management System Demo](Assets/emp-mgt-demo.MP4)
