// inquirer
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "databaseFunction",
    choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role'
      ]
  }
];

//this calls inquirer and takes selection and runs corresponding function
let init = () => {
    inquirer.prompt(questions)
    .then(data => {
        console.log(data);
    })
}

init();

module.exports = {
  //pull all functions here :)
};
