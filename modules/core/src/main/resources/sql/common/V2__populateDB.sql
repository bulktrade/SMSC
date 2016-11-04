-- DELETE FROM USERS;
-- DELETE FROM ROLES;
-- DELETE FROM PERMISSIONS;
-- DELETE FROM users_roles;
-- DELETE FROM roles_permissions;

INSERT INTO USERS (id, username, password, first_name, surName, email) VALUES
(1, 'user', 'password', 'userName', 'userSurname', 'user@gmail.com');

INSERT INTO USERS (id, username, password, first_name, surName, email) VALUES
(2, 'admin', 'admin', 'adminName', 'adminSurname', 'admin@gmail.com');

INSERT INTO ROLES (id, name) VALUES
(3, 'ROLE_USER');

INSERT INTO ROLES (id, name) VALUES
(4, 'ROLE_ADMIN');

INSERT INTO PERMISSIONS (id, name) VALUES
(5, 'PERMISSION_READ_ONLY');

INSERT INTO PERMISSIONS (id, name) VALUES
(6, 'PERMISSION_READ_WRITE');

INSERT INTO users_roles (user_id, role_id) VALUES
(1, 3);

INSERT INTO users_roles (user_id, role_id) VALUES
(2, 4);

INSERT INTO roles_permissions (role_id, permission_id) VALUES
(3, 5);

INSERT INTO roles_permissions (role_id, permission_id) VALUES
(4, 6);
