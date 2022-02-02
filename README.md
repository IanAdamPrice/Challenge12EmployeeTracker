# Challenge12EmployeeTracker

## Visual Demo

## Description
Employee-tracker is a node application that utilizes Node.js, Inquirer, and MySQL. It is a command-line application that allows you to add a departments, roles, and employees that is stored to a table where you can view all employees. 

### User Story
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
-  SO THAT I can organize and plan my business

### Acceptance Crtieria
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation
- Download via the repository on GitHub
- In the command line of the root folder type npm i
- THEN type npm install inquirer
- THEN type npm install --save mysql2

## Usage 
- In the command-line type node index.js
- Make a selection among the choices
- to quit press crtl c

## Additional Information
- GitHub: [ianadamprice](https://github.com/ianadamprice)
- GitHub Repository: [Note-Taker](https://github.com/IanAdamPrice/Note-Taker)
- Email: Ianadamprice@gmail.com
