const homepage = require("./db/homepage");
const query = require("./db/query");
const questions = require("./questions");

// This function causes the mainMenu function to run, which causes the menu from homepage.js to appear
// Every use of the menu other than "Exit" ends with this, bringing the user back to the menu
function start() {
    try {
        mainMenu();
    } catch (err) {
        console.log(err);
    }
};
start();

async function mainMenu() {
    try {
        // The first thing mainMenu() does is bring up the menu
        // const {action} connects all actions to the menu, each action refers to using a prompt from the menu
        const {action} = await homepage.menu();

        if (action === "View all employees") {
                const data = await query.viewEmployees();
                console.table(data);
                start();

        } else if (action === "View all employees by department") {
            const {departmentNames} = await query.getDepartments();
            // Prompt user for a department
            const {department} = await questions.departmentPrompt(departmentNames);
            // Then pass the chosen department into query viewByDepartment
            const data = await query.viewByDepartment(department);
            // Logs data to a table so the user can see it
            console.table(data);
            start();

        } else if (action === "View all employees by Manager") {
            // Get manager list using query getAllManager()
            const managerList = await query.getManagers();
            const {manager} = await questions.managerPrompt(managerList);
            // Split manager's name into an array of first and last name with a
            const managerName = await manager.split(" ");
            // Pass first and last name to query viewAllByManager
            const data = await query.viewAllByManager(managerName[0], managerName[1]);
            console.table(data);
            start();

        } else if (action === "Add an employee") {
            // Need list of roles and managers
            const managerList = await query.getManagers();
            const {roleTitles, roleList} = await query.getAllRoles();
            // Run prompt and get data
            const {first_name, last_name, role, manager} = await questions.addEmployeePrompt(roleTitles, managerList);
            // Use role and manager data to get id's
            const chosenRole = roleList.filter(roleItem => roleItem.title === role);
            const role_id = chosenRole[0].id;
            // split(" ") puts a space between names
            const chosenManager = await manager.split(" ");
            const data = await query.viewAllByManager(chosenManager[0], chosenManager[1]);
            const manager_id = data[0].id;
            // Use data for first_name, last_name, role_id, and manager_id and queryHelper to add employee
            await query.addEmployee(first_name, last_name, role_id, manager_id);
            start();

        } else if (action === "Remove an employee") {
            // Get list of employees
            const employeeNames = await query.getAllEmployeeNames();
            // Prompt user to choose an employee
            const {employee} = await questions.chooseEmployee(employeeNames);
            // Split employee name into an array of first and last name
            const chosenEmployee = await employee.split(" ");
            // Get id of employee by first and last name
            const employeeData = await query.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // Use id and pass it on to query to remove employee
            await query.removeEmployee(id);
            start();

        } else if (action === "Update an employee's role") {
            // Get list of employees and roles
            const employeeNames = await query.getAllEmployeeNames();
            const {roleTitles, roleList} = await query.getAllRoles();
            // Prompt user to choose an employee and a role
            const {employee, role} = await questions.updateEmployeeRole(employeeNames, roleTitles);
            // split(" ") puts a space between names
            const chosenEmployee = await employee.split(" ");
            // Use role data to get its id
            const chosenRole = roleList.filter(roleItem => roleItem.title === role);
            const role_id = chosenRole[0].id;
            // Get id of employee by first and last name
            const employeeData = await query.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // Use role_id and id and pass them on to query to update employee's role
            await query.updateEmployeeRole(role_id, id);
            start();

        } else if (action === "Update an employee's manager") {
            // Get list of of employees and managers
            const employeeNames = await query.getAllEmployeeNames();
            const managerList = await query.getManagers();
            // Prompt user for the employee and manager
            const {employee, manager} = await questions.updateEmployeeManager(employeeNames, managerList);
            // split(" ") puts a space between names
            const chosenEmployee = await employee.split(" ");
            // Get id of employee by first and last name
            const employeeData = await query.getEmployeebyName(chosenEmployee[0], chosenEmployee[1]);
            const id = employeeData[0].id;
            // split(" ") puts a space between names
            const managerName = await manager.split(" ");
            // Pass first and last name to query viewAllByManager and get id of manager
            const data = await query.viewAllByManager(managerName[0], managerName[1]);
            const manager_id = data[0].id;
            // Pass manager_id and id into query to update an employee's manager
            await query.updateEmployeeManager(manager_id, id);
            start();

        } else if (action === "View all roles") {
            const data = await query.viewAllRoles();
            console.table(data);
            start();

        } else if (action === "Add a role") {
            const {departmentNames} = await query.getDepartments();
            // Prompt user for role title, salary, and department
            const {title, salary, department} = await questions.addRolePrompt(departmentNames);
            // Get department data by department name
            const chosenDepartment = await query.getDepartmentByName(department);
            // Get department_id
            const department_id = chosenDepartment[0].id;
            // Pass data for title, salary and department_id into query for adding a role
            await query.addRole(title, salary, department_id);
            start();

        } else if (action === "Remove a role") {
            const {roleTitles} = await query.getAllRoles();
            // Prompt user to chooes a role to remove
            const {role} = await questions.chooseRole(roleTitles);
            // Pass id to query for removing role
            await query.removeRole(role);
            start();
        
        } else if (action === "View all departments") {
            // Use query to viewAllDepartments
            const data = await query.viewAllDepartments();
            // Log data to a table
            console.table(data);
            start();

        } else if (action === "Add a department") {
            // addDepartmentPrompt asks for the new department name, as seen in questions.js
            const {department} = await questions.addDepartmentPrompt();
            // Pass name to query for adding a department
            await query.addDepartment(department);
            start();

        } else if (action === "Remove a department") {
            // Get list of all department names
            const {departmentNames} = await query.getDepartments();
            // Prompt user for which department to remove
            const {department} = await questions.removeDepartmentPrompt(departmentNames);
            // Pass department to query for removing a department
            await query.removeDepartment(department);
            start();

        } else if (action === "View a department's budget") {
            // Get list of all department names
            const {departmentNames} = await query.getDepartments();
            // Prompt user for which department to view
            const {department} = await questions.departmentPrompt(departmentNames);
            // Then pass the chosen department into query viewByDepartment
            const data = await query.viewByDepartment(department);
            // budget defines a variable for the salary
            let budget = 0;
            data.forEach(employee => {
                return budget += employee.salary;
            });
            // The budget is printed to the console
            console.log("\n Budget for the " + department + " department: $" + budget + "\n");
            start();
        // Pushing the "Exit" option ends the connection ending the program
        } else if (action === "Exit") {
            query.connection.end();
        } 

    } catch (err) {
        console.log(err);
    }
};