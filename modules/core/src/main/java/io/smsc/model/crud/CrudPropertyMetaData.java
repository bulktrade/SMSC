package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

@MappedSuperclass
public class CrudPropertyMetaData extends BaseEntity {

    @Column(name = "PROPERTY", nullable = false)
    @NotEmpty
    private String property;

    @Column(name = "EDITABLE", nullable = false)
    @NotEmpty
    private Boolean editable;

    @Column(name = "VISIBLE", nullable = false)
    @NotEmpty
    private Boolean visible;

    @Column(name = "DECORATOR", nullable = false)
    @NotEmpty
    private String decorator;

    //PostgreSQL isn't supporting column name "ORDER"
    @Column(name = "ORDER_NUMBER", nullable = false)
    @NotEmpty
    private Double order;

    @OneToOne
    @JoinColumn(name="CRUD_CLASS_META_DATA")
    private CrudClassMetaData crudClassMetaData;

    @OneToMany
    @JoinColumn(name="BINDING_PARAMETERS")
    private Set<MetaDataPropertyBindingParameter> bindingParameters;

    public CrudPropertyMetaData() {
    }

    public CrudPropertyMetaData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order, CrudClassMetaData crudClassMetaData, Set<MetaDataPropertyBindingParameter> bindingParameters) {
        super(id);
        this.property = property;
        this.editable = editable;
        this.visible = visible;
        this.decorator = decorator;
        this.order = order;
        this.crudClassMetaData = crudClassMetaData;
        this.bindingParameters = bindingParameters;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Boolean getEditable() {
        return editable;
    }

    public void setEditable(Boolean editable) {
        this.editable = editable;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public String getDecorator() {
        return decorator;
    }

    public void setDecorator(String decorator) {
        this.decorator = decorator;
    }

    public Double getOrder() {
        return order;
    }

    public void setOrder(Double order) {
        this.order = order;
    }

    public CrudClassMetaData getCrudClassMetaData() {
        return crudClassMetaData;
    }

    public void setCrudClassMetaData(CrudClassMetaData crudClassMetaData) {
        this.crudClassMetaData = crudClassMetaData;
    }

    public Set<MetaDataPropertyBindingParameter> getBindingParameters() {
        return bindingParameters;
    }

    public void setBindingParameters(Set<MetaDataPropertyBindingParameter> bindingParameters) {
        this.bindingParameters = bindingParameters;
    }

    @Override
    public String toString() {
        return "CrudPropertyMetaData{" +
                "property='" + property + '\'' +
                ", editable=" + editable +
                ", visible=" + visible +
                ", decorator='" + decorator + '\'' +
                ", order=" + order +
                ", crudClassMetaData=" + crudClassMetaData +
                ", bindingParameters=" + bindingParameters +
                '}';
    }
}
