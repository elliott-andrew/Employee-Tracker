const figlet = require('figlet');
const inquirer = require('inquirer');

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
                message: 'What is the employee\'s name?',
                type: 'input'
            }
        ]);
};