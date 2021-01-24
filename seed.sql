DROP DATABASE IF EXISTS Employee_Managament;

CREATE DATABASE Employee_Managament;

USE Employee_Managament;

-- Design the following database schema containing three tables:

-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

CREATE TABLE department(
id integer auto_increment not null,
name varchar(30) not null,
primary key(id)
);

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

CREATE TABLE role(
id integer auto_increment not null,
title varchar(30) not null,
salary decimal not null,
department_id Integer not null,
constraint fk_department_id foreign key (department_id) references department(id),
primary key(id)
);

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

CREATE TABLE employee(
id integer auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
constraint fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
manager_id integer ,
constraint fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id),
Primary key(id)
);

-- Test department, role, and employee tables...

select * from employee;
select * from role;
select * from department;

-- Add dummy data to the department table...

INSERT into department (name)
VALUES ("Sales");
INSERT into department (name)
VALUES ("Engineering");
INSERT into department (name)
VALUES ("Finance");
INSERT into department (name)
VALUES ("Legal");
INSERT into department (name)
VALUES ("Manager");

-- Test deparment table...

select * from department;

-- Add dummy data to the role table...

INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 65000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Salesperson", 55000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Lead Engineer", 73000, 2);
INSERT into role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);
INSERT into role (title, salary, department_id)
VALUES ("Legal", 70000, 4);
INSERT into role (title, salary, department_id)
VALUES ("Manager", 75000, 5);
INSERT into role (title, salary, department_id)
VALUES ("Gopher", 5000, 5);
INSERT into role (title, salary, department_id)
VALUES ("Flunkie", 5000, 5);
INSERT into role (title, salary, department_id)
VALUES ("Intern", 500, 2);

-- Test the role table...

select * from role;

-- Add dummy data to employee table...

INSERT into employee (first_name, last_name, role_id)
values ("Thewolf", "OfWallStreet", 1); 
INSERT into employee (first_name, last_name, role_id)
values ("Kevin", "Flynn", 2);
INSERT into employee (first_name, last_name, role_id)
values ("Itzhak", "Stern", 3); 
INSERT into employee (first_name, last_name, role_id)
values ("Perry", "Mason", 4);
INSERT into employee (first_name, last_name, role_id)
values ("Boss", "Hogg", 5);
INSERT into employee (first_name, last_name, role_id)
values ("Tom", "Sawyer", 6);
INSERT into employee (first_name, last_name, role_id)
values ("Huck", "Finn", 7);
INSERT into employee (first_name, last_name, role_id)
values ("Bilbo", "Baggins", 8);

-- Test employee table...

select * from employee;