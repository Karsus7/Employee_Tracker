const inquirer = require("inquirer");

// This function provides the main menu, this was copied from the demo provided as best as possible
function menu() {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: 
                [
                "View all employees",
                "View all employees by department",
                "View all employees by Manager",
                "Add an employee",
                "Remove an employee",
                "Update an employee's role",
                "Update an employee's manager",
                "View all roles",
                "Add a role",
                "Remove a role",
                "View all departments",
                "Add a department",
                "Remove a department",
                "View a department's budget",
                "Exit"
                ]
        }
    ])
}


module.exports = {
    menu
}