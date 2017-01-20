package io.smsc.model.crud;

import io.smsc.model.BaseEntity;

import javax.persistence.*;
import java.util.Set;

/**
 * Specifies CrudMetaFormData class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @see     CrudPropertyMetaData
 * @see     CrudClassMetaData
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CRUD_META_FORM_DATA")
public class CrudMetaFormData extends CrudPropertyMetaData {

    @Column(name = "FIELD_LAYOUT_GRID_POSITION")
    private String fieldLayoutGridPosition;

    @OneToMany(mappedBy = "crudMetaFormData")
    private Set<MetaDataPropertyBindingParameter> bindingParameters;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRUD_CLASS_META_DATA_ID")
    private CrudClassMetaData crudClassMetaData;

    public CrudMetaFormData() {
    }

    public CrudMetaFormData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            String type, String linkedClass, String linkedRepository) {
        super(id, property, editable, visible, decorator, order, type, linkedClass, linkedRepository);
    }

    public CrudMetaFormData(CrudMetaFormData crudMetaFormData) {
        this(crudMetaFormData.getId(), crudMetaFormData.getProperty(), crudMetaFormData.getEditable(), crudMetaFormData.getVisible(),
                crudMetaFormData.getDecorator(), crudMetaFormData.getOrder(), crudMetaFormData.getType(), crudMetaFormData.getLinkedClass(),
                crudMetaFormData.getLinkedRepository(), crudMetaFormData.getFieldLayoutGridPosition());
    }

    public CrudMetaFormData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            String type, String linkedClass, String linkedRepository, String fieldLayoutGridPosition) {
        super(id, property, editable, visible, decorator, order, type, linkedClass, linkedRepository);
        this.fieldLayoutGridPosition = fieldLayoutGridPosition;
    }

    public CrudMetaFormData(Long id, String property, Boolean editable, Boolean visible, String decorator, Double order,
                            String type, String linkedClass, String linkedRepository, String fieldLayoutGridPosition,
                            CrudClassMetaData crudClassMetaData) {
        super(id, property, editable, visible, decorator, order, type, linkedClass, linkedRepository);
        this.fieldLayoutGridPosition = fieldLayoutGridPosition;
        this.crudClassMetaData = crudClassMetaData;
    }

    /**
     * This method is used for removing all links on CrudMetaFormData entity from
     * appropriate MetaDataPropertyBindingParameter entities before entity
     * is removed. Without it deleting entity can cause <code>ConstraintViolationException<code/>
     */
    @PreRemove
    private void removeBindingParametersFromCrudMetaFormData() {
        for(MetaDataPropertyBindingParameter parameter : bindingParameters){
            parameter.setCrudMetaFormData(null);
        }
    }

    public String getFieldLayoutGridPosition() {
        return fieldLayoutGridPosition;
    }

    public void setFieldLayoutGridPosition(String fieldLayoutGridPosition) {
        this.fieldLayoutGridPosition = fieldLayoutGridPosition;
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
        return "CrudMetaFormData{" +
                "fieldLayoutGridPosition='" + fieldLayoutGridPosition + '\'' +
                ", bindingParameters=" + bindingParameters +
                ", crudClassMetaData=" + crudClassMetaData +
                "} " + super.toString();
    }
}
