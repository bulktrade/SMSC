package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Specifies MetaDataPropertyBindingParameter class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @see     CrudMetaFormData
 * @see     CrudMetaGridData
 * @see     Operator
 * @see     CombineOperator
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "META_DATA_BINDING_PARAMETER")
public class MetaDataPropertyBindingParameter extends BaseEntity {

    @Column(name = "FROM_PROPERTY", nullable = false)
    @NotEmpty(message = "{meta.data.property.binding.parameter.from.property.validation}")
    private String fromProperty;

    @Column(name = "TO_PROPERTY", nullable = false)
    @NotEmpty(message = "{meta.data.property.binding.parameter.to.property.validation}")
    private String toProperty;

    @Enumerated(EnumType.STRING)
    @Column(name = "COMBINE_OPERATOR", nullable = false)
    @NotNull(message = "{meta.data.property.binding.parameter.combineOperator.validation}")
    private CombineOperator combineOperator;

    @Enumerated(EnumType.STRING)
    @Column(name = "OPERATOR", nullable = false)
    @NotNull(message = "{meta.data.property.binding.parameter.operator.validation}")
    private Operator operator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRUD_META_FORM_DATA")
    private CrudMetaFormData crudMetaFormData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRUD_META_GRID_DATA")
    private CrudMetaGridData crudMetaGridData;

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

    public CrudMetaFormData getCrudMetaFormData() {
        return crudMetaFormData;
    }

    public void setCrudMetaFormData(CrudMetaFormData crudMetaFormData) {
        this.crudMetaFormData = crudMetaFormData;
    }

    public CrudMetaGridData getCrudMetaGridData() {
        return crudMetaGridData;
    }

    public void setCrudMetaGridData(CrudMetaGridData crudMetaGridData) {
        this.crudMetaGridData = crudMetaGridData;
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
