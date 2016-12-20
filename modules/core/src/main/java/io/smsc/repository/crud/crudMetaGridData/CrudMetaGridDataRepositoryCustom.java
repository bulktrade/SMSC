package io.smsc.repository.crud.crudMetaGridData;

import io.smsc.model.crud.CrudMetaGridData;

public interface CrudMetaGridDataRepositoryCustom {

    CrudMetaGridData addBindingParameter(Long crudMetaGridData, Long bindingParameter);
    CrudMetaGridData removeBindingParameter(Long crudMetaGridData, Long bindingParameter);
}
