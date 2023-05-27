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
        // take answers and make object to run switch statement
        const {databaseFunction} = data ;
        //make switchase to run function correspoding to chosen option 
        switch(databaseFunction){
          case 'view all departments':
            //function to view departments
            break;
          case 'view all roles':
            //function to view roles
            break;
          case 'view all employees':
            //function to view employess
            break;
          case 'add a department':
            //function to add deparment
            break;
          case 'add a role':
            //function to add role
            break;
          case 'add an employee':
            //function to add employee
            break;
          case 'update an employee role':
            //function to update employee role:
            break;
        }

        init();

    })
}

init();

module.exports = {
  //pull all functions here :)
};
