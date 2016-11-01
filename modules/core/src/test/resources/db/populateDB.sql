DELETE FROM users;
DELETE FROM roles;
DELETE FROM permissions;

INSERT INTO users (username, password, firstName, surName, email) VALUES
  ('user', 'password', 'userName', 'userSurname', 'user@gmail.com'),
  ('admin', 'admin', 'adminName', 'adminSurname', 'admin@gmail.com');


INSERT INTO roles (name) VALUES
  ('ROLE_USER'),
  ('ROLE_ADMIN');

INSERT INTO permissions (name) VALUES
  ('PERMISSION_READ_ONLY'),
  ('PERMISSION_READ_WRITE');

INSERT INTO users_roles (user_id, role_id) VALUES
  (1, 3),
  (2, 4);

INSERT INTO roles_permissions (role_id, permission_id) VALUES
  (3, 5),
  (4, 6);
