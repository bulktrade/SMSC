DECLARE
id_customer number(19,0);
id_user number(19,0);
id_admin number(19,0);
id_role_user number(19,0);
id_role_admin number(19,0);
id_dashboard number(19,0);
id_type_1 number(19,0);
id_type_2 number(19,0);
id_type_3 number(19,0);
id_type_4 number(19,0);
id_type_5 number(19,0);
id_type_6 number(19,0);

BEGIN
INSERT INTO CUSTOMER (ID, COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
  (customer_seq.nextval, 'SMSC', 'Amtsgericht', 'Amtsgericht', '3254', 'Germany', 'Stuttgart', 5672394.0, current_timestamp, 0) RETURNING ID INTO id_customer;

  INSERT INTO CUSTOMER (ID, COMPANY_NAME, STREET, STREET2, POSTCODE, COUNTRY, CITY, VATID, LAST_MODIFIED_DATE, VERSION) VALUES
    (customer_seq.nextval, 'Default company', 'First default street', 'Second default street', '9119', 'Ukraine', 'Lviv', 1234567.0, current_timestamp, 0);

  INSERT INTO CUSTOMER_CONTACT (ID, FIRST_NAME, SURNAME, PHONE, MOBILE_PHONE, FAX, EMAIL_ADDRESS, CUSTOMER_ID, SALUTATION, TYPE, LAST_MODIFIED_DATE, VERSION) VALUES
    (customer_contact_seq.nextval, 'SMSC', 'SMSC', '0674329568', '0504569753', 'fake_fax', 'smsc@bulk.io', id_customer, 'MR', 'CEO', current_timestamp, 0);

  INSERT INTO CUSTOMER_USER_ACCOUNT (ID, USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
    (customer_user_account_seq.nextval, 'user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', 1, 0, 'MR', current_timestamp, current_timestamp, 0, id_customer);
  INSERT INTO CUSTOMER_USER_ACCOUNT (ID, USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION, CUSTOMER_ID) VALUES
    (customer_user_account_seq.nextval, 'admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', 1, 0, 'MRS', current_timestamp, current_timestamp, 0, id_customer);

  INSERT INTO USER_ACCOUNT (ID, USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
    (user_account_seq.nextval, 'user', '541338d92cd0dbf230d7e7666dd99adaea8da7a478f5456947c2445aecea0b1a', 'ad68dc115126d9d1', 'userName', 'userSurname', 'user@gmail.com', 1, 0, 'MR', current_timestamp, current_timestamp, 0) RETURNING ID INTO id_user;
  INSERT INTO USER_ACCOUNT (ID, USERNAME, PASSWORD, SALT, FIRST_NAME, SURNAME, EMAIL, ACTIVE, BLOCKED, SALUTATION, CREATED, LAST_MODIFIED_DATE, VERSION) VALUES
    (user_account_seq.nextval, 'admin', 'b03209e6c608cdf3753ab36449703abeab6aa7aab628e569b37a55381d4aa021', '94bd6b18b8f70298', 'adminName', 'adminSurname', 'admin@gmail.com', 1, 0, 'MRS', current_timestamp, current_timestamp, 0) RETURNING ID INTO id_admin;

  INSERT INTO ROLE (ID, NAME, LAST_MODIFIED_DATE, VERSION) VALUES
    (role_seq.nextval, 'ROLE_USER', current_timestamp, 0) RETURNING ID INTO id_role_user;
  INSERT INTO ROLE (ID, NAME, LAST_MODIFIED_DATE, VERSION) VALUES
    (role_seq.nextval, 'ROLE_ADMIN', current_timestamp, 0) RETURNING ID INTO id_role_admin;

  INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
    (id_user, id_role_user);
  INSERT INTO USER_ROLE (USER_ID, ROLE_ID) VALUES
    (id_admin, id_role_admin);

  INSERT INTO DASHBOARD (ID, NAME, ICON, USER_ACCOUNT_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_seq.nextval, 'default', 'user', id_user, current_timestamp, 0) RETURNING ID INTO id_dashboard;

  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Ivan feeds', 'STATUS', 'FEEDBACK_STATUS', current_timestamp, 0) RETURNING ID INTO id_type_1;
  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Petia profit', 'CHART', 'PIE_CHART', current_timestamp, 0) RETURNING ID INTO id_type_2;
  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Rusia chart profit', 'CHART', 'SERIAL_CHART', current_timestamp, 0) RETURNING ID INTO id_type_3;
  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Ivan chart profit', 'CHART', 'LINE_CHART', current_timestamp, 0) RETURNING ID INTO id_type_4;
  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Kolia chart profit', 'CHART', 'BAR_CHART', current_timestamp, 0) RETURNING ID INTO id_type_5;
  INSERT INTO DASHBOARD_BOX_TYPE (ID, NAME, TYPE, KIND, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_type_seq.nextval, 'Masha bubble chartat', 'CHART', 'BUBBLE_CHART', current_timestamp, 0) RETURNING ID INTO id_type_6;

  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_25', 'HEIGHT_25', 1, 'Box 1',  'Box 1 desc', id_dashboard, id_type_1, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_25', 'HEIGHT_25', 2, 'Box 2',  'Box 2 desc', id_dashboard, id_type_1, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_25', 'HEIGHT_25', 3, 'Box 3',  'Box 3 desc', id_dashboard, id_type_1, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_25', 'HEIGHT_25', 4, 'Box 4',  'Box 4 desc', id_dashboard, id_type_1, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_50', 'HEIGHT_50', 5, 'Box 5',  'Box 5 desc', id_dashboard, id_type_2, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_50', 'HEIGHT_50', 6, 'Box 6',  'Box 6 desc', id_dashboard, id_type_3, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_50', 'HEIGHT_50', 7, 'Box 7',  'Box 7 desc', id_dashboard, id_type_4, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_50', 'HEIGHT_50', 8, 'Box 8',  'Box 8 desc', id_dashboard, id_type_5, current_timestamp, 0);
  INSERT INTO DASHBOARD_BOX (ID, WIDTH, HEIGHT, ORDER_NUMBER, NAME, DESCRIPTION, DASHBOARD_ID, DASHBOARD_BOX_TYPE_ID, LAST_MODIFIED_DATE, VERSION) VALUES
    (dashboard_box_seq.nextval, 'WIDTH_50', 'HEIGHT_50', 9, 'Box 9',  'Box 9 desc', id_dashboard, id_type_6, current_timestamp, 0);

  INSERT INTO ACL_SID (ID, PRINCIPAL, SID, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_sid_seq.nextval, 1, 'user', current_timestamp, 0);
  INSERT INTO ACL_SID (ID, PRINCIPAL, SID, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_sid_seq.nextval, 1, 'admin', current_timestamp, 0);

  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.acl.AclClass', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.acl.AclEntry', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.acl.AclObjectIdentity', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.acl.AclSid', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.admin.User', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.admin.Role', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.admin.Authority', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.customer.Customer', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.customer.Contact', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.customer.User', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.dashboard.Dashboard', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.dashboard.DashboardBox', current_timestamp, 0);
  INSERT INTO ACL_CLASS (ID, CLASS, LAST_MODIFIED_DATE, VERSION) VALUES
    (acl_class_seq.nextval, 'io.smsc.model.dashboard.DashboardBoxType', current_timestamp, 0);
END;

