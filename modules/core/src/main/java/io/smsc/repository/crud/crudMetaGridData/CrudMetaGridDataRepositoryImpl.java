package io.smsc.repository.crud.crudMetaGridData;

import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.crud.metaDataPropertyBindingParameter.MetaDataPropertyBindingParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CrudMetaGridDataRepositoryImpl implements CrudMetaGridDataRepositoryCustom {

    @Autowired
    private CrudMetaGridDataRepository crudMetaGridDataRepository;

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    @Override
    public CrudMetaGridData addBindingParameter(Long crudMetaGridData, Long bindingParameter) {
        CrudMetaGridData crudMetaGridData1 = crudMetaGridDataRepository.findOne(crudMetaGridData);
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(bindingParameter);
        crudMetaGridData1.addBindingParameter(parameter);
        return crudMetaGridDataRepository.save(crudMetaGridData1);
    }

    @Override
    public CrudMetaGridData removeBindingParameter(Long crudMetaGridData, Long bindingParameter) {
        CrudMetaGridData crudMetaGridData1 = crudMetaGridDataRepository.findOne(crudMetaGridData);
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(bindingParameter);
        crudMetaGridData1.addBindingParameter(parameter);
        return crudMetaGridDataRepository.save(crudMetaGridData1);
    }
}
