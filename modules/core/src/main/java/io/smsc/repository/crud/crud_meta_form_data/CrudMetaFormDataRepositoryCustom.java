package io.smsc.repository.crud.crud_meta_form_data;

import io.smsc.model.crud.CrudMetaFormData;

public interface CrudMetaFormDataRepositoryCustom {

    CrudMetaFormData addBindingParameter(Long crudMetaFormData, Long bindingParameter);
    CrudMetaFormData removeBindingParameter(Long crudMetaFormData, Long bindingParameter);
}
