-- department table seed data
INSERT INTO department (DepartmentName) VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Finance'),
    ('Operations');

-- role table seed data
INSERT INTO role (RoleName, RoleSalary, DepartmentID) VALUES
    ('HR Manager', 5000.00, 1),
    ('Recruiter', 3000.00, 1),
    ('Marketing Manager', 6000.00, 2),
    ('Marketing Coordinator', 3500.00, 2),
    ('Finance Manager', 5500.00, 3),
    ('Accountant', 4000.00, 3),
    ('Operations Manager', 5500.00, 4),
    ('Operations Coordinator', 3500.00, 4);

-- employee table seed data
INSERT INTO employee (FirstName, LastName, RoleID, ManagerID) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Brown', 4, 3),
    ('David', 'Wilson', 5, NULL),
    ('Sarah', 'Anderson', 6, 5),
    ('Robert', 'Taylor', 7, 5),
    ('Olivia', 'Davis', 8, 7);