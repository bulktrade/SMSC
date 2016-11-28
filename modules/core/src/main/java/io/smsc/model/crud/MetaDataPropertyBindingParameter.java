package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.List;

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
    @CollectionTable(name = "META_DATA_PROPERTY_BINDING_PARAMETER_COMBINE_OPERATOR", joinColumns = @JoinColumn(name = "META_DATA_PROPERTY_BINDING_PARAMETER_ID"))
    @Column(name = "COMBINE_OPERATOR")
    @ElementCollection(fetch = FetchType.EAGER)
    private List<CombineOperator> combineOperator;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "META_DATA_PROPERTY_BINDING_PARAMETER_OPERATOR", joinColumns = @JoinColumn(name = "META_DATA_PROPERTY_BINDING_PARAMETER_ID"))
    @Column(name = "OPERATOR")
    @ElementCollection()
    private List<Operator> operator;

    public MetaDataPropertyBindingParameter() {
    }

    public MetaDataPropertyBindingParameter(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter) {
        this(metaDataPropertyBindingParameter.getId(), metaDataPropertyBindingParameter.getFromProperty(), metaDataPropertyBindingParameter.getToProperty(),
                metaDataPropertyBindingParameter.getCombineOperator(), metaDataPropertyBindingParameter.getOperator());
    }

    public MetaDataPropertyBindingParameter(Long id, String fromProperty, String toProperty, List<CombineOperator> combineOperator, List<Operator> operator) {
        super(id);
        this.fromProperty = fromProperty;
        this.toProperty = toProperty;
        this.combineOperator = combineOperator;
        this.operator = operator;
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

    public List<CombineOperator> getCombineOperator() {
        return combineOperator;
    }

    public void setCombineOperator(List<CombineOperator> combineOperator) {
        this.combineOperator = combineOperator;
    }

    public List<Operator> getOperator() {
        return operator;
    }

    public void setOperator(List<Operator> operator) {
        this.operator = operator;
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
