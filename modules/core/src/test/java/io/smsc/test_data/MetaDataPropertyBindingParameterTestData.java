package io.smsc.test_data;

        import io.smsc.matcher.ModelMatcher;
        import io.smsc.model.crud.CombineOperator;
        import io.smsc.model.crud.MetaDataPropertyBindingParameter;
        import io.smsc.model.crud.Operator;

        import java.util.Arrays;
        import java.util.Collections;
        import java.util.Objects;

public class MetaDataPropertyBindingParameterTestData {

    public static final long META_DATA_PROPERTY_BINDING_PARAMETER_ID_1 = 55;
    public static final long META_DATA_PROPERTY_BINDING_PARAMETER_ID_2 = 56;
    public static final long META_DATA_PROPERTY_BINDING_PARAMETER_ID_3 = 57;
    public static final long META_DATA_PROPERTY_BINDING_PARAMETER_ID_4 = 58;

    public static final MetaDataPropertyBindingParameter META_DATA_PROPERTY_BINDING_PARAMETER_1 = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1,"from_default_property_1","to_default_property_1", Collections.singletonList(CombineOperator.AND), Collections.singletonList(Operator.EQUALS));
    public static final MetaDataPropertyBindingParameter META_DATA_PROPERTY_BINDING_PARAMETER_2 = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_ID_2,"from_default_property_2","to_default_property_2", Arrays.asList(CombineOperator.NOT,CombineOperator.OR), Arrays.asList(Operator.BETWEEN,Operator.INSTANCE_OF));
    public static final MetaDataPropertyBindingParameter META_DATA_PROPERTY_BINDING_PARAMETER_3 = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_ID_3,"from_default_property_3","to_default_property_3", Collections.singletonList(CombineOperator.OR), Arrays.asList(Operator.IS,Operator.LIKE,Operator.MORE_OR_EQUALS));
    public static final MetaDataPropertyBindingParameter META_DATA_PROPERTY_BINDING_PARAMETER_4 = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_ID_4,"from_default_property_4","to_default_property_4", Arrays.asList(CombineOperator.AND,CombineOperator.OR), Arrays.asList(Operator.MORE,Operator.LESS_OR_EQUALS,Operator.MATCHES,Operator.MORE_OR_LESS,Operator.LESS));

    public static final ModelMatcher<MetaDataPropertyBindingParameter> META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER = new ModelMatcher<>(MetaDataPropertyBindingParameter.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getFromProperty(), actual.getFromProperty())
                            && Objects.equals(expected.getToProperty(), actual.getToProperty())
                            && Objects.equals(expected.getCombineOperator(), actual.getCombineOperator())
                            && Objects.equals(expected.getOperator(), actual.getOperator())
                    )
    );
}
