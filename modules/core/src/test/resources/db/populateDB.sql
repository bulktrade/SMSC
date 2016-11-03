DELETE FROM USERS;
DELETE FROM ROLES;
DELETE FROM PERMISSIONS;
DELETE FROM users_roles;
DELETE FROM roles_permissions;

INSERT INTO USERS (id, username, password, first_name, surName, email) VALUES
  (50, 'user', 'password', 'userName', 'userSurname', 'user@gmail.com'),
  (51, 'admin', 'admin', 'adminName', 'adminSurname', 'admin@gmail.com');

INSERT INTO ROLES (id, name) VALUES
  (150, 'ROLE_USER'),
  (151, 'ROLE_ADMIN');

INSERT INTO PERMISSIONS (id, name) VALUES
  (250, 'PERMISSION_READ_ONLY'),
  (251, 'PERMISSION_READ_WRITE');

INSERT INTO users_roles (user_id, role_id) VALUES
  (50, 150),
  (51, 151);

INSERT INTO roles_permissions (role_id, permission_id) VALUES
  (150, 250),
  (151, 251);
