package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.dashboard.Dashboard;

import java.util.Arrays;
import java.util.Objects;

import static io.smsc.test_data.UserTestData.*;
import static io.smsc.test_data.DashboardBoxTestData.*;

public class DashboardTestData {

    public static final long DASHBOARD_ID_1 = 140;

    public static final Dashboard DASHBOARD_1 = new Dashboard(DASHBOARD_ID_1, "default", "user", USER);

    static
    {
        DASHBOARD_1.setDashboardBoxes(Arrays.asList(DASHBOARD_BOX_1,DASHBOARD_BOX_2,DASHBOARD_BOX_3,DASHBOARD_BOX_4,
                DASHBOARD_BOX_5,DASHBOARD_BOX_6,DASHBOARD_BOX_7,DASHBOARD_BOX_8,DASHBOARD_BOX_9));
        DASHBOARD_1.setUser(USER);
    }

    public static final ModelMatcher<Dashboard> DASHBOARD_MODEL_MATCHER = new ModelMatcher<>(Dashboard.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getIcon(), actual.getIcon())
                            && Objects.equals(expected.getUser(), actual.getUser())
                            && Objects.equals(expected.getDashboardBoxes(), actual.getDashboardBoxes()))
    );
}
