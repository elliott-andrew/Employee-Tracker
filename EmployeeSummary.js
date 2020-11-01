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
    password: "",
    database: "employee_summaryDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

// Begin App Functionality
// ======================================================================
figlet('Employee\nSummary', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data + '\n\nAdd departments, roles and employess within your company\nto easily organize and your plan your business.\n' + '\nBegin questions:\n')
    questions();
});

const questions = () => {
    inquirer
        .prompt([
            {
                name: 'EmployeeName',
                message: 'What is the employee\'s name?\n',
                type: 'input'
            }
        ]);
};