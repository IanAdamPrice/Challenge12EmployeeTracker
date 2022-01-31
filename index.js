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
    console.log('connected.');
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
    .then(response => {
      switch(response.action) {
          case 'View all departments':
              viewAll('DEPARTMENTS');
              break;
          case 'View all roles':
              viewAll('ROLES');
              break;
          case 'View all employees':
              viewAll('EMPLOYEES');
              break;
          case 'Add a department':
              addDepartment();
              break;
          case 'Add a role':
              addRole();
              break;
          case 'Add an employee':
              addEmployee();
              break;
          case 'Update an employee role':
              updateEmployee();
              break; 
          default:
              Connection.end();         
      }
    })
    .catch(err => {
        console.log(err);
    });
}; // end inquirer

viewDepartment = () => {

}; // end viewDepartment function

viewRoles = () => {

}; // end viewRoles function

viewEmployee = () => {

}; // End viewEmployee function

addDepartment = () => {

}; // end addDepartment function

addRole = () => {

}; // end addRole function

addEmployee = () => {

}; // end addEmployee function

updateEmployee = () => {

}; // end updateEmployee function