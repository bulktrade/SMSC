package io.smsc.repository.crud.crudMetaFormData;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.crud.metaDataPropertyBindingParameter.MetaDataPropertyBindingParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CrudMetaFormDataRepositoryImpl implements CrudMetaFormDataRepositoryCustom {

    @Autowired
    private CrudMetaFormDataRepository crudMetaFormDataRepository;

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    @Override
    public CrudMetaFormData addBindingParameter(Long crudMetaFormData, Long bindingParameter) {
        CrudMetaFormData crudMetaFormData1 = crudMetaFormDataRepository.findOne(crudMetaFormData);
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(bindingParameter);
        crudMetaFormData1.addBindingParameter(parameter);
        return crudMetaFormDataRepository.save(crudMetaFormData1);
    }

    @Override
    public CrudMetaFormData removeBindingParameter(Long crudMetaFormData, Long bindingParameter) {
        CrudMetaFormData crudMetaFormData1 = crudMetaFormDataRepository.findOne(crudMetaFormData);
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(bindingParameter);
        crudMetaFormData1.removeBindingParameter(parameter);
        return crudMetaFormDataRepository.save(crudMetaFormData1);
    }
}
