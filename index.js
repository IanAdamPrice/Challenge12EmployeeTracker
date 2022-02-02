const mysql = require('mysql2');
const inquier = require('inquirer');
const table = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected');    
  startQuestions();
});

const startQuestions = () => {
  inquier.prompt ([
    {
      type: 'list',
      name: 'choices',
      message: 'Please make a selection',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role']
    }
    ])
    .then((choice) => {
      const { choices } =  choice;
      
      if (choices === 'View all departments') {
        viewDepartment();
      }

      if (choices === 'View all roles') {
        viewRoles();
      }

      if (choices === 'View all employees') {
        viewEmployees();
      }

      if (choices === 'Add a department') {
        addDepartment();
      }

      if (choices === 'Add a role') {
        addRole();
      }

      if (choices === 'Add an employee') {
        addEmployee();
      }

      if (choices === 'Update an employee role') {
        updateEmployee();
      };
    });
};

const viewDepartment = () => {
  console.log('Showing all departments');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
  
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    startQuestions();
  });
}; // end viewDepartment function

viewRoles = () => {
  console.log('Showing all roles');
  const sql = `SELECT roles.id, roles.title, department.name AS department 
              FROM roles 
              INNER JOIN department ON roles.department_id = department.id`; 
  
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    startQuestions();
  });
}; // end viewRoles function

viewEmployees = () => {
  console.log('Showing all employees');
  const sql = `SELECT employee.id, 
                  employee.first_name, 
                  employee.last_name, 
                  roles.title, 
                  department.name AS department,
                  roles.salary, 
                  CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                  LEFT JOIN roles ON employee.role_id = roles.id
                  LEFT JOIN department ON roles.department_id = department.id
                  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    startQuestions();
  });
}; // End viewEmployee function

addDepartment = () => {
  inquier.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: 'What department would you like to add?',
      validate: addDepartment => {
        if (addDepartment) {
            return true;
        } else {
            console.log('Please enter a department!');
            return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;
    connection.query(sql, answer.addDepartment, (err, result) => {
      if (err) throw err;
      console.log('Added ' + answer.addDepartment + " to departments!"); 

      viewDepartment();
    });
  });
}; // end addDepartment function

addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the role?',
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log('Please enter a role!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the role's salary",
      validate: addSalary => {
        if (addSalary) {
          return true;
        } else {
          console.log('Please enter a salary!');
          return false;
        }
      }
    }
  ])
  .then(answer => {
    const params = [answer.role, answer.salary];

    // grab dept from department table
    const rolesSql = `SELECT name, id FROM department`; 

    connection.query(rolesSql, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
      {
        type: 'list', 
        name: 'dept',
        message: "What department is this role in?",
        choices: dept
      }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          params.push(dept);

          const sql = `INSERT INTO roles (title, salary, department_id)
                      VALUES (?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Added' + answer.role + " to roles!"); 

            viewRoles();
          });
        });
    });
  });
}; // end addRole function

addEmployee = () => {
  inquirer.prompt ([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter the employee's first name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          console.log("Please enter the employee's last name!");
          return false;
        }
      }
    }
  ])
  .then(answer => {
  const params = [answer.firstName, answer.lastName];

  const rolesSql = `SELECT roles.id, roles.title FROM roles`;

  connection.query(rolesSql, (err, data) => {
    if (err) throw err;

    const role = data.map(({ id, title }) => ({ name: title, value: id }));


    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: role
      }
    ])
      .then(roleSelect => {
        const role = roleSelect.role;
        params.push(role);

        const managerSql = `SELECT * FROM employee`;

          connection.query(managerSql, (err, data) => {
            if (err) throw err;

            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

            inquirer.prompt([
              {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: managers
              }
              ])
              .then(managerSelect => {
                const manager = managerSelect.manager;
                params.push(manager);

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;

                connection.query(sql, params, (err, result) => {
                  if (err) throw err;
                  console.log("Employee has been added!")

                  viewEmployees();
                });
              });
          });
      });
    });
  });
}; // end addEmployee function

updateEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
    .then(employeeSelect => {
      const employee = employeeSelect.name;
      const params = []; 
      params.push(employee);

      const roleSql = `SELECT * FROM roles`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err; 

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        
          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's new role?",
              choices: roles
            }
          ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role); 
              
            let employee = params[0]
            params[0] = role
            params[1] = employee 
              
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Employee has been updated!");
            
              viewEmployees();
            });
          });
      });
    });
  });
}; // end updateEmployee function