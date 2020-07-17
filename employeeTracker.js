
const queryHelper = require("./db/queryHelper.js");
const questions = require("./questions.js");
const cTable = require('console.table');

// function which prompts the user for what action they want to take
async function mainMenu() {

    const action = await questions.mainMenu();

    // based on their answer, calls other functions
    switch(action.action){
        case "View All Employees":
            viewEmployees();
            break;
        case "View All Employees by Department":
            viewEmployees("Department");
            break;
        case "View All Employees by Manager":
            viewEmployees('Manager');
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Remove Employee":
            deleteEmployee();
            break;

        case "Add Role":
            addRole();
            break;
        case "Remove Role":
            deleteRole();
            break;
        case "View All Roles":
            viewRoles();
            break;

        case "Add Department":
            addDepartment();
            break;
        case "Remove Department":
            deleteDepartment();
            break;
        case "View All Departments":
            viewDepartments();
            break;


        case "Update Employee Role": // to add
            updateEmployeeRole();
            break;
        case "Update Employee Manager": // to add
            updateEmployeeManager();
            break;

        case "View Budgets":
            viewBudgets();
            break;

        case "Exit":
            queryHelper.connection.end();
            break;
    }
}

// function to view employees.  Set up for View By - All, Department, or Manager
async function viewEmployees(viewBy = ""){
    // extra data for more specific queries
    if(viewBy == "Department"){
        let department = await questions.getDepartment();
        viewBy = `where departments.name = '${department.name}'`;
    }
    else if (viewBy == "Manager"){
        let manager = await questions.getPerson();
        viewBy = `where employees.manager_id = '${manager.id}'`;
    }

    // run query for employees
    const data = await queryHelper.getEmployees(viewBy);
    // print to table
    console.table(data);
    //call back to main function
    mainMenu();
}

// View roles
async function viewRoles(){
    console.table(await queryHelper.getRoles());
    mainMenu();
}

// View departments
async function viewDepartments(){
    console.table(await queryHelper.getDepartments());
    mainMenu();
}

// View Budget by departments
async function viewBudgets(){
    let department = await questions.getDepartment();
    let budget = await queryHelper.getBudget( {department_id:department.id} );
    console.log(`Budget for ${department.name} : $${budget[0].total?budget[0].total:0}`);
    mainMenu();
}

/*#  Add Functions
##############################################################*/

//Add employee call
async function addEmployee(){
    let employee = await questions.newEmployee();
    await queryHelper.addEmployee(employee);
    mainMenu();
}

// add Role
async function addRole(){
    let role = await questions.makeRole();
    await queryHelper.addElem("roles",role);
    mainMenu();
}

// add Department
async function addDepartment(){
    let department = await questions.makeDepartment();
    await queryHelper.addElem("departments",department);
    mainMenu();
}


/*#  Delete Functions
##############################################################*/

// delete Employee
async function deleteEmployee(){
    let person = await questions.getPerson();
    await queryHelper.deleteElem("employees", person.id);
    mainMenu();
}

// delete Role
async function deleteRole(){
    let role = await questions.getRole();
    await queryHelper.deleteElem("roles", role.id);
    mainMenu();
}

// delete Department
async function deleteDepartment(){
    let department = await questions.getDepartment();
    await queryHelper.deleteElem("departments", department.id);
    mainMenu();
}

/*#  update Functions
##############################################################*/

// Update Employee role
async function updateEmployeeRole(){
    let person = await questions.getPerson();
    let role = await questions.getRole();
    await queryHelper.updateElem("employees",{role_id:role.id}, {id:person.id});
    mainMenu();
}

// Update Employee manager
async function updateEmployeeManager(){
    let person = await questions.getPerson();
    let manager = await questions.getPerson();
    await queryHelper.updateElem("employees",{manager_id:manager.id}, {id:person.id});
    mainMenu();
}


/*#  First Call
##############################################################*/

function main(){
    try{
        mainMenu();
    }catch(err) {
        console.log(err)
    }
}

/*##############################################################
#  To Start
##############################################################*/

main();
