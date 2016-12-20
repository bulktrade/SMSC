package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;

import static io.smsc.test_data.DashboardBoxTestData.*;

public class DashboardBoxTypeTestData {

    public static final long DASHBOARD_BOX_TYPE_ID_1 = 141;
    public static final long DASHBOARD_BOX_TYPE_ID_2 = 142;
    public static final long DASHBOARD_BOX_TYPE_ID_3 = 143;
    public static final long DASHBOARD_BOX_TYPE_ID_4 = 144;
    public static final long DASHBOARD_BOX_TYPE_ID_5 = 145;
    public static final long DASHBOARD_BOX_TYPE_ID_6 = 146;

    public static final DashboardBoxType DASHBOARD_BOX_TYPE_1 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_1, "Ivan feeds", Type.STATUS, Kind.FEEDBACK_STATUS);
    public static final DashboardBoxType DASHBOARD_BOX_TYPE_2 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_2, "Petia profit", Type.CHART, Kind.PIE_CHART);
    public static final DashboardBoxType DASHBOARD_BOX_TYPE_3 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_3, "Rusia chart profit", Type.CHART, Kind.SERIAL_CHART);
    public static final DashboardBoxType DASHBOARD_BOX_TYPE_4 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_4, "Ivan chart profit", Type.CHART, Kind.LINE_CHART);
    public static final DashboardBoxType DASHBOARD_BOX_TYPE_5 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_5, "Kolia chart profit", Type.CHART, Kind.BAR_CHART);
    public static final DashboardBoxType DASHBOARD_BOX_TYPE_6 = new DashboardBoxType(DASHBOARD_BOX_TYPE_ID_6, "Masha bubble chartat", Type.CHART, Kind.BUBBLE_CHART);

    static
    {
        DASHBOARD_BOX_TYPE_1.setDashboardBoxes(new HashSet<>(Arrays.asList(DASHBOARD_BOX_1,DASHBOARD_BOX_2,DASHBOARD_BOX_3,DASHBOARD_BOX_4)));
        DASHBOARD_BOX_TYPE_2.setDashboardBoxes(Collections.singleton(DASHBOARD_BOX_5));
        DASHBOARD_BOX_TYPE_3.setDashboardBoxes(Collections.singleton(DASHBOARD_BOX_6));
        DASHBOARD_BOX_TYPE_4.setDashboardBoxes(Collections.singleton(DASHBOARD_BOX_7));
        DASHBOARD_BOX_TYPE_5.setDashboardBoxes(Collections.singleton(DASHBOARD_BOX_8));
        DASHBOARD_BOX_TYPE_6.setDashboardBoxes(Collections.singleton(DASHBOARD_BOX_9));
    }

    public static final ModelMatcher<DashboardBoxType> DASHBOARD_BOX_TYPE_MODEL_MATCHER = new ModelMatcher<>(DashboardBoxType.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getName(), actual.getName())
                            && Objects.equals(expected.getType(), actual.getType())
                            && Objects.equals(expected.getKind(), actual.getKind()))
    );
}
