INSERT INTO USER_ACCOUNT (id, username, password, first_name, surName, email) VALUES
  (1, 'User', 'ZulhwB27UKBqJPYk2f9UQg==', 'userName', 'userSurname', 'user@gmail.com');

INSERT INTO USER_ACCOUNT (id, username, password, first_name, surName, email) VALUES
  (2, 'Admin', 'GmcYVu1XLNFLwfDvnrzJPw==', 'adminName', 'adminSurname', 'admin@gmail.com');

INSERT INTO ROLE (id, name) VALUES
  (3, 'USER');

INSERT INTO ROLE (id, name) VALUES
  (4, 'ADMIN');

INSERT INTO PERMISSION (id, name) VALUES
  (5, 'READ_USER');

INSERT INTO PERMISSION (id, name) VALUES
  (6, 'UPDATE_USER');

INSERT INTO PERMISSION (id, name) VALUES
  (7, 'CREATE_USER');

INSERT INTO PERMISSION (id, name) VALUES
  (8, 'DELETE_USER');

INSERT INTO PERMISSION (id, name) VALUES
  (9, 'READ_OWN_USER');

INSERT INTO PERMISSION (id, name) VALUES
  (10, 'UPDATE_OWN_USER');

INSERT INTO USER_ROLE (user_id, role_id) VALUES
  (1, 3);

INSERT INTO USER_ROLE (user_id, role_id) VALUES
  (2, 4);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (3, 9);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (3, 10);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 5);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 6);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 7);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 8);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 9);

INSERT INTO ROLE_PERMISSION (role_id, permission_id) VALUES
  (4, 10);


