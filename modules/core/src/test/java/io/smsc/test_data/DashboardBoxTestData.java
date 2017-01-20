package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;

import static io.smsc.test_data.DashboardBoxTypeTestData.*;
import static io.smsc.test_data.DashboardTestData.*;

import java.util.Objects;

public class DashboardBoxTestData {

    public static final long DASHBOARD_BOX_ID_1 = 249;
    public static final long DASHBOARD_BOX_ID_2 = 250;
    public static final long DASHBOARD_BOX_ID_3 = 251;
    public static final long DASHBOARD_BOX_ID_4 = 252;
    public static final long DASHBOARD_BOX_ID_5 = 253;
    public static final long DASHBOARD_BOX_ID_6 = 254;
    public static final long DASHBOARD_BOX_ID_7 = 255;
    public static final long DASHBOARD_BOX_ID_8 = 256;
    public static final long DASHBOARD_BOX_ID_9 = 257;

    public static final DashboardBox DASHBOARD_BOX_1 = new DashboardBox(DASHBOARD_BOX_ID_1, Width.WIDTH_25, Height.HEIGHT_25, 1, "Box 1", "Box 1 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_1);
    public static final DashboardBox DASHBOARD_BOX_2 = new DashboardBox(DASHBOARD_BOX_ID_2, Width.WIDTH_25, Height.HEIGHT_25, 2, "Box 2", "Box 2 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_1);
    public static final DashboardBox DASHBOARD_BOX_3 = new DashboardBox(DASHBOARD_BOX_ID_3, Width.WIDTH_25, Height.HEIGHT_25, 3, "Box 3", "Box 3 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_1);
    public static final DashboardBox DASHBOARD_BOX_4 = new DashboardBox(DASHBOARD_BOX_ID_4, Width.WIDTH_25, Height.HEIGHT_25, 4, "Box 4", "Box 4 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_1);
    public static final DashboardBox DASHBOARD_BOX_5 = new DashboardBox(DASHBOARD_BOX_ID_5, Width.WIDTH_50, Height.HEIGHT_50, 5, "Box 5", "Box 5 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_2);
    public static final DashboardBox DASHBOARD_BOX_6 = new DashboardBox(DASHBOARD_BOX_ID_6, Width.WIDTH_50, Height.HEIGHT_50, 6, "Box 6", "Box 6 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_3);
    public static final DashboardBox DASHBOARD_BOX_7 = new DashboardBox(DASHBOARD_BOX_ID_7, Width.WIDTH_50, Height.HEIGHT_50, 7, "Box 7", "Box 7 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_4);
    public static final DashboardBox DASHBOARD_BOX_8 = new DashboardBox(DASHBOARD_BOX_ID_8, Width.WIDTH_50, Height.HEIGHT_50, 8, "Box 8", "Box 8 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_5);
    public static final DashboardBox DASHBOARD_BOX_9 = new DashboardBox(DASHBOARD_BOX_ID_9, Width.WIDTH_50, Height.HEIGHT_50, 9, "Box 9", "Box 9 desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_6);

    public static final ModelMatcher<DashboardBox> DASHBOARD_BOX_MODEL_MATCHER = new ModelMatcher<>(DashboardBox.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getWidth(), actual.getWidth())
                            && Objects.equals(expected.getHeight(), actual.getHeight())
                            && Objects.equals(expected.getOrder(), actual.getOrder())
                            && Objects.equals(expected.getName(), actual.getName()))
                            && Objects.equals(expected.getDescription(), actual.getDescription())
                            && Objects.equals(expected.getDashboardBoxType(), actual.getDashboardBoxType())
    );
}
