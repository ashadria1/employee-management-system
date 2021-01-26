DROP DATABASE IF EXISTS Employee_Management;

CREATE DATABASE Employee_Management;

USE Employee_Management;

-- Design the following database schema containing three tables:

-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

CREATE TABLE department(
id INTEGER auto_increment NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

-- Add dummy data to the department table...

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Manager");

-- Test department table...

SELECT * FROM department;

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

CREATE TABLE role(
id INTEGER auto_increment NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id),
PRIMARY KEY(id)
);

-- Add dummy data to the role table...

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 55000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 73000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal", 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Gopher", 5000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Flunkie", 5000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 500, 2);

-- Test the role table...

SELECT * FROM role;

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

CREATE TABLE employee(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INTEGER ,
CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id),
PRIMARY KEY(id)
);

-- Add dummy data to employee table...

INSERT INTO employee (first_name, last_name, role_id)
values ("Thewolf", "OfWallStreet", 1); 
INSERT INTO employee (first_name, last_name, role_id)
values ("Kevin", "Flynn", 2);
INSERT INTO employee (first_name, last_name, role_id)
values ("Itzhak", "Stern", 3); 
INSERT INTO employee (first_name, last_name, role_id)
values ("Perry", "Mason", 4);
INSERT INTO employee (first_name, last_name, role_id)
values ("Boss", "Hogg", 5);
INSERT INTO employee (first_name, last_name, role_id)
values ("Tom", "Sawyer", 6);
INSERT INTO employee (first_name, last_name, role_id)
values ("Huck", "Finn", 7);
INSERT INTO employee (first_name, last_name, role_id)
values ("Bilbo", "Baggins", 8);

-- Test employee table...

SELECT * FROM employee;