package io.smsc.model.crud;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "CRUD_META_FORM_DATA")
public class CrudMetaFormData extends CrudPropertyMetaData {

    @Column(name = "FIELD_LAYOUT_GRID_POSITION")
//    @NotEmpty(message = "{crud.meta.form.data.field.layout.grid.position.validation}")
    private String fieldLayoutGridPosition;

    public CrudMetaFormData() {
    }

    public CrudMetaFormData(CrudMetaFormData crudMetaFormData) {
        this(crudMetaFormData.getId(), crudMetaFormData.getProperty(), crudMetaFormData.getEditable(), crudMetaFormData.getVisible(),
                crudMetaFormData.getDecorator(), crudMetaFormData.getOrder(), crudMetaFormData.getCrudClassMetaData(),
                crudMetaFormData.getBindingParameters(), crudMetaFormData.getFieldLayoutGridPosition());
    }

    public CrudMetaFormData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            CrudClassMetaData crudClassMetaData, Set<MetaDataPropertyBindingParameter> bindingParameters,
                            String fieldLayoutGridPosition) {
        super(id, property, editable, visible, decorator, order, crudClassMetaData, bindingParameters);
        this.fieldLayoutGridPosition = fieldLayoutGridPosition;
    }

    public String getFieldLayoutGridPosition() {
        return fieldLayoutGridPosition;
    }

    public void setFieldLayoutGridPosition(String fieldLayoutGridPosition) {
        this.fieldLayoutGridPosition = fieldLayoutGridPosition;
    }

    @Override
    public String toString() {
        return "CrudMetaFormData{" +
                "fieldLayoutGridPosition='" + fieldLayoutGridPosition + '\'' +
                "} " + super.toString();
    }
}
