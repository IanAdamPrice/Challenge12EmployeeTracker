INSERT INTO department
    (name)
VALUES
    ('IT'),
    ('HUMAN RESOURCE'),
    ('RETAIL'),
    ('MAINTENANCE');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('IT', 80000, 1),
    ('Clerk', 40000, 3),
    ('Electrician', 70000, 4),
    ('Secretary', 60000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tom', 'Burt', 2, NULL),
    ('Clarice', 'Halifax', 3, NULL),
    ('Bob', 'Clark', 1, NULL),
    ('Jim', 'Fischer', 4, NULL),
    ('Amy', 'Blevins', 2, 1),
    ('Josh', 'Hart', 3, 2),
    ('Billy', 'Joel', 1, 3),
    ('Ashley', 'Gray', 4, 4);