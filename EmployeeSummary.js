// Dependencies
// ======================================================================
const figlet = require('figlet');
const mysql = require('mysql');
const inquirer = require('inquirer');

// MySQL connection
// ======================================================================
// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "",
//     database: "employee_summaryDB"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     runApp();
// });

// App Functionality
// ======================================================================
// Start the app
const runApp = () => {
    figlet('Employee\nSummary', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data + '\n\nAdd departments, roles and employess within your company\nto easily organize and your plan your business.\n' + '\nBegin questions:\n')
        initialPrompt();
    });
}

function initialPrompt() {
    inquirer
        .prompt([
            {
                name: 'action',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: [
                    "Add new department, role or employee.",
                    "View all current departments, roles or employees.",
                    "Update existing employee roles.",
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.action) {
                case "Add new department, role or employee.":
                    addNew();
                    break;

                case "View all current departments, roles and employees":
                    viewAll();
                    break;

                case "Updates existing employee role.":
                    updateRole();
                    break;

                case "Exit":
                    endApp();
                    break;

            }
        })
};

// End the app
function endApp() {
    /* Use SIGTERM to end the program without killing any running or pending requests. https://flaviocopes.com/node-terminate-program/ */
    process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Process terminated')
        })
    })
}

function addNew() {
    inquirer
        .prompt({
            name: "SelectAddNewOp",
            message: "Would you like to add a new department, role or employee?",
            type: "rawlist",
            choices: [
                "Add new department.",
                "Add new role.",
                "Add new employee."
            ]
        })
        .then(function (answer) {
            switch (answer.SelectAddNewOp) {
                case "Add new department.":
                    addNewDepartment();
                    break;

                case "Add new role.":
                    addNewRole();
                    break;

                case "Add new employee.":
                    addNewEmployee();
                    break;
            }
        })
}

function addNewDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartment",
                message: "What is the name of the new department?",
                type: "input"
            },
            {
                name: "continue",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Yes":
                    initialPrompt();
                    break;
                case "No":
                    endApp();
                    break;
            }
        })
}
function addNewRole() {
    inquirer
        .prompt([
            {
                name: "newRole",
                message: "What is the name of the new employee role?",
                type: "input"
            },
            {
                name: "continue",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Yes":
                    initialPrompt();
                    break;
                case "No":
                    endApp();
                    break;
            }
        })
}

function addNewEmployee() {
    inquirer
        .prompt([
            {
                name: "newEmployeeFN",
                message: "What is the first name of the new Employee?",
                type: "input"
            },
            {
                name: "newEmployeeLN",
                message: "What is the last name of the new Employee?",
                type: "input"
            },
            {
                name: "newEmployeeRole",
                message: "What is the employee's Role?",
                type: "input"
            },
            {
                name: "continue",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Yes":
                    initialPrompt();
                    break;
                case "No":
                    endApp();
                    break;
            }
        })
}

// function viewAll() {
//     // Display all departments
//     // Display all roles
//     // Display all employees
//     // prompt if the user would like to do more
// }


// function updateRole() {
//     // Search employee name, or view list of all employees to choose from
//     // Display the selected employee's current information
//     // prompt for new role
//     // update the employee's information
//     // return the updated information
//     // prompt if the user would like to do more
// }


runApp();