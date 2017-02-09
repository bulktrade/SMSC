-- scope_identity() return last inserted id value but cannot be set in variable

INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'Amtsgericht', 'Amtsgericht', '3254', 'Germany', 'Stuttgart', 5672394.0, current_timestamp, 0);
INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Default company', 'First default street', 'Second default street', '9119', 'Ukraine', 'Lviv', 1234567.0, current_timestamp, 0);

INSERT INTO CUSTOMER_CONTACT (FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'SMSC', '0674329568', '0504569753', 'fake_fax', 'smsc@bulk.io', (select id from customer where company_name = 'SMSC'), 'MR', 'CEO', current_timestamp, 0);

INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'SMSC'));
INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'SMSC'));

INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, current_timestamp, current_timestamp, 0);

INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, current_timestamp, current_timestamp, 0);

INSERT INTO ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_USER', current_timestamp, 0);

INSERT INTO ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_ADMIN', current_timestamp, 0);

INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from role where name = 'ROLE_USER'));
INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'admin'), (select id from role where name = 'ROLE_ADMIN'));

INSERT INTO DASHBOARD (NAME, ICON, USER_ACCOUNT_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('default', 'user', (select id from user_account where username = 'user'), current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Ivan feeds', 'STATUS', 'FEEDBACK_STATUS', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Petia profit', 'CHART', 'PIE_CHART', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Rusia chart profit', 'CHART', 'SERIAL_CHART', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Ivan chart profit', 'CHART', 'LINE_CHART', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Kolia chart profit', 'CHART', 'BAR_CHART', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX_TYPE (NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Masha bubble chartat', 'CHART', 'BUBBLE_CHART', current_timestamp, 0);

INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_25', 'HEIGHT_25', 1, 'Box 1',  'Box 1 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Ivan feeds'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_25', 'HEIGHT_25', 2, 'Box 2',  'Box 2 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Ivan feeds'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_25', 'HEIGHT_25', 3, 'Box 3',  'Box 3 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Ivan feeds'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_25', 'HEIGHT_25', 4, 'Box 4',  'Box 4 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Ivan feeds'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_50', 'HEIGHT_50', 5, 'Box 5',  'Box 5 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Petia profit'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_50', 'HEIGHT_50', 6, 'Box 6',  'Box 6 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Rusia chart profit'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_50', 'HEIGHT_50', 7, 'Box 7',  'Box 7 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Ivan chart profit'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_50', 'HEIGHT_50', 8, 'Box 8',  'Box 8 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Kolia chart profit'), current_timestamp, 0);
INSERT INTO DASHBOARD_BOX (WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('WIDTH_50', 'HEIGHT_50', 9, 'Box 9',  'Box 9 desc', (select id from dashboard where name = 'default'), (select id from dashboard_box_type where name = 'Masha bubble chartat'), current_timestamp, 0);