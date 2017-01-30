//package io.smsc.test_data;
//
//import io.smsc.matcher.ModelMatcher;
//import io.smsc.model.Role;
//
//import java.util.Collections;
//import java.util.Objects;
//
//public class RoleTestData {
//
//    public static final long ROLE_USER_ID = 51;
//    public static final long ROLE_ADMIN_ID = 52;
//
//    public static final Role ROLE_USER = new Role(ROLE_USER_ID,"ROLE_USER");
//    public static final Role ROLE_ADMIN = new Role(ROLE_ADMIN_ID,"ROLE_ADMIN");
//
//    static
//    {
//        ROLE_USER.setUsers(Collections.singleton(UserTestData.USER));
//        ROLE_ADMIN.setUsers(Collections.singleton(UserTestData.ADMIN));
//    }
//
//    public static final ModelMatcher<Role> ROLE_MODEL_MATCHER = new ModelMatcher<>(Role.class,
//            (expected, actual) -> expected == actual ||
//                    (Objects.equals(expected.getId(), actual.getId())
//                            && Objects.equals(expected.getName(), actual.getName())
//                    )
//    );
//}
