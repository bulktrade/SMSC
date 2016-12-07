package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Permission;

import java.util.Arrays;
import java.util.Collections;

public class PermissionTestData {

    public static final long PERMISSION_USER_READ_ID = 5;
    public static final long PERMISSION_USER_UPDATE_ID = 6;
    public static final long PERMISSION_USER_CREATE_ID = 7;
    public static final long PERMISSION_USER_DELETE_ID = 8;
    public static final long PERMISSION_USER_READ_OWN_ID = 9;
    public static final long PERMISSION_USER_UPDATE_OWN_ID = 10;
    public static final long PERMISSION_ROLE_READ_ID = 11;
    public static final long PERMISSION_ROLE_UPDATE_ID = 12;
    public static final long PERMISSION_ROLE_CREATE_ID = 13;
    public static final long PERMISSION_ROLE_DELETE_ID = 14;
    public static final long PERMISSION_PERMISSION_READ_ID = 15;
    public static final long PERMISSION_PERMISSION_UPDATE_ID = 16;
    public static final long PERMISSION_PERMISSION_CREATE_ID = 17;
    public static final long PERMISSION_PERMISSION_DELETE_ID = 18;
    public static final long PERMISSION_CRUD_CLASS_META_DATA_READ_ID = 19;
    public static final long PERMISSION_CRUD_CLASS_META_DATA_UPDATE_ID = 20;
    public static final long PERMISSION_CRUD_CLASS_META_DATA_CREATE_ID = 21;
    public static final long PERMISSION_CRUD_CLASS_META_DATA_DELETE_ID = 22;
    public static final long PERMISSION_CRUD_META_FORM_DATA_READ_ID = 23;
    public static final long PERMISSION_CRUD_META_FORM_DATA_UPDATE_ID = 24;
    public static final long PERMISSION_CRUD_META_FORM_DATA_CREATE_ID = 25;
    public static final long PERMISSION_CRUD_META_FORM_DATA_DELETE_ID = 26;
    public static final long PERMISSION_CRUD_META_GRID_DATA_READ_ID = 27;
    public static final long PERMISSION_CRUD_META_GRID_DATA_UPDATE_ID = 28;
    public static final long PERMISSION_CRUD_META_GRID_DATA_CREATE_ID = 29;
    public static final long PERMISSION_CRUD_META_GRID_DATA_DELETE_ID = 30;
    public static final long PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ_ID = 31;
    public static final long PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE_ID = 32;
    public static final long PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE_ID = 33;
    public static final long PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE_ID = 34;

