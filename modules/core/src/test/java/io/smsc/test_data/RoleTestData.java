package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Role;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

import static io.smsc.test_data.PermissionTestData.*;

public class RoleTestData {

    public static final long ROLE_USER_ID = 3;
    public static final long ROLE_ADMIN_ID = 4;

    public static final Role ROLE_USER = new Role(ROLE_USER_ID,"USER");
    public static final Role ROLE_ADMIN = new Role(ROLE_ADMIN_ID,"ADMIN");

    static
    {
        ROLE_USER.setUsers(Collections.singletonList(UserTestData.USER));
        ROLE_ADMIN.setUsers(Collections.singletonList(UserTestData.ADMIN));
        ROLE_USER.setPermissions(Arrays.asList(PERMISSION_USER_READ_OWN, PERMISSION_USER_UPDATE_OWN));
        ROLE_ADMIN.setPermissions(Arrays.asList(PERMISSION_USER_READ,PERMISSION_USER_UPDATE,
                PERMISSION_USER_CREATE,PERMISSION_USER_DELETE,PERMISSION_USER_READ_OWN,PERMISSION_USER_UPDATE_OWN,
                PERMISSION_ROLE_READ,PERMISSION_ROLE_UPDATE,PERMISSION_ROLE_CREATE,PERMISSION_ROLE_DELETE,PERMISSION_PERMISSION_READ,
                PERMISSION_PERMISSION_UPDATE,PERMISSION_PERMISSION_CREATE,PERMISSION_PERMISSION_DELETE,PERMISSION_CRUD_CLASS_META_DATA_READ,
                PERMISSION_CRUD_CLASS_META_DATA_UPDATE,PERMISSION_CRUD_CLASS_META_DATA_CREATE,PERMISSION_CRUD_CLASS_META_DATA_DELETE,
                PERMISSION_CRUD_META_FORM_DATA_READ,PERMISSION_CRUD_META_FORM_DATA_UPDATE,PERMISSION_CRUD_META_FORM_DATA_CREATE,
                PERMISSION_CRUD_META_FORM_DATA_DELETE,PERMISSION_CRUD_META_GRID_DATA_READ,PERMISSION_CRUD_META_GRID_DATA_UPDATE,
                PERMISSION_CRUD_META_GRID_DATA_CREATE,PERMISSION_CRUD_META_GRID_DATA_DELETE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE));
    }

    public static final ModelMatcher<Role> ROLE_MODEL_MATCHER = new ModelMatcher<>(Role.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getPermissions(), actual.getPermissions())
                    )
    );
}
