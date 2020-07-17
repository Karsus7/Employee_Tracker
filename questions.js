const inquirer = require ("inquirer");
const queryHelper = require("./db/queryHelper.js");

function mainMenu(){
    return inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",

            "View All Roles",
            "Add Role",
            "Remove Role",

            "View All Departments",
            "Add Department",
            "Remove Department",

            "View Budgets",

            "Exit"]
    });
}

/*==    Get Data from Database
======================================= */
// return the Department Name and ID as selected by the name
async function getDepartment(){
    const data = await queryHelper.getDepartments();

    const inq = await inquirer.prompt({
        name: "department",
        type: "list",
        message: "Which Department?",
        choices: data.map(dept=>dept.name)
    });

    return data.find(dept => dept.name == inq.department);
}

// return the Role title and ID as selected by the name
async function getRole(){
    const data = await queryHelper.getRoles();

    const inq = await inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which Role?",
        choices: data.map(role=>role.title)
    });

    return data.find(role => role.title == inq.role);
}

async function getPerson(){
    // get list of all employee names/ids
    const data = await queryHelper.getEmployeeNames();

    // display all names as choices
    const inq = await inquirer.prompt({
        name: "person",
        type: "list",
        message: "Which person?",
        choices: data.map(person=>person.name)
    });

    // return the id associated with the given name
    return data.find(person => person.name == inq.person);
}


// gather all the data for a new employee
async function newEmployee(){
    // get list of all employee names/ids
    const names = await queryHelper.getEmployeeNames();
    const roles = await queryHelper.getRoles();

    // display all names as choices
    const inq = await inquirer.prompt([
        {
            name:"firstName",
            message: "What is their first name?",
        },
        {
            name:"lastName",
            message: "What is their last name?",
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: roles.map(role=>role.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their Manager?",
            choices: [...names.map(person=>person.name),"None"]
        }
    ]);
    
    let managerId;
    try{
        managerId = names.find(person => person.name == inq.manager).id;
    }
    catch{managerId = null}

    let roleId =  roles.find(role => role.title == inq.role).id;

    let person = {firstName:inq.firstName, lastName:inq.lastName, role:roleId, manager:managerId};
    return person;
}

// return a new role object designed to match the mySQL insesrt into Roles
async function makeRole(){
    const department = await getDepartment();
    const inq = await inquirer.prompt([
        {
            name:"title",
            message:"Title for the Role?",   
        }, 
        {
            name:"salary",
            message:"Salary for the Role?",   
        }
    ]);

    return {...inq, department_id:department.id};
}

// return a new role object designed to match the mySQL insesrt into Roles
async function makeDepartment(){
    const inq = await inquirer.prompt([
        {
            name:"name",
            message:"What is the department name?",   
        }
    ]);

    return inq;
}

module.exports = {
    mainMenu,
    getRole,
    getDepartment,
    getPerson,
    newEmployee,
    makeRole,
    makeDepartment
}