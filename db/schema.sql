-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name
-- title - VARCHAR(30) to hold role title
-- salary - DECIMAL to hold role salary
-- department_id - INT to hold reference to department role belongs to
-- first_name - VARCHAR(30) to hold employee first name
-- last_name - VARCHAR(30) to hold employee last name
-- role_id - INT to hold reference to role employee has
-- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Eric", "Bundschuh", 1, 2),
    ("Alex", "Carson", 2, NULL),
    ("Will", "Broussard", 3, 4),
    ("Peter", "Parker", 4, NULL),
    ("Barry", "Allen", 5, 6),
    ("Clark", "Kent", 6, NULL),
    ("Diana", "Prince", 7, 8),
    ("Bruce", "Waynre", 8, NULL);

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");
    
INSERT INTO role (title, salary, department_id)
VALUES
    ("Salesperson", 50000, 1),
    ("Sales Lead", 60000, 1),
    ("Engineer", 70000, 2),
    ("Lead Engineer", 80000, 2),
    ("Accountant", 75000, 3),
    ("Account Manager", 95000, 3),
    ("Lawyer", 90000, 4),
    ("Head Lawyer", 100000, 4);