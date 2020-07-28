const inquirer = require("inquirer");

function departmentPrompt(departmentNames) {
    return inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Choose a department to view:",
            choices: departmentNames
        }
    ])
}

function managerPrompt(managerList) {
    return inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Choose a manager to view:",
            choices: managerList
        }
    ])
}

function addEmployeePrompt(roleTitles, managerList) {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter the employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter the employee's last name:"
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's role:",
            choices: roleTitles
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee's manager:",
            choices: managerList
        }
    ])
}

function chooseEmployee(employeeNames) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please choose an employee to remove:",
            choices: employeeNames
        }
    ])
}

function updateEmployeeRole(employeeNames, roleTitles) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please choose an employee to update:",
            choices: employeeNames
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee's role:",
            choices: roleTitles
        }
    ])
}

function updateEmployeeManager(employeeNames, managerList) {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please choose the employee getting a different manager:",
            choices: employeeNames
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee's new manager:",
            choices: managerList
        }
    ])
}

function addRolePrompt(departmentNames) {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Please enter the new role's title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the new role's salary:"
        },
        {
            type: "list",
            name: "department",
            message: "Please confirm which department this role will be part of:",
            choices: departmentNames
        }
    ])
}

// This function is used exclusively in the "removeRole function"
function chooseRole(roleTitles) {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose which role you wish to remove:",
            choices: roleTitles
        }
    ])
}

function addDepartmentPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Please enter a name for the new department:"
        }
    ])
}

function removeDepartmentPrompt(departmentNames) {
    return inquirer.prompt([
        {
            // "list", provides a list of possible choices made up of existing department names
            type: "list",
            name: "department",
            message: "Please choose which department to remove:",
            choices: departmentNames
        }
    ])
}

// Exports all content into employee_tracker.js
module.exports = {
    departmentPrompt,
    managerPrompt,
    addEmployeePrompt,
    chooseEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    addRolePrompt,
    chooseRole,
    addDepartmentPrompt,
    removeDepartmentPrompt
}