package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CrudMetaGridData;

import java.util.Collections;
import java.util.Objects;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

public class CrudMetaGridDataTestData {

    public static final long CRUD_META_GRID_DATA_ID_1 = 106;
    public static final long CRUD_META_GRID_DATA_ID_2 = 107;
    public static final long CRUD_META_GRID_DATA_ID_3 = 108;
    public static final long CRUD_META_GRID_DATA_ID_4 = 109;
    public static final long CRUD_META_GRID_DATA_ID_5 = 110;
    public static final long CRUD_META_GRID_DATA_ID_6 = 111;
    public static final long CRUD_META_GRID_DATA_ID_7 = 112;
    public static final long CRUD_META_GRID_DATA_ID_8 = 113;
    public static final long CRUD_META_GRID_DATA_ID_9 = 114;
    public static final long CRUD_META_GRID_DATA_ID_10 = 115;
    public static final long CRUD_META_GRID_DATA_ID_11 = 116;
    public static final long CRUD_META_GRID_DATA_ID_12 = 117;
    public static final long CRUD_META_GRID_DATA_ID_13 = 118;
    public static final long CRUD_META_GRID_DATA_ID_14 = 119;
    public static final long CRUD_META_GRID_DATA_ID_15 = 120;
    public static final long CRUD_META_GRID_DATA_ID_16 = 121;
    public static final long CRUD_META_GRID_DATA_ID_17 = 122;
    public static final long CRUD_META_GRID_DATA_ID_18 = 123;
    public static final long CRUD_META_GRID_DATA_ID_19 = 124;
    public static final long CRUD_META_GRID_DATA_ID_20 = 125;
    public static final long CRUD_META_GRID_DATA_ID_21 = 126;
    public static final long CRUD_META_GRID_DATA_ID_22 = 127;
    public static final long CRUD_META_GRID_DATA_ID_23 = 128;
    public static final long CRUD_META_GRID_DATA_ID_24 = 129;
    public static final long CRUD_META_GRID_DATA_ID_25 = 130;
    public static final long CRUD_META_GRID_DATA_ID_26 = 131;
    public static final long CRUD_META_GRID_DATA_ID_27 = 132;
    public static final long CRUD_META_GRID_DATA_ID_28 = 133;
    public static final long CRUD_META_GRID_DATA_ID_29 = 134;
    public static final long CRUD_META_GRID_DATA_ID_30 = 135;
    public static final long CRUD_META_GRID_DATA_ID_31 = 136;

    public static final CrudMetaGridData CRUD_META_GRID_DATA_1 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_1,"fromProperty", true, true, null, 1.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_2 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_2,"toProperty", true, true, null, 2.0, "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_3 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_3,"combineOperator", true, true, null, 3.0,   "AND,OR,NOT", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_4 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_4,"operator", true, true, null, 4.0,  "EQUALS,MORE,LESS,MORE_OR_EQUALS,LESS_OR_EQUALS,MORE_OR_LESS,LIKE,BETWEEN,IS,INSTANCE_OF,MATCHES", null, null, null);

    public static final CrudMetaGridData CRUD_META_GRID_DATA_5 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_5,"columnWidth", true, true, null, 1.0,  "Double", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_6 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_6,"property", true, true, null, 2.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_7 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_7,"editable", true, true, null, 3.0,  "Boolean", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_8 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_8,"visible", true, true, null, 4.0,  "Boolean", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_9 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_9,"decorator", true, true, null, 5.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_10 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_10,"order", true, true, null, 6.0,  "Double", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_11 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_11,"crudClassMetaData", true, true, null, 7.0,  "URI", "CrudClassMetaData", "crud-class-meta-data", null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_12 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_12,"bindingProperties", true, true, null, 8.0,  "URI", "MetaDataPropertyBindingParameter", "meta-data-property-binding-parameters", null);

    public static final CrudMetaGridData CRUD_META_GRID_DATA_13 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_13,"fieldLayoutGridPosition", true, true, null, 1.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_14 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_14,"property", true, true, null, 2.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_15 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_15,"editable", true, true, null, 3.0,  "Boolean", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_16 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_16,"visible", true, true, null, 4.0,  "Boolean", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_17 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_17,"decorator", true, true, null, 5.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_18 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_18,"order", true, true, null, 6.0,  "Double", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_19 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_19,"crudClassMetaData", true, true, null, 7.0,  "URI", "CrudClassMetaData", "crud-class-meta-data", null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_20 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_20,"bindingProperties", true, true, null, 8.0,  "URI", "MetaDataPropertyBindingParameter", "meta-data-property-binding-parameters", null);

    public static final CrudMetaGridData CRUD_META_GRID_DATA_21 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_21,"customerId", true, true, null, 1.0,  "Double", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_22 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_22,"companyName", true, true, null, 2.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_23 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_23,"street", true, true, null, 3.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_24 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_24,"street2", true, true, null, 4.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_25 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_25,"postcode", true, true, null,5.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_26 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_26,"country", true, true, null, 6.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_27 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_27,"city", true, true, null, 7.0,  "String", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_28 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_28,"vatid", true, true, null, 8.0,  "Double", null, null, null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_29 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_29,"contacts", true, true, null, 9.0,  "URI", "CustomerContact", "customer-contacts", null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_30 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_30,"users", true, true, null, 10.0,  "URI", "User", "users", null);
    public static final CrudMetaGridData CRUD_META_GRID_DATA_31 = new CrudMetaGridData(CRUD_META_GRID_DATA_ID_31,"parentCustomer", true, true, null, 11.0, "URI", "Customer", "customers", null);

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
        CRUD_META_GRID_DATA_21.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_22.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_23.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_24.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_25.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_26.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_27.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_28.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_29.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_30.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_31.setBindingParameters(Collections.emptySet());
        CRUD_META_GRID_DATA_1.setCrudClassMetaData(CRUD_CLASS_META_DATA_6);
        CRUD_META_GRID_DATA_2.setCrudClassMetaData(CRUD_CLASS_META_DATA_6);
        CRUD_META_GRID_DATA_3.setCrudClassMetaData(CRUD_CLASS_META_DATA_6);
        CRUD_META_GRID_DATA_4.setCrudClassMetaData(CRUD_CLASS_META_DATA_6);
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
        CRUD_META_GRID_DATA_21.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_22.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_23.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_24.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_25.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_26.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_27.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_28.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_29.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_30.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
        CRUD_META_GRID_DATA_31.setCrudClassMetaData(CRUD_CLASS_META_DATA_4);
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
