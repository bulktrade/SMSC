package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;

import java.util.Objects;

public class MetaDataPropertyBindingParameterTestData {

    public static final long META_DATA_PROPERTY_BINDING_PARAMETER_ID_1 = 239;

    public static final MetaDataPropertyBindingParameter META_DATA_PROPERTY_BINDING_PARAMETER_1 = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1,"customer","@rid", CombineOperator.OR, Operator.EQUALS);

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
