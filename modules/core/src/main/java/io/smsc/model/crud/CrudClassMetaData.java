package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Specifies CrudClassMetaData class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CRUD_CLASS_META_DATA", uniqueConstraints = {@UniqueConstraint(columnNames = "CLASS_NAME", name = "crud_class_meta_data_unique_class_idx")})
public class CrudClassMetaData extends BaseEntity {

    @Column(name = "CLASS_NAME", nullable = false, unique = true)
    @NotEmpty(message = "{crud.class.meta.data.className.validation}")
    private String className;

    @Column(name = "TITLE_COLUMNS", nullable = false)
    @NotEmpty(message = "{crud.class.meta.data.titleColumns.validation}")
    private String titleColumns;

    @Column(name = "EDITABLE", nullable = false)
    @NotNull(message = "{crud.class.meta.data.editable.validation}")
    private Boolean editable;

    //Oracle isn't supporting column name "QUERY"
    @Column(name = "QUERY_NAME")
    private String query;

    @OneToMany(mappedBy = "crudClassMetaData")
    private Set<CrudMetaFormData> crudMetaFormData;

    @OneToMany(mappedBy = "crudClassMetaData")
    private Set<CrudMetaGridData> crudMetaGridData;

    public CrudClassMetaData() {
    }

    public CrudClassMetaData(CrudClassMetaData crudClassMetaData) {
        this(crudClassMetaData.getId(),crudClassMetaData.getClassName(),crudClassMetaData.getTitleColumns(),
                crudClassMetaData.getEditable(), crudClassMetaData.getQuery());
    }

    public CrudClassMetaData(Long id, String className, String titleColumns, Boolean editable, String query) {
        super(id);
        this.className = className;
        this.titleColumns = titleColumns;
        this.editable = editable;
        this.query = query;
    }

    /**
     * This method is used for removing all links on CrudClassMetaData entity from
     * appropriate CrudMetaFormData and CrudMetaGridData entities before entity
     * is removed. Without it deleting an entity can cause <code>ConstraintViolationException<code/>
     */
    @PreRemove
    private void removeCrudMetaFormGridDataFromCrudClassMetaData() {
        for(CrudMetaFormData crudMetaFormData : crudMetaFormData){
            crudMetaFormData.setCrudClassMetaData(null);
        }
        for(CrudMetaGridData crudMetaGridData : crudMetaGridData){
            crudMetaGridData.setCrudClassMetaData(null);
        }
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getTitleColumns() {
        return titleColumns;
    }

    public void setTitleColumns(String titleColumns) {
        this.titleColumns = titleColumns;
    }

    public Boolean getEditable() {
        return editable;
    }

    public void setEditable(Boolean editable) {
        this.editable = editable;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Set<CrudMetaFormData> getCrudMetaFormData() {
        return crudMetaFormData;
    }

    public void setCrudMetaFormData(Set<CrudMetaFormData> crudMetaFormDatas) {
        this.crudMetaFormData = crudMetaFormDatas;
    }

    public Set<CrudMetaGridData> getCrudMetaGridData() {
        return crudMetaGridData;
    }

    public void setCrudMetaGridData(Set<CrudMetaGridData> crudMetaGridDatas) {
        this.crudMetaGridData = crudMetaGridDatas;
    }

    @Override
    public String toString() {
        return "CrudClassMetaData{" +
                "className='" + className + '\'' +
                ", titleColumns='" + titleColumns + '\'' +
                ", editable=" + editable +
                ", query='" + query + '\'' +
                '}';
    }
}
