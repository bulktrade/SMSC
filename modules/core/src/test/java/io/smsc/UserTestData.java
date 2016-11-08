package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.User;

import java.util.Collections;
import java.util.Objects;

import static io.smsc.RoleTestData.ROLE_ADMIN;
import static io.smsc.RoleTestData.ROLE_USER;

public class UserTestData {

    public static final long USER_ID = 1;
    public static final long ADMIN_ID = 2;

    public static final User USER = new User(USER_ID,"User","password","userName","userSurname","user@gmail.com",true,false);
    public static final User ADMIN = new User(ADMIN_ID,"Admin","admin","adminName","adminSurname","admin@gmail.com",true,false);

    static
    {
        USER.setRoles(Collections.singletonList(ROLE_USER));
        ADMIN.setRoles(Collections.singletonList(ROLE_ADMIN));
    }

    public static final ModelMatcher<User> USER_MODEL_MATCHER = new ModelMatcher<>(User.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getUsername(), actual.getUsername())
                            && Objects.equals(expected.getPassword(), actual.getPassword())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getFirstName(), actual.getFirstName())
                            && Objects.equals(expected.getSurName(), actual.getSurName())
                            && Objects.equals(expected.getEmail(), actual.getEmail())
                            && Objects.equals(expected.isActive(), actual.isActive())
                            && Objects.equals(expected.isBlocked(), actual.isBlocked())
                            && Objects.equals(expected.getRoles(), actual.getRoles())
                    )
    );
}
