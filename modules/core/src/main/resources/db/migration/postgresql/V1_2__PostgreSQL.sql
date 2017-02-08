create sequence acl_class_seq;

create sequence acl_entry_seq;

create sequence acl_object_identity_seq;

create sequence acl_sid_seq;

create sequence customer_contact_seq;

create sequence customer_seq START WITH 40000 INCREMENT BY 1;

create sequence customer_user_account_seq;

create sequence dashboard_box_seq;

create sequence dashboard_box_type_seq;

create sequence dashboard_seq;

create sequence role_seq;

create sequence user_account_seq;

create table ACL_CLASS (
        ID int8 not null default nextval('acl_class_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        CLASS varchar(255) not null,
        primary key (ID)
    );

    create table ACL_ENTRY (
        ID int8 not null default nextval('acl_entry_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        ACE_ORDER int4 not null,
        AUDIT_FAILURE boolean not null,
        AUDIT_SUCCESS boolean not null,
        GRANTING boolean not null,
        MASK int4 not null,
        ACL_OBJECT_IDENTITY int8 not null,
        SID int8 not null,
        primary key (ID)
    );

    create table ACL_OBJECT_IDENTITY (
        ID int8 not null default nextval('acl_object_identity_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        ENTRIES_INHERITING boolean not null,
        OBJECT_ID_IDENTITY int8 not null,
        OBJECT_ID_CLASS int8 not null,
        OWNER_SID int8 not null,
        PARENT_OBJECT int8,
        primary key (ID)
    );

    create table ACL_SID (
        ID int8 not null default nextval('acl_sid_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        PRINCIPAL boolean not null,
        SID varchar(255) not null,
        primary key (ID)
    );

    create table CUSTOMER (
        ID int8 not null default nextval('customer_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        CITY varchar(255) not null,
        COMPANY_NAME varchar(255) not null,
        COUNTRY varchar(255) not null,
        POSTCODE varchar(255) not null,
        STREET varchar(255) not null,
        STREET2 varchar(255) not null,
        VATID float8,
        PARENT_CUSTOMER_ID int8,
        primary key (ID)
    );

    create table CUSTOMER_CONTACT (
        ID int8 not null default nextval('customer_contact_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        EMAIL_ADDRESS varchar(255) not null,
        FAX varchar(255) not null,
        FIRST_NAME varchar(255) not null,
        MOBILE_PHONE varchar(255) not null,
        PHONE varchar(255) not null,
        SALUTATION varchar(255) not null,
        SURNAME varchar(255) not null,
        TYPE varchar(255) not null,
        CUSTOMER_ID int8 not null,
        primary key (ID)
    );

    create table CUSTOMER_USER_ACCOUNT (
        ID int8 not null default nextval('customer_user_account_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        ACTIVE boolean not null,
        BLOCKED boolean not null,
        CREATED timestamp not null,
        EMAIL varchar(255) not null,
        FIRST_NAME varchar(255) not null,
        PASSWORD varchar(255) not null,
        SALT varchar(255),
        SURNAME varchar(255) not null,
        USERNAME varchar(255) not null,
        CUSTOMER_ID int8 not null,
        primary key (ID)
    );

    create table DASHBOARD (
        ID int8 not null default nextval('dashboard_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        ICON varchar(255) not null,
        NAME varchar(255) not null,
        USER_ACCOUNT_ID int8 not null,
        primary key (ID)
    );

    create table DASHBOARD_BOX (
        ID int8 not null default nextval('dashboard_box_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        DESCRIPTION varchar(255) not null,
        HEIGHT varchar(255) not null,
        NAME varchar(255) not null,
        ORDER_NUMBER int4 not null,
        WIDTH varchar(255) not null,
        DASHBOARD_ID int8 not null,
        DASHBOARD_BOX_TYPE_ID int8 not null,
        primary key (ID)
    );

    create table DASHBOARD_BOX_TYPE (
        ID int8 not null default nextval('dashboard_box_type_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        KIND varchar(255) not null,
        NAME varchar(255) not null,
        TYPE varchar(255) not null,
        primary key (ID)
    );

    create table ROLE (
        ID int8 not null default nextval('role_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        NAME varchar(255) not null,
        primary key (ID)
    );

    create table USER_ACCOUNT (
        ID int8 not null default nextval('user_account_seq'),
        LAST_MODIFIED_DATE timestamp not null,
        VERSION int8 not null,
        ACTIVE boolean not null,
        BLOCKED boolean not null,
        CREATED timestamp not null,
        EMAIL varchar(255) not null,
        FIRST_NAME varchar(255) not null,
        PASSWORD varchar(255) not null,
        SALT varchar(255),
        SURNAME varchar(255) not null,
        USERNAME varchar(255) not null,
        primary key (ID)
    );

    create table USER_ROLE (
        USER_ID int8 not null,
        ROLE_ID int8 not null,
        primary key (USER_ID, ROLE_ID)
    );

    alter table ACL_CLASS 
        add constraint UK_b9jm6yrofuhriaet5qlvaa2sb  unique (CLASS);

    alter table ACL_ENTRY 
        add constraint acl_identity_order_idx  unique (ACL_OBJECT_IDENTITY, ACE_ORDER);

    alter table ACL_ENTRY 
        add constraint UK_2udy4xgijqxsi2enlqmp1ryoi  unique (ACE_ORDER);

    alter table ACL_ENTRY 
        add constraint UK_4rfb2hf1mgefbvivqlb3uhc1o  unique (ACL_OBJECT_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint acl_class_identity_idx  unique (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint UK_sqoxny9iftavslu22wdw45s5j  unique (OBJECT_ID_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint UK_93h9hjf8xedn5xo7gagsy6fth  unique (OBJECT_ID_CLASS);

    alter table ACL_SID 
        add constraint acl_sid_principal_idx  unique (SID, PRINCIPAL);

    alter table ACL_SID 
        add constraint UK_iffjecpr10qe7c08yilqi4mi6  unique (SID);

    alter table CUSTOMER_CONTACT 
        add constraint UK_rt1h2souk5fkc2l0yojlch8ng  unique (EMAIL_ADDRESS);

    alter table CUSTOMER_USER_ACCOUNT 
        add constraint UK_ocoo1ta18u6p16unw7h8b7i8h  unique (USERNAME);

    alter table DASHBOARD 
        add constraint UK_k452w4cpbviagh85ll1q6gfc  unique (NAME);

    alter table DASHBOARD_BOX_TYPE 
        add constraint UK_calopw9wexb9vek0fnkaotp2n  unique (NAME);

    alter table ROLE 
        add constraint UK_lqaytvswxwacb7s84gcw7tk7l  unique (NAME);

    alter table USER_ACCOUNT 
        add constraint UK_5b1ufubngfek527jhb11aure0  unique (USERNAME);

    alter table ACL_ENTRY 
        add constraint FK_4rfb2hf1mgefbvivqlb3uhc1o 
        foreign key (ACL_OBJECT_IDENTITY) 
        references ACL_OBJECT_IDENTITY;

    alter table ACL_ENTRY 
        add constraint FK_pwqqgnc867uhlp6ra8f6cu44d 
        foreign key (SID) 
        references ACL_SID;

    alter table ACL_OBJECT_IDENTITY 
        add constraint FK_93h9hjf8xedn5xo7gagsy6fth 
        foreign key (OBJECT_ID_CLASS) 
        references ACL_CLASS;

    alter table ACL_OBJECT_IDENTITY 
        add constraint FK_47mv8is8lo3t2rm4n7a9oatpy 
        foreign key (OWNER_SID) 
        references ACL_SID;

    alter table ACL_OBJECT_IDENTITY 
        add constraint FK_osevoaw0w5t99q4x25r4ohkm2 
        foreign key (PARENT_OBJECT) 
        references ACL_OBJECT_IDENTITY;

    alter table CUSTOMER 
        add constraint FK_k3k4147v3m5pjyjgfcrs0cdpj 
        foreign key (PARENT_CUSTOMER_ID) 
        references CUSTOMER;

    alter table CUSTOMER_CONTACT 
        add constraint FK_32q3wpxac3cbvhn1t9bxmcr81 
        foreign key (CUSTOMER_ID) 
        references CUSTOMER 
        on delete cascade;

    alter table CUSTOMER_USER_ACCOUNT 
        add constraint FK_jup37owwps8o8ntgoxdmn0th2 
        foreign key (CUSTOMER_ID) 
        references CUSTOMER 
        on delete cascade;

    alter table DASHBOARD 
        add constraint FK_agttn8ptawhkdx8qse4hnkvpr 
        foreign key (USER_ACCOUNT_ID) 
        references USER_ACCOUNT 
        on delete cascade;

    alter table DASHBOARD_BOX 
        add constraint FK_dgep5oi78i2irrmue308doxrp 
        foreign key (DASHBOARD_ID) 
        references DASHBOARD 
        on delete cascade;

    alter table DASHBOARD_BOX 
        add constraint FK_pdct77x9bvtflrsx224gkvhhs 
        foreign key (DASHBOARD_BOX_TYPE_ID) 
        references DASHBOARD_BOX_TYPE 
        on delete cascade;

    alter table USER_ROLE 
        add constraint FK_oqmdk7xj0ainhxpvi79fkaq3y 
        foreign key (ROLE_ID) 
        references ROLE;

    alter table USER_ROLE 
        add constraint FK_j2j8kpywaghe8i36swcxv8784 
        foreign key (USER_ID) 
        references USER_ACCOUNT;
