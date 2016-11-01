package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.User;

import java.util.Objects;

public class UserTestData {

    public static final long USER_ID = 1;
    public static final long ADMIN_ID = 2;

    public static final User USER = new User(USER_ID,"user","password","userName","userSurname","user@gmail.com",true,false);
    public static final User ADMIN = new User(ADMIN_ID,"admin","admin","adminName","adminSurname","admin@gmail.com",true,false);

    public static final ModelMatcher<User> USER_MODEL_MATCHER = new ModelMatcher<>(
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
