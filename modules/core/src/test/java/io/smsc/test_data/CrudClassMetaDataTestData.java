package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CrudClassMetaData;

import java.util.Objects;

public class CrudClassMetaDataTestData {

    public static final long CRUD_CLASS_META_DATA_ID_1 = 11;
    public static final long CRUD_CLASS_META_DATA_ID_2 = 12;
    public static final long CRUD_CLASS_META_DATA_ID_3 = 13;
    public static final long CRUD_CLASS_META_DATA_ID_4 = 14;

    public static final CrudClassMetaData CRUD_CLASS_META_DATA_1 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_1,"CrudMetaGridData", "columnWidth", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_2 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_2,"CrudMetaFormData", "fieldLayoutGridPosition", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_3 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_3,"CrudClassMetaData", "class", true, null);
    public static final CrudClassMetaData CRUD_CLASS_META_DATA_4 = new CrudClassMetaData(CRUD_CLASS_META_DATA_ID_4,"MetaDataPropertyBindingParameter", "operator", true, null);

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
