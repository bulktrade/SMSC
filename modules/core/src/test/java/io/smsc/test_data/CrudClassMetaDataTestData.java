package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CrudClassMetaData;

import java.util.Objects;

public class CrudClassMetaDataTestData {

    public static final long CRUD_CLASS_META_DATA_ID_1 = 55;
    public static final long CRUD_CLASS_META_DATA_ID_2 = 56;
    public static final long CRUD_CLASS_META_DATA_ID_3 = 57;
    public static final long CRUD_CLASS_META_DATA_ID_4 = 58;
    public static final long CRUD_CLASS_META_DATA_ID_5 = 59;
    public static final long CRUD_CLASS_META_DATA_ID_6 = 60;
    public static final long CRUD_CLASS_META_DATA_ID_7 = 61;
    public static final long CRUD_CLASS_META_DATA_ID_8 = 62;
    public static final long CRUD_CLASS_META_DATA_ID_9 = 63;
    public static final long CRUD_CLASS_META_DATA_ID_10 = 64;
    public static final long CRUD_CLASS_META_DATA_ID_11 = 65;
    public static final long CRUD_CLASS_META_DATA_ID_12 = 66;

    public static final CrudClassMetaData CRUD_CLASS_META_DATA_1 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_1,"CrudMetaGridData", "columnWidth", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_2 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_2,"CrudMetaFormData", "fieldLayoutGridPosition", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_3 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_3,"CrudClassMetaData", "className", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_4 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_4,"Customer", "customerId", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_5 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_5,"User", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_6 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_6,"MetaDataPropertyBindingParameter", "operator", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_7 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_7,"Dashboard", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_8 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_8,"DashboardBox", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_9 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_9,"DashboardBoxType", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_10 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_10,"Role", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_11 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_11,"Permission", "name", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_12 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_12,"CustomerContact", "emailAddress", true, null);

    public static final ModelMatcher<CrudClassMetaData> CRUD_CLASS_META_DATA_MODEL_MATCHER = new ModelMatcher<>(CrudClassMetaData.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getClassName(), actual.getClassName())
                            && Objects.equals(expected.getTitleColumns(), actual.getTitleColumns())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getEditable(), actual.getEditable())
                            && Objects.equals(expected.getQuery(), actual.getQuery())
                    )
    );
}
