const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    // TODO: Add MySQL Password
    password: "Yaweh25%!",
    database: "employee_db",
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
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  },
];

//this calls inquirer and takes selection and runs corresponding function
let init = () => {
  inquirer.prompt(questions).then((data) => {
    // take answers and make object to run switch statement
    // destructure to remove .data notation
    const { databaseFunction } = data;
    //make switchase to run function correspoding to chosen option
    switch (databaseFunction) {
      case "view all departments":
        //function to view departments
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        //function to add role
        break;
      case "add an employee":
        //function to add employee
        break;
      case "update an employee role":
        //function to update employee role:
        break;
    }

    // init();
  });
};

init();

//function to view departments
let viewAllDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
    init();
  });
};

//function to view all roles
let viewAllRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.log(results);
    init();
  });
};

//function to view all employees
let viewAllEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
    init();
  });
};

//function to add a department
let addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "please enter a new department name: ",
      },
    ])
    .then((data) => {
      const { departmentName } = data;
      db.query(
        `INSERT INTO department (DepartmentName) VALUES (?)`,
        [departmentName],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          init();
        }
      );
    });
};

let addRole = () => {
  //get departments table queried
  const departmentsQuery = "SELECT * FROM department";

  db.query(departmentsQuery, (err, departments) => {
    if (err) {
      console.log(err);
      return;
    }

    //make array for inquirer promps
    const departmentsArray = departments.map(
      (department) => department.departmentName
    );

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "please enter a new role name: ",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "please enter a role salary: ",
        },
        {
          type: "list",
          name: "departmentName",
          message:
            "please select a department from this list of existing departments.",
          choices: departmentsArray,
        },
      ])
      .then((data) => {
        // Destructure the answers
        const { roleName, roleSalary, departmentName } = data;

        // Find the department object that matches the selected department name and get its ID
        const departmentID = departments.find(
          (department) => department.departmentName === departmentName
        ).id;

        // Insert the role into the database
        db.query(
          "INSERT INTO role (RoleName, RoleSalary, DepartmentID) VALUES (?, ?, ?)",
          [roleName, roleSalary, departmentID],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
            init();
          }
        );
      });
  });

  //   .then((data) => {
  //     const { roleName } = data;
  //     db.query(
  //       `INSERT INTO role (RoleName) VALUES (?)`,
  //       [roleName],
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         console.log(result);
  //         init();
  //       }
  //     );
  //   });
};