    public static final Permission PERMISSION_USER_READ = new Permission(PERMISSION_USER_READ_ID,"USER_READ");
    public static final Permission PERMISSION_USER_UPDATE = new Permission(PERMISSION_USER_UPDATE_ID,"USER_UPDATE");
    public static final Permission PERMISSION_USER_CREATE = new Permission(PERMISSION_USER_CREATE_ID,"USER_CREATE");
    public static final Permission PERMISSION_USER_DELETE = new Permission(PERMISSION_USER_DELETE_ID,"USER_DELETE");
    public static final Permission PERMISSION_USER_READ_OWN = new Permission(PERMISSION_USER_READ_OWN_ID,"USER_READ_OWN");
    public static final Permission PERMISSION_USER_UPDATE_OWN = new Permission(PERMISSION_USER_UPDATE_OWN_ID,"USER_UPDATE_OWN");
    public static final Permission PERMISSION_ROLE_READ = new Permission(PERMISSION_ROLE_READ_ID,"ROLE_READ");
    public static final Permission PERMISSION_ROLE_UPDATE = new Permission(PERMISSION_ROLE_UPDATE_ID,"ROLE_UPDATE");
    public static final Permission PERMISSION_ROLE_CREATE = new Permission(PERMISSION_ROLE_CREATE_ID,"ROLE_CREATE");
    public static final Permission PERMISSION_ROLE_DELETE = new Permission(PERMISSION_ROLE_DELETE_ID,"ROLE_DELETE");
    public static final Permission PERMISSION_PERMISSION_READ = new Permission(PERMISSION_PERMISSION_READ_ID,"PERMISSION_READ");
    public static final Permission PERMISSION_PERMISSION_UPDATE = new Permission(PERMISSION_PERMISSION_UPDATE_ID,"PERMISSION_UPDATE");
    public static final Permission PERMISSION_PERMISSION_CREATE = new Permission(PERMISSION_PERMISSION_CREATE_ID,"PERMISSION_CREATE");
    public static final Permission PERMISSION_PERMISSION_DELETE = new Permission(PERMISSION_PERMISSION_DELETE_ID,"PERMISSION_DELETE");
    public static final Permission PERMISSION_CRUD_CLASS_META_DATA_READ = new Permission(PERMISSION_CRUD_CLASS_META_DATA_READ_ID,"CRUD_CLASS_META_DATA_READ");
    public static final Permission PERMISSION_CRUD_CLASS_META_DATA_UPDATE = new Permission(PERMISSION_CRUD_CLASS_META_DATA_UPDATE_ID,"CRUD_CLASS_META_DATA_UPDATE");
    public static final Permission PERMISSION_CRUD_CLASS_META_DATA_CREATE = new Permission(PERMISSION_CRUD_CLASS_META_DATA_CREATE_ID,"CRUD_CLASS_META_DATA_CREATE");
    public static final Permission PERMISSION_CRUD_CLASS_META_DATA_DELETE = new Permission(PERMISSION_CRUD_CLASS_META_DATA_DELETE_ID,"CRUD_CLASS_META_DATA_DELETE");
    public static final Permission PERMISSION_CRUD_META_FORM_DATA_READ = new Permission(PERMISSION_CRUD_META_FORM_DATA_READ_ID,"CRUD_META_FORM_DATA_READ");
    public static final Permission PERMISSION_CRUD_META_FORM_DATA_UPDATE = new Permission(PERMISSION_CRUD_META_FORM_DATA_UPDATE_ID,"CRUD_META_FORM_DATA_UPDATE");
    public static final Permission PERMISSION_CRUD_META_FORM_DATA_CREATE = new Permission(PERMISSION_CRUD_META_FORM_DATA_CREATE_ID,"CRUD_META_FORM_DATA_CREATE");
    public static final Permission PERMISSION_CRUD_META_FORM_DATA_DELETE = new Permission(PERMISSION_CRUD_META_FORM_DATA_DELETE_ID,"CRUD_META_FORM_DATA_DELETE");
    public static final Permission PERMISSION_CRUD_META_GRID_DATA_READ = new Permission(PERMISSION_CRUD_META_GRID_DATA_READ_ID,"CRUD_META_GRID_DATA_READ");
    public static final Permission PERMISSION_CRUD_META_GRID_DATA_UPDATE = new Permission(PERMISSION_CRUD_META_GRID_DATA_UPDATE_ID,"CRUD_META_GRID_DATA_UPDATE");
    public static final Permission PERMISSION_CRUD_META_GRID_DATA_CREATE = new Permission(PERMISSION_CRUD_META_GRID_DATA_CREATE_ID,"CRUD_META_GRID_DATA_CREATE");
    public static final Permission PERMISSION_CRUD_META_GRID_DATA_DELETE = new Permission(PERMISSION_CRUD_META_GRID_DATA_DELETE_ID,"CRUD_META_GRID_DATA_DELETE");
    public static final Permission PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ = new Permission(PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ_ID,"META_DATA_PROPERTY_BINDING_PARAMETER_READ");
    public static final Permission PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE = new Permission(PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE_ID,"META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE");
    public static final Permission PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE = new Permission(PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE_ID,"META_DATA_PROPERTY_BINDING_PARAMETER_CREATE");
    public static final Permission PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE = new Permission(PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE_ID,"META_DATA_PROPERTY_BINDING_PARAMETER_DELETE");

    static
    {
        PERMISSION_USER_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_USER_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_USER_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_USER_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_USER_READ_OWN.setRoles(Arrays.asList(RoleTestData.ROLE_ADMIN, RoleTestData.ROLE_USER));
        PERMISSION_USER_UPDATE_OWN.setRoles(Arrays.asList(RoleTestData.ROLE_ADMIN, RoleTestData.ROLE_USER));
        PERMISSION_ROLE_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_ROLE_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_ROLE_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_ROLE_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_PERMISSION_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_PERMISSION_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_PERMISSION_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_PERMISSION_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE.setRoles(Collections.singletonList(RoleTestData.ROLE_ADMIN));
    }

    public static final ModelMatcher<Permission> PERMISSION_MODEL_MATCHER = new ModelMatcher<>(Permission.class);

}
