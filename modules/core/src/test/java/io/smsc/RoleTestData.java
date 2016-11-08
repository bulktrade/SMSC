package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Role;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

import static io.smsc.UserTestData.*;
import static io.smsc.PermissionTestData.*;

public class RoleTestData {

    public static final long ROLE_USER_ID = 3;
    public static final long ROLE_ADMIN_ID = 4;

    public static final Role ROLE_USER = new Role(ROLE_USER_ID,"USER");
    public static final Role ROLE_ADMIN = new Role(ROLE_ADMIN_ID,"ADMIN");

    static
    {
        ROLE_USER.setUsers(Collections.singletonList(USER));
        ROLE_ADMIN.setUsers(Collections.singletonList(ADMIN));
        ROLE_USER.setPermissions(Arrays.asList(PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER));
        ROLE_ADMIN.setPermissions(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,PERMISSION_CREATE_USER,
                PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER));
    }

    public static final ModelMatcher<Role> ROLE_MODEL_MATCHER = new ModelMatcher<>(Role.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPermissions(), actual.getPermissions())
                    )
    );
}
