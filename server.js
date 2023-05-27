const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: 'Yaweh25%!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


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
        // console.log(data);
        // take answers and make object to run switch statement
        const {databaseFunction} = data ;
        //make switchase to run function correspoding to chosen option 
        switch(databaseFunction){
          case 'view all departments':
            //function to view departments
            viewAllDepartments();
            break;
          case 'view all roles':
            //function to view roles
            break;
          case 'view all employees':
            viewAllEmployees();
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

        // init();

    })
}

init();

//function to view departments
let viewAllDepartments = () => {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    init();
  });
}


//function to view all employees
let viewAllEmployees = () => {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    init();
  });
}