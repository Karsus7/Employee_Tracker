const connection = require("./connection");

// SELECT refers to which information is being moved
// FROM refers to where the information from SELECT is being drawn from
// CONCAT adds multiple expressions together, giving all information from a given row or column
// In this case, CONCAT is adding the first and last names of employees together
// AS serves to effectively rename something
// LEFT JOIN and RIGHT JOIN 
// More on SQL JOINS at: https://www.w3schools.com/sql/sql_join.asp

// Query to view all employees
function viewEmployees() {
    return connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, 
    department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role_id = role.id
    LEFT JOIN department ON department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    );
}

// Query to view employees by department
function viewByDepartment(department) {
    return connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, 
    department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON role_id = role.id
    LEFT JOIN department ON department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    + " WHERE department.name = ?", [department]);
}

// Query to view employee by manager
function viewAllByManager(first_name, last_name) {
    return connection.query(
    `SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id,
    employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
    FROM employee AS manager
    RIGHT JOIN employee ON employee.manager_id = manager.id
    RIGHT JOIN role ON employee.role_id = role.id
    RIGHT JOIN department ON department_id = department.id`
    + " WHERE manager.first_name = ? AND manager.last_name = ?", [first_name, last_name]);
}

async function getManagers() {
    try {
        // Empty array for names of managers
        const managerNames = [];
        const managerList = await connection.query(
        `SELECT manager.id, CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id AS employee_id,
        employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department
        FROM employee AS manager
        RIGHT JOIN employee ON employee.manager_id = manager.id
        RIGHT JOIN role ON employee.role_id = role.id
        RIGHT JOIN department ON department_id = department.id`);
        // Loop through list of managers and push the names into managerNames array
        await managerList.forEach(manager => {
            if (manager.manager !== null) {
                managerNames.push(manager.manager);
            }
        });
        // Empty array prevents duplicate names
        const managerNamesFiltered = [];
        // Loop through managerNames and push the names to the above array only if it hasn't been pushed yet
        await managerNames.forEach(manager => {
            if (managerNamesFiltered.indexOf(manager) < 0) {
                managerNamesFiltered.push(manager)
            }
        });
        // Return the array managerNamesFiltered
        return managerNamesFiltered;
    } catch (err) {
        console.log(err);
    }
}


async function getAllEmployeeNames() {
    try {
        const employeeList = await viewEmployees();
        // Store employee names into an array
        const employeeNames = employeeList.map(employee => {
            return employee.first_name + " " + employee.last_name;
        });
        // Return an array of employee names and the employee list
        return employeeNames;

    } catch (err) {
        console.log(err);
    }
}

function addEmployee(first_name, last_name, role_id, manager_id) {
    return connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [first_name, last_name, role_id, manager_id]);
}

function removeEmployee(id) {
    return connection.query("DELETE FROM employee WHERE id = ?", [id]);
}

function getEmployeebyName(first_name, last_name) {
    return connection.query(
    ` SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, 
    department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role ON role_id = role.id 
    LEFT JOIN department ON department_id = department.id 
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id ` + 
    "WHERE employee.first_name = ? AND employee.last_name = ?", [first_name, last_name]);
}

function updateEmployeeRole(role_id, id) {
    return connection.query("UPDATE employee SET role_id = ? WHERE employee.id = ?", [role_id, id]);
}

function updateEmployeeManager(manager_id, id) {
    return connection.query("UPDATE employee SET manager_id = ? WHERE employee.id = ?", [manager_id, id]);
}

async function getAllRoles() {
    try {
        const roleTitles = [];
        const roleList = await connection.query(
        `SELECT role.id, role.title, role.salary, department.name
        FROM role
        LEFT JOIN department ON department_id = department.id`);
        await roleList.forEach(role => {
            roleTitles.push(role.title);
        });
        return { roleTitles, roleList };
    } catch (err) {
        console.log(err);
    }
}
function viewAllRoles() {
    return connection.query(
    `SELECT role.id, role.title, role.salary, department.name
    FROM role
    LEFT JOIN department ON department_id = department.id`);
}

function addRole(title, salary, department_id) {
    return connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", 
    [title, salary, department_id]); 
}

function removeRole(title) {
    return connection.query("DELETE FROM role WHERE title = ?", [title]);
}

// Function to get an array of all deparments
async function getDepartments() {
    try {
        const departmentNames = [];
        const departmentList = await connection.query(`SELECT * FROM department`);
        await departmentList.forEach(department => {
            departmentNames.push(department.name);
        });
        return {departmentNames};
    } catch (err) {
        console.log(err);
    }
}

function getDepartmentByName(name) {
    return connection.query(`SELECT * FROM department` + " WHERE name = ?", [name])
}


function viewAllDepartments() {
    return connection.query(`SELECT * FROM department`);
}

function addDepartment(name) {
    return connection.query("INSERT INTO department (name) VALUES (?)", [name]);
}

function removeDepartment(name) {
    return connection.query("DELETE FROM department WHERE name = ?", [name]);
}

// Exports all content into employee_tracker.js
module.exports = {
    viewEmployees,
    viewByDepartment,
    getManagers,
    viewAllByManager,
    getAllEmployeeNames,
    addEmployee,
    removeEmployee,
    getEmployeebyName,
    updateEmployeeRole,
    updateEmployeeManager,
    viewAllRoles,
    getAllRoles,
    addRole,
    removeRole,
    viewAllDepartments,
    getDepartments,
    getDepartmentByName,
    addDepartment,
    removeDepartment,
// connection must be defined here so that connection.end will function properly
    connection
}