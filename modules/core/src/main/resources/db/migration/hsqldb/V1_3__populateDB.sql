-- CALL IDENTITY() return last inserted id value but cannot be set in variable

INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Default company', 'First default street', 'Second default street', '9119', 'Ukraine', 'Lviv', '1234567.0', current_timestamp, 0);
INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'Amtsgericht', 'Amtsgericht', '3254', 'Germany', 'Stuttgart', '5672394.0', current_timestamp, 0);

INSERT INTO CONTACT (FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Default first name', 'Default surname', '0671234567', '0501234567', 'default fax', 'default@gmail.com', (select id from customer where company_name = 'Default company'), 'MRS', 'CEO', current_timestamp, 0);
INSERT INTO CONTACT (FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'SMSC', '0674329568', '0504569753', 'fake_fax', 'smsc@bulk.io', (select id from customer where company_name = 'SMSC'), 'MR', 'CEO', current_timestamp, 0);

INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('user', '$2a$10$a3a2Kyi1qbe/SHxTM51khOFMM5kWtzhZgEPcwjmr.DlT8oLh6Eeda', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, 'MR', current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'Default company'));
INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('admin', '$2a$10$i2sFEDw4WXZt7tKz9bpin.kkA0NrEJnJ07Uf5e0JEcKRhXeHOvF1K', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, 'MRS', current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'SMSC'));

INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('user', '$2a$10$a3a2Kyi1qbe/SHxTM51khOFMM5kWtzhZgEPcwjmr.DlT8oLh6Eeda', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, 'MR', current_timestamp, current_timestamp, 0);
INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('admin', '$2a$10$i2sFEDw4WXZt7tKz9bpin.kkA0NrEJnJ07Uf5e0JEcKRhXeHOvF1K', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, 'MRS', current_timestamp, current_timestamp, 0);
INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('demo', '$2a$10$iWvz1Yik784hP54My05uTekx7XxDfLekDyoCJjxK6PuyDnTMzswSK', 'demoName', 'demoSurname', 'demo@gmail.com', TRUE, FALSE, 'MR', current_timestamp, current_timestamp, 0);

INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_READ_ONLY', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_ADMIN', current_timestamp, 0);
INSERT INTO ADMIN_USER_GROUP (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_READ_ONLY', current_timestamp, 0);

INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CONTACT_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_USER_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('DASHBOARD_BOX_TYPE_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('AUTHORITY_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('CUSTOMER_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_GROUP_COUNT', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_READ', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_WRITE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_CREATE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_DELETE', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_EXISTS', current_timestamp, 0);
INSERT INTO ADMIN_USER_AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ADMIN_USER_ROLE_COUNT', current_timestamp, 0);

INSERT INTO ADMIN_USER_ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_ADMIN_USER', current_timestamp, 0);
INSERT INTO ADMIN_USER_ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_POWER_ADMIN_USER', current_timestamp, 0);

INSERT INTO ADMIN_USER_ROLE_USER (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_role where name = 'ROLE_ADMIN_USER'));
INSERT INTO ADMIN_USER_ROLE_USER (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'admin'), (select id from admin_user_role where name = 'ROLE_POWER_ADMIN_USER'));
INSERT INTO ADMIN_USER_ROLE_USER (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_role where name = 'ROLE_ADMIN_USER'));

INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_READ_ONLY'), (select id from admin_user_authority where name = 'ADMIN_USER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_ADMIN'), (select id from admin_user_authority where name = 'CONTACT_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CONTACT_READ_ONLY'), (select id from admin_user_authority where name = 'CONTACT_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_USER_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_USER_READ_ONLY'), (select id from admin_user_authority where name = 'CUSTOMER_USER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_READ_ONLY'), (select id from admin_user_authority where name = 'DASHBOARD_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_READ_ONLY'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_READ_ONLY'), (select id from admin_user_authority where name = 'DASHBOARD_BOX_TYPE_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_ADMIN'), (select id from admin_user_authority where name = 'AUTHORITY_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'AUTHORITY_READ_ONLY'), (select id from admin_user_authority where name = 'AUTHORITY_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_ADMIN'), (select id from admin_user_authority where name = 'CUSTOMER_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'CUSTOMER_READ_ONLY'), (select id from admin_user_authority where name = 'CUSTOMER_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_GROUP_READ_ONLY'), (select id from admin_user_authority where name = 'ADMIN_USER_GROUP_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_READ'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_WRITE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_CREATE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_DELETE'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_EXISTS'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_COUNT'));
INSERT INTO ADMIN_USER_GROUP_AUTHORITY (GROUP_ID, AUTHORITY_ID) VALUES
  ((select id from admin_user_group where name = 'ADMIN_USER_ROLE_READ_ONLY'), (select id from admin_user_authority where name = 'ADMIN_USER_ROLE_READ'));

INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'ADMIN_USER_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'CONTACT_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'CUSTOMER_USER_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'DASHBOARD_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'DASHBOARD_BOX_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'AUTHORITY_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'CUSTOMER_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'ADMIN_USER_GROUP_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from admin_user_group where name = 'ADMIN_USER_ROLE_ADMIN'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'ADMIN_USER_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'CONTACT_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'CUSTOMER_USER_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'DASHBOARD_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'DASHBOARD_BOX_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'DASHBOARD_BOX_TYPE_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'AUTHORITY_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'CUSTOMER_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'ADMIN_USER_GROUP_READ_ONLY'));
INSERT INTO ADMIN_USER_GROUP_USER (USER_ID, GROUP_ID) VALUES
  ((select id from user_account where username = 'demo'), (select id from admin_user_group where name = 'ADMIN_USER_ROLE_READ_ONLY'));

INSERT INTO DASHBOARD (NAME, ICON, USER_ACCOUNT_ID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('default', 'user', (select id from user_account where username = 'admin'), current_timestamp, 0);

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
