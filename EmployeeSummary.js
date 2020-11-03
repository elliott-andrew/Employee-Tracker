// Dependencies
// ======================================================================
const figlet = require('figlet');
const mysql = require('mysql');
const inquirer = require('inquirer');

// MySQL connection
// ======================================================================
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "myfakepassword",
    database: "employee_summaryDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runApp();
});

// App Functionality
// ======================================================================
// Start the app
const runApp = () => {
    // Create ASCII art with the words Employee Summary
    figlet('Employee\nSummary', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        // Display the art along with a mini app description
        console.log(data + '\n\nAdd departments, roles and employess within your company\nto easily organize and your plan your business.\n' + '\nBegin questions:\n')
        initialPrompt();
    });
};

// Ask what the user would like to do
function initialPrompt() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: 'action',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: [
                    "Add new department, role or employee",
                    "View existing departments, roles or employees",
                    "Update existing departments, roles or employees",
                    "Exit"
                ]
            }
        ])
        // Route the user depending on answer
        .then(function (answer) {
            switch (answer.action) {
                case "Add new department, role or employee":
                    addNew();
                    break;

                case "View existing departments, roles or employees":
                    viewAll();
                    break;

                case "Update existing departments, roles or employees":
                    updateExisting();
                    break;

                case "Exit":
                    endApp();
                    break;
            };
        });
};

// End the app
function endApp() {
    /* Use SIGTERM to end the program without killing any running or pending requests. https://flaviocopes.com/node-terminate-program/ */
    process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Process terminated')
        });
    });
};

// Add new department, role or employee
function addNew() {
    inquirer
        .prompt({
            // Gather answers
            name: "SelectAddNewOp",
            message: "Would you like to add a new department, role or employee?",
            type: "rawlist",
            choices: [
                "Add new department",
                "Add new role",
                "Add new employee",
                "Return to main menu"
            ]
        })
        // Route the user depending on answer
        .then(function (answer) {
            switch (answer.SelectAddNewOp) {
                case "Add new department":
                    addNewDepartment();
                    break;
                case "Add new role":
                    addNewRole();
                    break;
                case "Add new employee":
                    addNewEmployee();
                    break;
                case "Return to main menu":
                    initialPrompt();
                    break;
            };
        });
};

// Add a new department
function addNewDepartment() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: "newDepartment",
                message: "What is the name of the new department?",
                type: "input"
            },
            {
                name: "continue",
                message: "Is there anything else you would like to do?",
                type: "rawlist",
                choices: ["Add another department", "Return to main menu", "Exit"]
            }
            // Ask the user if they would like to do more
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Add another department":
                    addNewDepartment();
                    saveDepartment(answer)
                    break;
                case "Return to main menu":
                    initialPrompt();
                    saveDepartment(answer)
                    break;
                case "Exit":
                    endApp();
                    saveDepartment(answer)
                    break;
            };
        });
};

// Save department
function saveDepartment(answer) {
    let departmentName = `INSERT INTO department (name) VALUES ('${answer.newDepartment}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    })
};

// function deleteDepartment() {
//     let departmentName = `DELETE FROM department WHERE id = ('${answer.selectedID}')`;
//     connection.query(departmentName, function (err, res) {
//         if (err) throw err;
//     });
// };

// Add a new employee role
function addNewRole() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: "newRole",
                message: "What is the title of the new employee role?",
                type: "input"
            },
            {
                name: "newSalary",
                message: "What is the salary of the new employee role?",
                type: "input"
            },
            {
                name: "continue",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Add another role", "Update current employee's role", "Return to main menu", "Exit"]
            }
            // Ask the user if they would like to do more
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Add another role.":
                    addNewRole();
                    saveRole(answer);
                    break;
                case "Return to main menu":
                    initialPrompt();
                    saveRole(answer);
                    break;
                case "Exit":
                    endApp();
                    saveRole(answer);
                    break;
            };
        });
};

// Save role
function saveRole(answer) {
    let departmentName = `INSERT INTO role (title, salary) VALUES ('${answer.newRole}', '${answer.newSalary}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    });
};

// Add a new employee
function addNewEmployee() {
    // if no role or department, must add role or department before adding new employee
    // how to create choices from user input of roles and department
    inquirer
        .prompt([
            // Gather answers
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
                name: "continue",
                message: "Is there anyting else you would like to do?",
                type: "rawlist",
                choices: ["Add another employee", "Return to main menu", "Exit"]
            }
            // Ask the user if they would like to do more
        ]).then(function (answer) {
            switch (answer.continue) {
                case "Add another employee":
                    addNewEmployee();
                    saveEmployee(answer);
                    break;
                case "Return to main menu":
                    initialPrompt();
                    saveEmployee(answer);
                    break;
                case "Exit":
                    endApp();
                    saveEmployee(answer);
                    break;
            };
        });
};

