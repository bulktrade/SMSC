package io.smsc.model.crud;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "CRUD_META_GRID_DATA")
public class CrudMetaGridData extends CrudPropertyMetaData {

    @Column(name = "COLUMN_WIDTH")
//    @NotEmpty(message = "{crud.meta.grid.data.column.width.validation}")
    private Double columnWidth;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="CRUD_META_GRID_DATA", referencedColumnName = "ID")
    private Set<MetaDataPropertyBindingParameter> bindingParameters;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CRUD_CLASS_META_DATA")
    private CrudClassMetaData crudClassMetaData;

    public CrudMetaGridData() {
    }

    public CrudMetaGridData(CrudMetaGridData crudMetaGridData) {
        this(crudMetaGridData.getId(), crudMetaGridData.getProperty(), crudMetaGridData.getEditable(), crudMetaGridData.getVisible(),
                crudMetaGridData.getDecorator(), crudMetaGridData.getOrder(), crudMetaGridData.getColumnWidth());
    }

    public CrudMetaGridData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            Double columnWidth) {
        super(id, property, editable, visible, decorator, order);
        this.columnWidth = columnWidth;
    }

    public CrudMetaGridData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            Double columnWidth, CrudClassMetaData crudClassMetaData) {
        super(id, property, editable, visible, decorator, order);
        this.columnWidth = columnWidth;
        this.crudClassMetaData = crudClassMetaData;
    }

    @PreRemove
    private void removeBindingParametersFromCrudMetaGridData() {
        for(MetaDataPropertyBindingParameter parameter : bindingParameters){
            parameter.setCrudMetaGridDataId(null);
        }
    }

    public Double getColumnWidth() {
        return columnWidth;
    }

    public void setColumnWidth(Double columnWidth) {
        this.columnWidth = columnWidth;
    }

    public Set<MetaDataPropertyBindingParameter> getBindingParameters() {
        return bindingParameters;
    }

    public void setBindingParameters(Set<MetaDataPropertyBindingParameter> bindingParameters) {
        this.bindingParameters = bindingParameters;
    }

    public CrudClassMetaData getCrudClassMetaData() {
        return crudClassMetaData;
    }

    public void setCrudClassMetaData(CrudClassMetaData crudClassMetaData) {
        this.crudClassMetaData = crudClassMetaData;
    }

    public boolean addBindingParameter(MetaDataPropertyBindingParameter parameter) {
        return this.getBindingParameters().add(parameter);
    }

    public boolean removeBindingParameter(MetaDataPropertyBindingParameter parameter) {
        return this.getBindingParameters().remove(parameter);
    }

    @Override
    public String toString() {
        return "CrudMetaGridData{" +
                "columnWidth=" + columnWidth +
                ", bindingParameters=" + bindingParameters +
                ", crudClassMetaGridData=" + crudClassMetaData +
                "} " + super.toString();
    }
}
