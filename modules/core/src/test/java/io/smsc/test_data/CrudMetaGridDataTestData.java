package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CrudMetaGridData;

import java.util.Collections;
import java.util.Objects;

import static io.smsc.test_data.CrudClassMetaDataTestData.CRUD_CLASS_META_DATA_1;
import static io.smsc.test_data.CrudClassMetaDataTestData.CRUD_CLASS_META_DATA_2;
import static io.smsc.test_data.CrudClassMetaDataTestData.CRUD_CLASS_META_DATA_4;

public class CrudMetaGridDataTestData {

    public static final long CRUD_META_GRID_DATA_ID_1 = 15;
    public static final long CRUD_META_GRID_DATA_ID_2 = 16;
    public static final long CRUD_META_GRID_DATA_ID_3 = 17;
    public static final long CRUD_META_GRID_DATA_ID_4 = 18;
    public static final long CRUD_META_GRID_DATA_ID_5 = 19;
    public static final long CRUD_META_GRID_DATA_ID_6 = 20;
    public static final long CRUD_META_GRID_DATA_ID_7 = 21;
    public static final long CRUD_META_GRID_DATA_ID_8 = 22;
    public static final long CRUD_META_GRID_DATA_ID_9 = 23;
    public static final long CRUD_META_GRID_DATA_ID_10 = 24;
    public static final long CRUD_META_GRID_DATA_ID_11 = 25;
    public static final long CRUD_META_GRID_DATA_ID_12 = 26;
    public static final long CRUD_META_GRID_DATA_ID_13 = 27;
    public static final long CRUD_META_GRID_DATA_ID_14 = 28;
    public static final long CRUD_META_GRID_DATA_ID_15 = 29;
    public static final long CRUD_META_GRID_DATA_ID_16 = 30;
    public static final long CRUD_META_GRID_DATA_ID_17 = 31;
    public static final long CRUD_META_GRID_DATA_ID_18 = 32;
    public static final long CRUD_META_GRID_DATA_ID_19 = 33;
    public static final long CRUD_META_GRID_DATA_ID_20 = 34;

    public static final CrudMetaGridData CRUD_META_GRID_DATA_1 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_1,"fromProperty", true, true, null, 1.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_2 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_2,"toProperty", true, true, null, 2.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_3 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_3,"combineOperator", true, true, null, 3.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_4 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_4,"operator", true, true, null, 4.0, null);

    public static final CrudMetaGridData CRUD_META_GRID_DATA_5 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_5,"columnWidth", true, true, null, 1.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_6 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_6,"property", true, true, null, 2.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_7 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_7,"editable", true, true, null, 3.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_8 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_8,"visible", true, true, null, 4.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_9 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_9,"decorator", true, true, null, 5.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_10 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_10,"order", true, true, null, 6.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_11 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_11,"crudClassMetaData", true, true, null, 7.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_12 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_12,"bingingProperties", true, true, null, 8.0, null);

    public static final CrudMetaGridData CRUD_META_GRID_DATA_13 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_13,"fieldLayoutGridPosition", true, true, null, 1.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_14 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_14,"property", true, true, null, 2.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_15 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_15,"editable", true, true, null, 3.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_16 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_16,"visible", true, true, null, 4.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_17 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_17,"decorator", true, true, null, 5.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_18 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_18,"order", true, true, null, 6.0, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_19 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_19,"crudClassMetaData", true, true, null, 7.0,null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_20 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_20,"bingingProperties", true, true, null, 8.0, null);

    static {
        CRUD_META_GRID_DATA_1.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_2.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_3.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_4.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_5.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_6.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_7.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_8.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_9.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_10.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_11.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_12.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_13.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_14.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_15.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_16.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_17.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_18.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_19.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_20.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_1.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_2.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_3.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_4.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_5.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_6.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_7.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_8.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_9.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_10.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_11.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_12.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_GRID_DATA_13.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_14.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_15.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_16.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_17.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_18.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_19.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_GRID_DATA_20.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
    }

    public static final ModelMatcher<CrudMetaGridData> CRUD_META_GRID_DATA_MODEL_MATCHER = new ModelMatcher<>(CrudMetaGridData.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getProperty(), actual.getProperty())
                            && Objects.equals(expected.getEditable(), actual.getEditable())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getVisible(), actual.getVisible())
                            && Objects.equals(expected.getDecorator(), actual.getDecorator())
                            && Objects.equals(expected.getOrder(), actual.getOrder())
                            && Objects.equals(expected.getCrudClassMetaData(), actual.getCrudClassMetaData())
                            && Objects.equals(expected.getBindingParameters(), actual.getBindingParameters())
                            && Objects.equals(expected.getColumnWidth(), actual.getColumnWidth())
                    )
    );
}
