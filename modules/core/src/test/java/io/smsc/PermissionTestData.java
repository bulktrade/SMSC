package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Permission;

import java.util.Arrays;
import java.util.Collections;

import static io.smsc.RoleTestData.*;

public class PermissionTestData {

    public static final long PERMISSION_READ_USER_ID = 5;
    public static final long PERMISSION_UPDATE_USER_ID = 6;
    public static final long PERMISSION_CREATE_USER_ID = 7;
    public static final long PERMISSION_DELETE_USER_ID = 8;
    public static final long PERMISSION_READ_OWN_USER_ID = 9;
    public static final long PERMISSION_UPDATE_OWN_USER_ID = 10;

    public static final Permission PERMISSION_READ_USER = new Permission(PERMISSION_READ_USER_ID,"READ_USER");
    public static final Permission PERMISSION_UPDATE_USER = new Permission(PERMISSION_UPDATE_USER_ID,"UPDATE_USER");
    public static final Permission PERMISSION_CREATE_USER = new Permission(PERMISSION_CREATE_USER_ID,"CREATE_USER");
    public static final Permission PERMISSION_DELETE_USER = new Permission(PERMISSION_DELETE_USER_ID,"DELETE_USER");
    public static final Permission PERMISSION_READ_OWN_USER = new Permission(PERMISSION_READ_OWN_USER_ID,"READ_OWN_USER");
    public static final Permission PERMISSION_UPDATE_OWN_USER = new Permission(PERMISSION_UPDATE_OWN_USER_ID,"UPDATE_OWN_USER");

    static
    {
        PERMISSION_READ_USER.setRoles(Collections.singletonList(ROLE_ADMIN));
        PERMISSION_UPDATE_USER.setRoles(Collections.singletonList(ROLE_ADMIN));
        PERMISSION_CREATE_USER.setRoles(Collections.singletonList(ROLE_ADMIN));
        PERMISSION_DELETE_USER.setRoles(Collections.singletonList(ROLE_ADMIN));
        PERMISSION_READ_OWN_USER.setRoles(Arrays.asList(ROLE_ADMIN,ROLE_USER));
        PERMISSION_UPDATE_OWN_USER.setRoles(Arrays.asList(ROLE_ADMIN,ROLE_USER));
    }

    public static final ModelMatcher<Permission> PERMISSION_MODEL_MATCHER = new ModelMatcher<>(Permission.class);

}
