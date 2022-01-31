const mysql = require('mysql');
const inquier = require('inquirer');
const table = require('console.table');
const { connect } = require('./db/connection');
const Connection = require('mysql2/typings/mysql/lib/Connection');

startQuestions => {
  const questions = [{
      type: 'list',
      name: 'action',
      message: 'Please make a selection',
      loop: false,
      choices: [' View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
  }]

  inquier.prompt(questions)
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

const viewAll = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateEmployee = () => {

};