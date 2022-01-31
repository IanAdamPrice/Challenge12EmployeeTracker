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
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
  
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      startQuestions();
    });
}; // end viewDepartment function

viewRoles = () => {
    console.log('Showing all roles...\n');
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
    console.log('Showing all employees...\n');
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

}; // end addEmployee function

updateEmployee = () => {

}; // end updateEmployee function