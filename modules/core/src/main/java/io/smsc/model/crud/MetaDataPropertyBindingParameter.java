package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

@Entity
@Table(name = "META_DATA_PROPERTY_BINDING_PARAMETER")
public class MetaDataPropertyBindingParameter extends BaseEntity {

    @Column(name = "FROM_PROPERTY", nullable = false)
    @NotEmpty(message = "{meta.data.property.binding.parameter.from.property.validation}")
    private String fromProperty;

    @Column(name = "TO_PROPERTY", nullable = false)
    @NotEmpty(message = "{meta.data.property.binding.parameter.to.property.validation}")
    private String toProperty;

    @Enumerated(EnumType.STRING)
    @Column(name = "COMBINE_OPERATOR", nullable = false)
    private CombineOperator combineOperator;

    @Enumerated(EnumType.STRING)
    @Column(name = "OPERATOR", nullable = false)
    private Operator operator;

    @Column(name="CRUD_META_FORM_DATA")
    private Long crudMetaFormDataId;

    @Column(name="CRUD_META_GRID_DATA")
    private Long crudMetaGridDataId;

    public MetaDataPropertyBindingParameter() {
    }

    public MetaDataPropertyBindingParameter(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter) {
        this(metaDataPropertyBindingParameter.getId(), metaDataPropertyBindingParameter.getFromProperty(), metaDataPropertyBindingParameter.getToProperty(),
                metaDataPropertyBindingParameter.getCombineOperator(), metaDataPropertyBindingParameter.getOperator());
    }

    public MetaDataPropertyBindingParameter(Long id, String fromProperty, String toProperty, CombineOperator combineOperator, Operator operator) {
        super(id);
        this.fromProperty = fromProperty;
        this.toProperty = toProperty;
        this.combineOperator = combineOperator;
        this.operator = operator;
    }

    public MetaDataPropertyBindingParameter(Long id, String fromProperty, String toProperty) {
        super(id);
        this.fromProperty = fromProperty;
        this.toProperty = toProperty;
    }

    public String getFromProperty() {
        return fromProperty;
    }

    public void setFromProperty(String fromProperty) {
        this.fromProperty = fromProperty;
    }

    public String getToProperty() {
        return toProperty;
    }

    public void setToProperty(String toProperty) {
        this.toProperty = toProperty;
    }

    public CombineOperator getCombineOperator() {
        return combineOperator;
    }

    public void setCombineOperator(CombineOperator combineOperator) {
        this.combineOperator = combineOperator;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public Long getCrudMetaFormDataId() {
        return crudMetaFormDataId;
    }

    public void setCrudMetaFormDataId(Long crudMetaFormDataId) {
        this.crudMetaFormDataId = crudMetaFormDataId;
    }

    public Long getCrudMetaGridDataId() {
        return crudMetaGridDataId;
    }

    public void setCrudMetaGridDataId(Long crudMetaGridDataId) {
        this.crudMetaGridDataId = crudMetaGridDataId;
    }

    @Override
    public String toString() {
        return "MetaDataPropertyBindingParameter{" +
                "fromProperty='" + fromProperty + '\'' +
                ", toProperty='" + toProperty + '\'' +
                ", combineOperator=" + combineOperator +
                ", operator=" + operator +
                '}';
    }
}
