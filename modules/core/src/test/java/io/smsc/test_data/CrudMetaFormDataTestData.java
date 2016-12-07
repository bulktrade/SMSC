package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CrudMetaFormData;

import java.util.Collections;
import java.util.Objects;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

public class CrudMetaFormDataTestData {

    public static final long CRUD_META_FORM_DATA_ID_1 = 39;
    public static final long CRUD_META_FORM_DATA_ID_2 = 40;
    public static final long CRUD_META_FORM_DATA_ID_3 = 41;
    public static final long CRUD_META_FORM_DATA_ID_4 = 42;
    public static final long CRUD_META_FORM_DATA_ID_5 = 43;
    public static final long CRUD_META_FORM_DATA_ID_6 = 44;
    public static final long CRUD_META_FORM_DATA_ID_7 = 45;
    public static final long CRUD_META_FORM_DATA_ID_8 = 46;
    public static final long CRUD_META_FORM_DATA_ID_9 = 47;
    public static final long CRUD_META_FORM_DATA_ID_10 = 48;
    public static final long CRUD_META_FORM_DATA_ID_11 = 49;
    public static final long CRUD_META_FORM_DATA_ID_12 = 50;
    public static final long CRUD_META_FORM_DATA_ID_13 = 51;
    public static final long CRUD_META_FORM_DATA_ID_14 = 52;
    public static final long CRUD_META_FORM_DATA_ID_15 = 53;
    public static final long CRUD_META_FORM_DATA_ID_16 = 54;
    public static final long CRUD_META_FORM_DATA_ID_17 = 55;
    public static final long CRUD_META_FORM_DATA_ID_18 = 56;
    public static final long CRUD_META_FORM_DATA_ID_19 = 57;
    public static final long CRUD_META_FORM_DATA_ID_20 = 58;

    public static final CrudMetaFormData CRUD_META_FORM_DATA_1 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_1,"fromProperty", true, true, null, 1.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_2 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_2,"toProperty", true, true, null, 2.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_3 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_3,"combineOperator", true, true, null, 3.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_4 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_4,"operator", true, true, null, 4.0, null);

    public static final CrudMetaFormData CRUD_META_FORM_DATA_5 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_5,"columnWidth", true, true, null, 1.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_6 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_6,"property", true, true, null, 2.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_7 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_7,"editable", true, true, null, 3.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_8 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_8,"visible", true, true, null, 4.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_9 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_9,"decorator", true, true, null, 5.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_10 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_10,"order", true, true, null, 6.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_11 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_11,"crudClassMetaData", true, true, null, 7.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_12 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_12,"bingingProperties", true, true, null, 8.0, null);

    public static final CrudMetaFormData CRUD_META_FORM_DATA_13 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_13,"fieldLayoutGridPosition", true, true, null, 1.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_14 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_14,"property", true, true, null, 2.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_15 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_15,"editable", true, true, null, 3.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_16 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_16,"visible", true, true, null, 4.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_17 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_17,"decorator", true, true, null,5.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_18 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_18,"order", true, true, null, 6.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_19 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_19,"crudClassMetaData", true, true, null, 7.0, null);
    public static final CrudMetaFormData CRUD_META_FORM_DATA_20 = new CrudMetaFormData(CRUD_META_FORM_DATA_ID_20,"bingingProperties", true, true, null, 8.0, null);

    static {
        CRUD_META_FORM_DATA_1.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_2.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_3.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_4.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_5.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_6.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_7.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_8.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_9.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_10.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_11.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_12.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_13.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_14.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_15.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_16.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_17.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_18.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_19.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_20.setBindingParameters(Collections.emptySet());
        CRUD_META_FORM_DATA_1.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_FORM_DATA_2.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_FORM_DATA_3.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_FORM_DATA_4.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_FORM_DATA_5.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_6.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_7.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_8.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_9.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_10.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_11.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_12.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CRUD_META_FORM_DATA_13.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_14.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_15.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_16.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_17.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_18.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_19.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
        CRUD_META_FORM_DATA_20.setCrudClassMetaData(CRUD_CLASS_META_DATA_2);
    }
    public static final ModelMatcher<CrudMetaFormData> CRUD_META_FORM_DATA_MODEL_MATCHER = new ModelMatcher<>(CrudMetaFormData.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getProperty(), actual.getProperty())
                            && Objects.equals(expected.getEditable(), actual.getEditable())
                            && Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getVisible(), actual.getVisible())
                            && Objects.equals(expected.getDecorator(), actual.getDecorator())
                            && Objects.equals(expected.getOrder(), actual.getOrder())
                            && Objects.equals(expected.getCrudClassMetaData(), actual.getCrudClassMetaData())
                            && Objects.equals(expected.getBindingParameters(), actual.getBindingParameters())
                            && Objects.equals(expected.getFieldLayoutGridPosition(), actual.getFieldLayoutGridPosition())
                    )
    );
}
