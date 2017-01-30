    drop table ACL_CLASS cascade constraints;

    drop table ACL_ENTRY cascade constraints;

    drop table ACL_OBJECT_IDENTITY cascade constraints;

    drop table ACL_SID cascade constraints;

    drop table CUSTOMER cascade constraints;

    drop table CUSTOMER_CONTACT cascade constraints;

    drop table CUSTOMER_USER_ACCOUNT cascade constraints;

    drop table DASHBOARD cascade constraints;

    drop table DASHBOARD_BOX cascade constraints;

    drop table DASHBOARD_BOX_TYPE cascade constraints;

    drop table ROLE cascade constraints;

    drop table USER_ACCOUNT cascade constraints;

    drop table USER_ROLE cascade constraints;

    create table ACL_CLASS (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        CLASS varchar2(255 char) not null,
        primary key (ID)
    );

    create table ACL_ENTRY (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        ACE_ORDER number(10,0) not null,
        AUDIT_FAILURE number(1,0) not null,
        AUDIT_SUCCESS number(1,0) not null,
        GRANTING number(1,0) not null,
        MASK number(10,0) not null,
        ACL_OBJECT_IDENTITY number(19,0) not null,
        SID number(19,0) not null,
        primary key (ID)
    );

    create table ACL_OBJECT_IDENTITY (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        ENTRIES_INHERITING number(1,0) not null,
        OBJECT_ID_IDENTITY number(19,0) not null,
        OBJECT_ID_CLASS number(19,0) not null,
        OWNER_SID number(19,0) not null,
        PARENT_OBJECT number(19,0),
        primary key (ID)
    );

    create table ACL_SID (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        PRINCIPAL number(1,0) not null,
        SID varchar2(255 char) not null,
        primary key (ID)
    );

    create table CUSTOMER (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        CITY varchar2(255 char) not null,
        COMPANY_NAME varchar2(255 char) not null,
        COUNTRY varchar2(255 char) not null,
        CUSTOMER_ID double precision not null,
        POSTCODE varchar2(255 char) not null,
        STREET varchar2(255 char) not null,
        STREET2 varchar2(255 char) not null,
        VATID double precision,
        PARENT_CUSTOMER_ID number(19,0),
        primary key (ID)
    );

    create table CUSTOMER_CONTACT (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        EMAIL_ADDRESS varchar2(255 char) not null,
        FAX varchar2(255 char) not null,
        FIRST_NAME varchar2(255 char) not null,
        MOBILE_PHONE varchar2(255 char) not null,
        PHONE varchar2(255 char) not null,
        SALUTATION varchar2(255 char) not null,
        SURNAME varchar2(255 char) not null,
        TYPE varchar2(255 char) not null,
        CUSTOMER_ID number(19,0),
        primary key (ID)
    );

    create table CUSTOMER_USER_ACCOUNT (
        CUSTOMER_ID number(19,0) not null,
        USER_ID number(19,0) not null,
        primary key (CUSTOMER_ID, USER_ID)
    );

    create table DASHBOARD (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        ICON varchar2(255 char) not null,
        NAME varchar2(255 char) not null,
        USER_ACCOUNT_ID number(19,0) not null,
        primary key (ID)
    );

    create table DASHBOARD_BOX (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        DESCRIPTION varchar2(255 char) not null,
        HEIGHT varchar2(255 char) not null,
        NAME varchar2(255 char) not null,
        ORDER_NUMBER number(10,0) not null,
        WIDTH varchar2(255 char) not null,
        DASHBOARD_ID number(19,0) not null,
        DASHBOARD_BOX_TYPE_ID number(19,0) not null,
        primary key (ID)
    );

    create table DASHBOARD_BOX_TYPE (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        KIND varchar2(255 char) not null,
        NAME varchar2(255 char) not null,
        TYPE varchar2(255 char) not null,
        primary key (ID)
    );

    create table ROLE (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        NAME varchar2(255 char) not null,
        primary key (ID)
    );

    create table USER_ACCOUNT (
        ID number(19,0) not null,
        LAST_MODIFIED_DATE timestamp not null,
        VERSION number(19,0) not null,
        ACTIVE number(1,0),
        BLOCKED number(1,0),
        CREATED timestamp,
        EMAIL varchar2(255 char) not null,
        FIRST_NAME varchar2(255 char) not null,
        PASSWORD varchar2(255 char) not null,
        SALT varchar2(255 char),
        SURNAME varchar2(255 char) not null,
        USERNAME varchar2(255 char) not null,
        primary key (ID)
    );

    create table USER_ROLE (
        USER_ID number(19,0) not null,
        ROLE_ID number(19,0) not null,
        primary key (USER_ID, ROLE_ID)
    );

    alter table ACL_CLASS 
        add constraint UK_b9jm6yrofuhriaet5qlvaa2sb  unique (CLASS);

    alter table ACL_ENTRY 
        add constraint acl_entry_object_identity_order_idx  unique (ACL_OBJECT_IDENTITY, ACE_ORDER);

    alter table ACL_ENTRY 
        add constraint UK_2udy4xgijqxsi2enlqmp1ryoi  unique (ACE_ORDER);

    alter table ACL_ENTRY 
        add constraint UK_4rfb2hf1mgefbvivqlb3uhc1o  unique (ACL_OBJECT_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint acl_object_id_class_identity_idx  unique (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint UK_sqoxny9iftavslu22wdw45s5j  unique (OBJECT_ID_IDENTITY);

    alter table ACL_OBJECT_IDENTITY 
        add constraint UK_93h9hjf8xedn5xo7gagsy6fth  unique (OBJECT_ID_CLASS);

    alter table ACL_SID 
        add constraint acl_sid_sid_principal_idx  unique (SID, PRINCIPAL);

    alter table ACL_SID 
        add constraint UK_iffjecpr10qe7c08yilqi4mi6  unique (SID);

    alter table CUSTOMER 
        add constraint UK_8eumjccoobf7t6psn9exu4gnh  unique (CUSTOMER_ID);

    alter table CUSTOMER_CONTACT 
        add constraint UK_rt1h2souk5fkc2l0yojlch8ng  unique (EMAIL_ADDRESS);

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
        references CUSTOMER;

    alter table CUSTOMER_USER_ACCOUNT 
        add constraint FK_qv4ubq6pwdjne8jwuaywdn3p7 
        foreign key (USER_ID) 
        references USER_ACCOUNT;

    alter table CUSTOMER_USER_ACCOUNT 
        add constraint FK_jup37owwps8o8ntgoxdmn0th2 
        foreign key (CUSTOMER_ID) 
        references CUSTOMER;

    alter table DASHBOARD 
        add constraint FK_agttn8ptawhkdx8qse4hnkvpr 
        foreign key (USER_ACCOUNT_ID) 
        references USER_ACCOUNT;

    alter table DASHBOARD_BOX 
        add constraint FK_dgep5oi78i2irrmue308doxrp 
        foreign key (DASHBOARD_ID) 
        references DASHBOARD;

    alter table DASHBOARD_BOX 
        add constraint FK_pdct77x9bvtflrsx224gkvhhs 
        foreign key (DASHBOARD_BOX_TYPE_ID) 
        references DASHBOARD_BOX_TYPE;

    alter table USER_ROLE 
        add constraint FK_oqmdk7xj0ainhxpvi79fkaq3y 
        foreign key (ROLE_ID) 
        references ROLE;

    alter table USER_ROLE 
        add constraint FK_j2j8kpywaghe8i36swcxv8784 
        foreign key (USER_ID) 
        references USER_ACCOUNT;

    create sequence hibernate_sequence;
