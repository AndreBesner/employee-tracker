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
        addRole();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update an employee role":
        updateEmployee();
        break;
    }
  });
};

//calls intial function to run program
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

    //creates array of department choices to add role to
    const departmentChoices = departments.map(
      (department) => department.DepartmentName
    );

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "please enter a new role name:",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "please enter a role salary:",
        },
        {
          type: "list",
          name: "departmentName",
          message:
            "please select a department from this list of existing departments.",
          choices: departmentChoices,
        },
      ])
      .then((data) => {
        // Destructure the answers
        const { roleName, roleSalary, departmentName } = data;

        db.query(
          "INSERT INTO role (RoleName, RoleSalary, DepartmentID) VALUES (?, ?, (SELECT DepartmentID FROM department WHERE DepartmentName = ?));",
          [roleName, roleSalary, departmentName],
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
};

let addEmployee = () => {
  //query related tables
  const addEmployeeQuery = "SELECT * FROM role, employee";

  db.query(addEmployeeQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "employeeFirstName",
          message: "please enter a new employee first name:",
        },
        {
          type: "input",
          name: "employeeLastName",
          message: "please enter a new employee last name:",
        },
        {
          type: "list",
          name: "employeeRole",
          message: "please enter an employee role:",
          // this function generates a list of existing roles by taking the queried database
          // and adds each found role to a new array to act as choices for inquirer
          choices: () => {
            let array = [];
            for (let i = 0; i < data.length; i++) {
              array.push(data[i].RoleName);
            }
            var newArray = [...new Set(array)];
            return newArray;
          },
        },
        {
          type: "input",
          name: "managerName",
          // this should be better but I have no time and I don't feel like enough instruction was given in regards to this.
          message: "please type corresponding manager ID.",
        },
      ])
      .then((answers) => {
        //deconstruction
        const {
          employeeFirstName,
          employeeLastName,
          employeeRole,
          managerName,
        } = answers;

        let newRole;

        for (var i = 0; i < data.length; i++) {
          if (data[i].RoleID === employeeRole) {
            newRole = data[i];
          }
        }

        db.query(
          "INSERT INTO employee (FirstName, LastName, RoleID, ManagerID) VALUES (?, ?, ?, ?)",
          [employeeFirstName, employeeLastName, newRole, managerName],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("YOU DID IT!");
            init();
          }
        );
      });
  });
};

let updateEmployee = () => {
  //query related tables
  const updateEmployeeQuery = "SELECT * FROM employee, role";

  db.query(updateEmployeeQuery, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeName",
          message: "please select employee to update:",
          // this function generates a list of existing employees by taking the queried database
          // and adds each found employee to a new array to act as choices for inquirer
          choices: () => {
            let array = [];
            for (let i = 0; i < data.length; i++) {
              array.push(data[i].FirstName);
            }
            var employeeArray = [...new Set(array)];
            return employeeArray;
          },
        },
        {
          type: "list",
          name: "employeeRole",
          message: "please select a new employee role:",
          choices: () => {
            let array = [];
            for (let i = 0; i < data.length; i++) {
              array.push(data[i].RoleName);
            }
            var roleArray = [...new Set(array)];
            return roleArray;
          },
        },
      ])
      .then((answers) => {
        const { employeeName, employeeRole } = answers;

        // find the employee object based on the selected name
        const employee = data.find(
          (employee) => employee.FirstName === employeeName
        );

        // find the role object based on the selected role name
        const role = data.find((role) => role.RoleName === employeeRole);

        // error checking to make sure both promps were answered
        if (!employee || !role) {
          console.log("Invalid selection. Please try again.");
          init();
          return;
        }

        // Update the employee's role in the database
        db.query(
          "UPDATE employee SET RoleID = ? WHERE EmployeeID = ?",
          [role.RoleID, employee.EmployeeID],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("You did it!");
            init();
          }
        );
      });
  });
};
