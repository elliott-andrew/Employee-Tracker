DROP DATABASE IF EXISTS employee_summaryDB;
CREATE database employee_summaryDB;

USE employee_summaryDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO department VALUES (1, 'Men\'s Clothing');
INSERT INTO department VALUES (2, 'Women\'s Clothing');
INSERT INTO department VALUES (3, 'Toy Department');

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);
INSERT INTO role VALUES (1, 'Manager', 200000.00, 1);
INSERT INTO role VALUES (2, 'Manager', 300000.00, 2);
INSERT INTO role VALUES (3, 'Cashier', 45000.00, 1);
INSERT INTO role VALUES (4, 'Cashier', 54000.00, 2);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES role(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);
INSERT INTO employee VALUES (1, 'Harris', 'Milstead', 1, null);
INSERT INTO employee VALUES (2, 'John', 'Waters', 2, null);
INSERT INTO employee VALUES (3, 'Hem', 'The Cat', 3, 1);
INSERT INTO employee VALUES (4, 'Kyle', 'The Cat', 4, 2);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;

-- SELECT 
-- d.name,
-- r.title,
-- e.role_id,
-- e.first_name,
-- e.last_name,
-- r.salary,
-- e.manager_id
-- FROM department d
-- JOIN role r
-- 	ON d.id = r.department_id
-- JOIN employee e
-- 	ON e.role_id = r.id