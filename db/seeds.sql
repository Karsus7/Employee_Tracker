insert into departments(name)
values ("Sales"),("Engineering"),("Finance"),("Legal");

insert into roles(title, salary, department_id)
values  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Lead Accountant", 125000, 3),
        ("Accountant", 105000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

insert into employees(first_name, last_name, role_id, manager_id)
values  ('James', 'Steel',1,null),
        ('Eric', 'Miller',3,null),
        ('Christine', 'Pines',5,null),
        ('Laurel', 'Loehlin',7,null),
        ('Max', 'Reece',2,1),
        ('Darin', 'Rankin',2,1),
        ('Danny', 'Hutchinson',4,2),
        ('Sophia', 'Garcia',4,2),
        ('Maria', 'Valdez',6,3),
        ('Amir', 'Castillo',6,3),
        ('Jerry', 'Coates',8,4),
        ('Christian', 'Kneupper',8,4),
        ('Dax', 'Wall',2,1),
        ('Shannon', 'Haley',4,2),
        ('Edda', 'Mcfadde',6,3);