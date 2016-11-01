package io.smsc;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.Permission;

import java.util.Objects;

public class PermissionTestData {

    public static final long PERMISSION_READ_ONLY_ID = 5;
    public static final long PERMISSION_READ_WRITE_ID = 6;

    public static final Permission PERMISSION_READ_ONLY = new Permission(PERMISSION_READ_ONLY_ID,"PERMISSION_READ_ONLY");
    public static final Permission PERMISSION_READ_WRITE = new Permission(PERMISSION_READ_WRITE_ID,"PERMISSION_READ_ONLY");

    public static final ModelMatcher<Permission> PERMISSION_MODEL_MATCHER = new ModelMatcher<>(
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                    )
    );
}
