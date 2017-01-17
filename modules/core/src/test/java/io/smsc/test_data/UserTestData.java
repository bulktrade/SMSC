package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.User;

import java.util.Collections;
import java.util.Objects;

import static io.smsc.test_data.RoleTestData.*;
import static io.smsc.test_data.DashboardTestData.*;
import static io.smsc.test_data.CustomerTestData.*;

public class UserTestData {

    public static final long USER_ID = 53;
    public static final long ADMIN_ID = 54;

    public static final User USER = new User(USER_ID,"User","password","userName","userSurname","user@gmail.com",true,false);
    public static final User ADMIN = new User(ADMIN_ID,"Admin","admin","adminName","adminSurname","admin@gmail.com",true,false);

    static
    {
        USER.setSalt("ad68dc115126d9d1");
        ADMIN.setSalt("94bd6b18b8f70298");
        USER.setRoles(Collections.singleton(ROLE_USER));
        ADMIN.setRoles(Collections.singleton(ROLE_ADMIN));
        USER.setDashboards(Collections.singleton(DASHBOARD_1));
        ADMIN.setDashboards(Collections.emptySet());
        USER.setCustomers(Collections.singleton(CUSTOMER_1));
        ADMIN.setCustomers(Collections.singleton(CUSTOMER_1));
    }

    public static final ModelMatcher<User> USER_MODEL_MATCHER = new ModelMatcher<>(User.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getUsername(), actual.getUsername())
                            && Objects.equals(expected.getPassword(), actual.getPassword())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getFirstname(), actual.getFirstname())
                            && Objects.equals(expected.getSurname(), actual.getSurname())
                            && Objects.equals(expected.getEmail(), actual.getEmail())
                            && Objects.equals(expected.isActive(), actual.isActive())
                            && Objects.equals(expected.isBlocked(), actual.isBlocked())
                            && Objects.equals(expected.getRoles(), actual.getRoles())
                            && Objects.equals(expected.getDashboards(), actual.getDashboards())
                    )
    );
}
