package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Role;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

public class RoleTestData {

    public static final long ROLE_USER_ID = 3;
    public static final long ROLE_ADMIN_ID = 4;

    public static final Role ROLE_USER = new Role(ROLE_USER_ID,"ROLE_USER");
    public static final Role ROLE_ADMIN = new Role(ROLE_ADMIN_ID,"ROLE_ADMIN");

    static
    {
        ROLE_USER.setUsers(Collections.singletonList(UserTestData.USER));
        ROLE_ADMIN.setUsers(Collections.singletonList(UserTestData.ADMIN));
        ROLE_USER.setPermissions(Arrays.asList(PermissionTestData.PERMISSION_READ_OWN_USER, PermissionTestData.PERMISSION_UPDATE_OWN_USER));
        ROLE_ADMIN.setPermissions(Arrays.asList(PermissionTestData.PERMISSION_READ_USER, PermissionTestData.PERMISSION_UPDATE_USER, PermissionTestData.PERMISSION_CREATE_USER,
                PermissionTestData.PERMISSION_DELETE_USER, PermissionTestData.PERMISSION_READ_OWN_USER, PermissionTestData.PERMISSION_UPDATE_OWN_USER));
    }

    public static final ModelMatcher<Role> ROLE_MODEL_MATCHER = new ModelMatcher<>(Role.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPermissions(), actual.getPermissions())
                    )
    );
}
