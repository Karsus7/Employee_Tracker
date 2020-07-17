const connection = require("./connection.js");

// gets information 
function getEmployees(addition){
    return connection.query(`
        SELECT employees.id as id, employees.first_name, employees.last_name,title, name, salary, CONCAT(mt.first_name, " ",mt.last_name) as manager 
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN departments
        ON roles.department_id = departments.id
        LEFT JOIN employees as mt
        ON employees.manager_id = mt.id
        ${addition};
    `);
}


function getEmployeeNames(){
    return connection.query(`
        SELECT id, CONCAT(first_name, " ",last_name) as name
        FROM employees
    `);
}

function getDepartments(){
    return connection.query(` SELECT id, name FROM departments`);
}

function getRoles(){
    return connection.query(`select id,title from roles`)
}

function getBudget(dept){
    return connection.query(`
    SELECT sum(salary) as total
    FROM employees
    LEFT JOIN roles on employees.role_id = roles.id
    WHERE ?;
    `,
    dept
    );
}

// adds employee information 
function addEmployee(person){
    return connection.query(`
        INSERT INTO employees SET ?`,
        {
            first_name:person.firstName,
            last_name:person.lastName,
            role_id:person.role,
            manager_id:person.manager?person.manager:null
        }
    )
}
// add elements into table
function addElem(table, data){
    return connection.query(`
        INSERT INTO ?? SET ?`,
        [table, data]
    )
}

// deletes information from table
function deleteElem(table, id){
    return connection.query(`
        DELETE FROM ??
        WHERE id = ?;
    `,
    [table, id]
    )
}


// provides updates
function updateElem(table, update, person){
    return connection.query(`
        UPDATE ??
        SET ?
        WHERE ?;
    `,
    [table, update, person]
    );
}

// exports information pulled from avove functions to other .js files
module.exports ={
    getEmployees,
    getEmployeeNames,
    getDepartments,
    getRoles,
    getBudget,
    addEmployee,
    deleteElem,
    addElem,
    updateElem,
    connection
}