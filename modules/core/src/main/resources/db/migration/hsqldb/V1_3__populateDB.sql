-- CALL IDENTITY() return last inserted id value but cannot be set in variable

INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Default company', 'First default street', 'Second default street', '9119', 'Ukraine', 'Lviv', '1234567.0', current_timestamp, 0);
INSERT INTO CUSTOMER (COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'Amtsgericht', 'Amtsgericht', '3254', 'Germany', 'Stuttgart', '5672394.0', current_timestamp, 0);

INSERT INTO CUSTOMER_CONTACT (FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
  ('Default first name', 'Default surname', '0671234567', '0501234567', 'default fax', 'default@gmail.com', (select id from customer where company_name = 'Default company'), 'MRS', 'CEO', current_timestamp, 0);
INSERT INTO CUSTOMER_CONTACT (FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
  ('SMSC', 'SMSC', '0674329568', '0504569753', 'fake_fax', 'smsc@bulk.io', (select id from customer where company_name = 'SMSC'), 'MR', 'CEO', current_timestamp, 0);

INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, 'MR', current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'Default company'));
INSERT INTO CUSTOMER_USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
  ('admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, 'MRS', current_timestamp, current_timestamp, 0, (select id from customer where company_name = 'SMSC'));

INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', TRUE, FALSE, 'MR', current_timestamp, current_timestamp, 0);
INSERT INTO USER_ACCOUNT (USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
  ('admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', TRUE, FALSE, 'MRS', current_timestamp, current_timestamp, 0);

INSERT INTO ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_ADMIN_USER', current_timestamp, 0);
INSERT INTO ROLE (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('ROLE_POWER_ADMIN_USER', current_timestamp, 0);

INSERT INTO AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('EXECUTE_PROCESS', current_timestamp, 0);
INSERT INTO AUTHORITY (NAME, LAST_MODIFIED_DATE, VERSION) VALUES
  ('KILL_PROCESS', current_timestamp, 0);

INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'user'), (select id from role where name = 'ROLE_ADMIN_USER'));
INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
  ((select id from user_account where username = 'admin'), (select id from role where name = 'ROLE_POWER_ADMIN_USER'));

INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES
  ((select id from user_account where username = 'admin'), (select id from authority where name = 'EXECUTE_PROCESS'));
INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES
  ((select id from user_account where username = 'admin'), (select id from authority where name = 'KILL_PROCESS'));

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

INSERT INTO ACL_SID (PRINCIPAL, SID, LAST_MODIFIED_DATE, VERSION) VALUES
  (TRUE, 'user', current_timestamp, 0);
INSERT INTO ACL_SID (PRINCIPAL, SID,LAST_MODIFIED_DATE, VERSION) VALUES
  (TRUE, 'admin', current_timestamp, 0);

-- INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
--   ('io.smsc.model.acl.AclClass', current_timestamp, 0);
-- INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
--   ('io.smsc.model.acl.AclEntry', current_timestamp, 0);
-- INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
--   ('io.smsc.model.acl.AclObjectIdentity', current_timestamp, 0);
-- INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
--   ('io.smsc.model.acl.AclSid', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.admin.User', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.Role', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.Authority', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.customer.Customer', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.customer.Contact', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.customer.User', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.dashboard.Dashboard', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.dashboard.DashboardBox', current_timestamp, 0);
INSERT INTO ACL_CLASS (CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
  ('io.smsc.model.dashboard.DashboardBoxType', current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.admin.User'), (select id from user_account where username = 'user'), null, (select id from acl_sid where sid = 'user'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.admin.User'), (select id from user_account where username = 'admin'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.Role'), (select id from role where name = 'ROLE_ADMIN_USER'), null, (select id from acl_sid where sid = 'user'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.Role'), (select id from role where name = 'ROLE_POWER_ADMIN_USER'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.Authority'), (select id from authority where name = 'EXECUTE_PROCESS'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.Authority'), (select id from authority where name = 'KILL_PROCESS'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.Customer'), (select id from customer where company_name = 'SMSC'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.Customer'), (select id from customer where company_name = 'Default company'), null, (select id from acl_sid where sid = 'user'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.Contact'), (select id from customer_contact where email_address = 'smsc@bulk.io'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.Contact'), (select id from customer_contact where email_address = 'default@gmail.com'), null, (select id from acl_sid where sid = 'user'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.User'), (select id from customer_user_account where username = 'user'), null, (select id from acl_sid where sid = 'user'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.customer.User'), (select id from customer_user_account where username = 'admin'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.Dashboard'), (select id from dashboard where name = 'default'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 1), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 2), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 3), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 4), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 5), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 6), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 7), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 8), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBox'), (select id from dashboard_box where order_number = 9), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Ivan feeds'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Petia profit'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Rusia chart profit'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Ivan chart profit'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Kolia chart profit'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);
INSERT INTO ACL_OBJECT_IDENTITY (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY, PARENT_OBJECT, OWNER_SID, ENTRIES_INHERITING, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_class where class = 'io.smsc.model.dashboard.DashboardBoxType'), (select id from dashboard_box_type where name = 'Masha bubble chartat'), null, (select id from acl_sid where sid = 'admin'), 0, current_timestamp, 0);

-- user has permissions to read his own user, customer user, customer and contacts data

INSERT INTO ACL_ENTRY(ACL_OBJECT_IDENTITY, ACE_ORDER, SID, MASK, GRANTING, AUDIT_SUCCESS, AUDIT_FAILURE, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_object_identity where object_id_class = (select id from acl_class where class = 'io.smsc.model.admin.User') and object_id_identity = (select id from user_account where username = 'user')), 1, (select id from acl_sid where sid = 'user'), 1, 1, 1, 1, current_timestamp, 0);

INSERT INTO ACL_ENTRY(ACL_OBJECT_IDENTITY, ACE_ORDER, SID, MASK, GRANTING, AUDIT_SUCCESS, AUDIT_FAILURE, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_object_identity where object_id_class = (select id from acl_class where class = 'io.smsc.model.customer.User') and object_id_identity = (select id from user_account where username = 'user')), 1, (select id from acl_sid where sid = 'user'), 1, 1, 1, 1, current_timestamp, 0);

INSERT INTO ACL_ENTRY(ACL_OBJECT_IDENTITY, ACE_ORDER, SID, MASK, GRANTING, AUDIT_SUCCESS, AUDIT_FAILURE, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_object_identity where object_id_class = (select id from acl_class where class = 'io.smsc.model.customer.Customer') and object_id_identity = (select id from customer where company_name = 'Default company')), 1, (select id from acl_sid where sid = 'user'), 1, 1, 1, 1, current_timestamp, 0);

INSERT INTO ACL_ENTRY(ACL_OBJECT_IDENTITY, ACE_ORDER, SID, MASK, GRANTING, AUDIT_SUCCESS, AUDIT_FAILURE, LAST_MODIFIED_DATE, VERSION) VALUES
  ((select id from acl_object_identity where object_id_class = (select id from acl_class where class = 'io.smsc.model.customer.Contact') and object_id_identity = (select id from customer_contact where email_address = 'default@gmail.com')), 1, (select id from acl_sid where sid = 'user'), 1, 1, 1, 1, current_timestamp, 0);

