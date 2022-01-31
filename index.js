const mysql = require('mysql2');
const inquier = require('inquirer');
const table = require('console.table');

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

}; // end addDepartment function

addRole = () => {

}; // end addRole function

addEmployee = () => {

}; // end addEmployee function

updateEmployee = () => {

}; // end updateEmployee function