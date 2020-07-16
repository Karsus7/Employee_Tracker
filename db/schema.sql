DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;
USE employees_db;

-- department:

-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name
CREATE TABLE departments(
    id INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- role:

-- id - INT PRIMARY KEY
-- title - VARCHAR(30) to hold role title
-- salary - DECIMAL to hold role salary
-- department_id - INT to hold reference to department role belongs to
CREATE TABLE roles(
    id INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(10) NOT NULL
);

-- employee:

-- id - INT PRIMARY KEY
-- first_name - VARCHAR(30) to hold employee first name
-- last_name - VARCHAR(30) to hold employee last name
-- role_id - INT to hold reference to role employee has
-- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
CREATE TABLE employees(
    id INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    ROLE_ID INT(10) NOT NULL,
    manager_id INT(10) NULL
);