// Save employee
function saveEmployee(answer) {
    let departmentName = `INSERT INTO employee (first_name, last_name) VALUES ('${answer.newEmployeeFN}', '${answer.newEmployeeLN}')`;
    connection.query(departmentName, function (err, res) {
        if (err) throw err;
    });
};

// View stored information
function viewAll() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: "viewData",
                message: "What would you like to view?",
                type: "rawlist",
                choices: ["Current departments", "Current employee roles", "Current employees", "Company Overview", "Return to main menu", "Exit"]
            },
        ])
        // Route the user depending on answer
        .then(function (answer) {
            switch (answer.viewData) {
                case "Current departments":
                    departmentSearch();
                    break;
                case "Current employee roles":
                    roleSearch();
                    break;
                case "Current employees":
                    employeeSearch();
                    break;
                case "Company Overview":
                    allInformation()
                    break;
                case "Return to main menu":
                    initialPrompt();
                    break;
                case "Exit":
                    endApp();
                    break;
            };
        });
};

// Return all currently saved department data
function departmentSearch() {
    console.log("\n===========================================\nAll Departments:\n")
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].name + " | Department ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
        viewAll();
    });
};

// Return all currently saved role data
function roleSearch() {
    console.log("\n===========================================\nAll Roles:\n")
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Title: " + res[i].title + " | Salary: " + res[i].salary + " | Department ID: " + res[i].department_id);
        };
        console.log("\n===========================================\n")
        viewAll();
    });
};

// Return all currently saved employee data
function employeeSearch() {
    console.log("\n===========================================\nAll Employees:\n")
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].first_name + " " + res[i].last_name + " | Employee ID: " + res[i].id);
        };
        console.log("\n===========================================\n")
        viewAll();
    });
};

// View all information
function allInformation() {
    console.log("\n===========================================\nAll Company Data:\n")
    connection.query("SELECT r.title, e.role_id, e.first_name, e.last_name, r.salary, e.manager_id FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON e.role_id = r.id", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].first_name + " " + res[i].last_name + " | Title: " + res[i].title + " | Employee ID: " + res[i].role_id + " | Salary: " + res[i].salary + " | Manager ID: " + res[i].manager_id);
        };
        console.log("\n===========================================\n")
        viewAll();
        if (err) throw (err)
    });
};

function updateExisting() {
    inquirer
        .prompt([
            // Gather answers
            {
                name: 'action',
                message: 'What would you like to do?',
                type: 'rawlist',
                choices: [
                    "Update/remove department",
                    "Update/remove role",
                    "Update/remove employee",
                    "Exit"
                ]
            }
        ])
        // Route the user depending on answer
        .then(function (answer) {
            switch (answer.action) {
                case "Update/remove department":
                    // updateDepartment();
                    break;

                case "Update/remove role":
                    // updateRole();
                    break;

                case "Update/remove employee":
                    // updateEmployee();
                    break;

                case "Exit":
                    // endApp();
                    break;
            };
        });
};