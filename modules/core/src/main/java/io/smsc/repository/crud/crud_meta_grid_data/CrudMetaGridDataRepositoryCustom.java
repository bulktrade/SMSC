package io.smsc.repository.crud.crud_meta_grid_data;

import io.smsc.model.crud.CrudMetaGridData;

public interface CrudMetaGridDataRepositoryCustom {

    CrudMetaGridData addBindingParameter(Long crudMetaGridData, Long bindingParameter);
    CrudMetaGridData removeBindingParameter(Long crudMetaGridData, Long bindingParameter);
}
