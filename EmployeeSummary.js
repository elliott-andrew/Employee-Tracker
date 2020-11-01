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

// Begin App Functionality
// ======================================================================
const runApp = () => {

    figlet('Employee\nSummary', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data + '\n\nAdd departments, roles and employess within your company\nto easily organize and your plan your business.\n' + '\nBegin questions:\n')
        employeePrompt();
    });

    const employeePrompt = () => {
        inquirer
            .prompt([
                {
                    name: 'action',
                    message: 'What would you like to do?',
                    type: 'rawlist',
                    choices: [
                        "Add new department, role or employee.",
                        "View all current departments, roles or employees.",
                        "Update existing employee roles."
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
                }
            })
    };
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
            }
        ])
}
function addNewRole() {
    inquirer
        .prompt([
            {
                name: "newRole",
                message: "What is the name of the new employee role?",
                type: "input"
            }
        ])
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
            }
        ])
}


runApp();