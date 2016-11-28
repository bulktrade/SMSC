package io.smsc.model.crud;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "CRUD_META_GRID_DATA")
public class CrudMetaGridData extends CrudPropertyMetaData {

    @Column(name = "COLUMN_WIDTH")
//    @NotEmpty(message = "{crud.meta.grid.data.column.width.validation}")
    private Double columnWidth;

    public CrudMetaGridData() {
    }

    public CrudMetaGridData(CrudMetaGridData crudMetaGridData) {
        this(crudMetaGridData.getId(), crudMetaGridData.getProperty(), crudMetaGridData.getEditable(), crudMetaGridData.getVisible(),
                crudMetaGridData.getDecorator(), crudMetaGridData.getOrder(), crudMetaGridData.getCrudClassMetaData(),
                crudMetaGridData.getBindingParameters(), crudMetaGridData.getColumnWidth());
    }

    public CrudMetaGridData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            CrudClassMetaData crudClassMetaData, Set<MetaDataPropertyBindingParameter> bindingParameters,
                            Double columnWidth) {
        super(id, property, editable, visible, decorator, order, crudClassMetaData, bindingParameters);
        this.columnWidth = columnWidth;
    }

    public Double getColumnWidth() {
        return columnWidth;
    }

    public void setColumnWidth(Double columnWidth) {
        this.columnWidth = columnWidth;
    }

    @Override
    public String toString() {
        return "CrudMetaGridData{" +
                "columnWidth=" + columnWidth +
                "} " + super.toString();
    }
}
