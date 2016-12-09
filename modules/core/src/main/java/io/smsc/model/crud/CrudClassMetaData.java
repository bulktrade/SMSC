package io.smsc.model.crud;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

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
//    @NotEmpty(message = "{crud.class.meta.data.query.validation}")
    private String query;

    @OneToMany(mappedBy = "crudClassMetaData")
    private List<CrudMetaFormData> crudMetaFormDatas;

    @OneToMany(mappedBy = "crudClassMetaData")
    private List<CrudMetaGridData> crudMetaGridDatas;

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

    @PreRemove
    private void removeCrudMetaFormGridDataFromCrudClassMetaData() {
        for(CrudMetaFormData crudMetaFormData : crudMetaFormDatas){
            crudMetaFormData.setCrudClassMetaData(null);
        }
        for(CrudMetaGridData crudMetaGridData : crudMetaGridDatas){
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

    public List<CrudMetaFormData> getCrudMetaFormDatas() {
        return crudMetaFormDatas;
    }

    public void setCrudMetaFormDatas(List<CrudMetaFormData> crudMetaFormDatas) {
        this.crudMetaFormDatas = crudMetaFormDatas;
    }

    public List<CrudMetaGridData> getCrudMetaGridDatas() {
        return crudMetaGridDatas;
    }

    public void setCrudMetaGridDatas(List<CrudMetaGridData> crudMetaGridDatas) {
        this.crudMetaGridDatas = crudMetaGridDatas;
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
