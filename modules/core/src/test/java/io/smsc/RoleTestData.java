package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Role;

import java.util.Objects;

public class RoleTestData {

    public static final long ROLE_USER_ID = 150;
    public static final long ROLE_ADMIN_ID = 151;

    public static final Role ROLE_USER = new Role(ROLE_USER_ID,"ROLE_USER");
    public static final Role ROLE_ADMIN = new Role(ROLE_ADMIN_ID,"ROLE_ADMIN");

//    static
//    {
//        ROLE_USER.setUsers(Collections.singletonList(USER));
//        ROLE_ADMIN.setUsers(Collections.singletonList(ADMIN));
//    }

    public static final ModelMatcher<Role> ROLE_MODEL_MATCHER = new ModelMatcher<>(
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPermissions(), actual.getPermissions())
                    )
    );
}
