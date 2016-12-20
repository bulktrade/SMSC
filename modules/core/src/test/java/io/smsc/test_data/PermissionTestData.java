package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Permission;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;

import static io.smsc.test_data.RoleTestData.*;

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
    public static final long PERMISSION_CUSTOMER_READ_ID = 35;
    public static final long PERMISSION_CUSTOMER_UPDATE_ID = 36;
    public static final long PERMISSION_CUSTOMER_CREATE_ID = 37;
    public static final long PERMISSION_CUSTOMER_DELETE_ID = 38;
    public static final long PERMISSION_CUSTOMER_CONTACT_READ_ID = 39;
    public static final long PERMISSION_CUSTOMER_CONTACT_UPDATE_ID = 40;
    public static final long PERMISSION_CUSTOMER_CONTACT_CREATE_ID = 41;
    public static final long PERMISSION_CUSTOMER_CONTACT_DELETE_ID = 42;
    public static final long PERMISSION_DASHBOARD_READ_ID = 43;
    public static final long PERMISSION_DASHBOARD_UPDATE_ID = 44;
    public static final long PERMISSION_DASHBOARD_CREATE_ID = 45;
    public static final long PERMISSION_DASHBOARD_DELETE_ID = 46;
    public static final long PERMISSION_DASHBOARD_BOX_READ_ID = 47;
    public static final long PERMISSION_DASHBOARD_BOX_UPDATE_ID = 48;
    public static final long PERMISSION_DASHBOARD_BOX_CREATE_ID = 49;
    public static final long PERMISSION_DASHBOARD_BOX_DELETE_ID = 50;
    public static final long PERMISSION_DASHBOARD_BOX_TYPE_READ_ID = 51;
    public static final long PERMISSION_DASHBOARD_BOX_TYPE_UPDATE_ID = 52;
    public static final long PERMISSION_DASHBOARD_BOX_TYPE_CREATE_ID = 53;
    public static final long PERMISSION_DASHBOARD_BOX_TYPE_DELETE_ID = 54;

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
    public static final Permission PERMISSION_CUSTOMER_READ = new Permission(PERMISSION_CUSTOMER_READ_ID,"CUSTOMER_READ");
    public static final Permission PERMISSION_CUSTOMER_UPDATE = new Permission(PERMISSION_CUSTOMER_UPDATE_ID,"CUSTOMER_UPDATE");
    public static final Permission PERMISSION_CUSTOMER_CREATE = new Permission(PERMISSION_CUSTOMER_CREATE_ID,"CUSTOMER_CREATE");
    public static final Permission PERMISSION_CUSTOMER_DELETE = new Permission(PERMISSION_CUSTOMER_DELETE_ID,"CUSTOMER_DELETE");
    public static final Permission PERMISSION_CUSTOMER_CONTACT_READ = new Permission(PERMISSION_CUSTOMER_CONTACT_READ_ID,"CUSTOMER_CONTACT_READ");
    public static final Permission PERMISSION_CUSTOMER_CONTACT_UPDATE = new Permission(PERMISSION_CUSTOMER_CONTACT_UPDATE_ID,"CUSTOMER_CONTACT_UPDATE");
    public static final Permission PERMISSION_CUSTOMER_CONTACT_CREATE = new Permission(PERMISSION_CUSTOMER_CONTACT_CREATE_ID,"CUSTOMER_CONTACT_CREATE");
    public static final Permission PERMISSION_CUSTOMER_CONTACT_DELETE = new Permission(PERMISSION_CUSTOMER_CONTACT_DELETE_ID,"CUSTOMER_CONTACT_DELETE");
    public static final Permission PERMISSION_DASHBOARD_READ = new Permission(PERMISSION_DASHBOARD_READ_ID,"DASHBOARD_READ");
    public static final Permission PERMISSION_DASHBOARD_UPDATE = new Permission(PERMISSION_DASHBOARD_UPDATE_ID,"DASHBOARD_UPDATE");
    public static final Permission PERMISSION_DASHBOARD_CREATE = new Permission(PERMISSION_DASHBOARD_CREATE_ID,"DASHBOARD_CREATE");
    public static final Permission PERMISSION_DASHBOARD_DELETE = new Permission(PERMISSION_DASHBOARD_DELETE_ID,"DASHBOARD_DELETE");
    public static final Permission PERMISSION_DASHBOARD_BOX_READ = new Permission(PERMISSION_DASHBOARD_BOX_READ_ID,"DASHBOARD_BOX_READ");
    public static final Permission PERMISSION_DASHBOARD_BOX_UPDATE = new Permission(PERMISSION_DASHBOARD_BOX_UPDATE_ID,"DASHBOARD_BOX_UPDATE");
    public static final Permission PERMISSION_DASHBOARD_BOX_CREATE = new Permission(PERMISSION_DASHBOARD_BOX_CREATE_ID,"DASHBOARD_BOX_CREATE");
    public static final Permission PERMISSION_DASHBOARD_BOX_DELETE = new Permission(PERMISSION_DASHBOARD_BOX_DELETE_ID,"DASHBOARD_BOX_DELETE");
    public static final Permission PERMISSION_DASHBOARD_BOX_TYPE_READ = new Permission(PERMISSION_DASHBOARD_BOX_TYPE_READ_ID,"DASHBOARD_BOX_TYPE_READ");
    public static final Permission PERMISSION_DASHBOARD_BOX_TYPE_UPDATE = new Permission(PERMISSION_DASHBOARD_BOX_TYPE_UPDATE_ID,"DASHBOARD_BOX_TYPE_UPDATE");
    public static final Permission PERMISSION_DASHBOARD_BOX_TYPE_CREATE = new Permission(PERMISSION_DASHBOARD_BOX_TYPE_CREATE_ID,"DASHBOARD_BOX_TYPE_CREATE");
    public static final Permission PERMISSION_DASHBOARD_BOX_TYPE_DELETE = new Permission(PERMISSION_DASHBOARD_BOX_TYPE_DELETE_ID,"DASHBOARD_BOX_TYPE_DELETE");

    static
    {
        PERMISSION_USER_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_USER_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_USER_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_USER_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_USER_READ_OWN.setRoles(new HashSet<>(Arrays.asList(ROLE_ADMIN, ROLE_USER)));
        PERMISSION_USER_UPDATE_OWN.setRoles(new HashSet<>(Arrays.asList(ROLE_ADMIN, ROLE_USER)));
        PERMISSION_ROLE_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_ROLE_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_ROLE_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_ROLE_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_PERMISSION_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_PERMISSION_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_PERMISSION_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_PERMISSION_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_CLASS_META_DATA_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_FORM_DATA_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CRUD_META_GRID_DATA_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_CONTACT_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_CONTACT_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_CONTACT_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_CUSTOMER_CONTACT_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_TYPE_READ.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_TYPE_UPDATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_TYPE_CREATE.setRoles(Collections.singleton(ROLE_ADMIN));
        PERMISSION_DASHBOARD_BOX_TYPE_DELETE.setRoles(Collections.singleton(ROLE_ADMIN));
    }

    public static final ModelMatcher<Permission> PERMISSION_MODEL_MATCHER = new ModelMatcher<>(Permission.class,(expected, actual) -> expected == actual ||
            (Objects.equals(expected.getId(), actual.getId())
                    && Objects.equals(expected.getName(), actual.getName())
            ));


}
