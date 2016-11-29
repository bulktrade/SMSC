package io.smsc.repository.crud.meta_data_property_binding_parameter;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import io.smsc.repository.crud.crud_meta_form_data.CrudMetaFormDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MetaDataPropertyBindingParameterRepositoryImpl implements MetaDataPropertyBindingParameterRepositoryCustom {

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    @Override
    public MetaDataPropertyBindingParameter addOperator(Long metaDataPropertyBindingParameter, Operator operator) {
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(metaDataPropertyBindingParameter);
        parameter.addOperator(operator);
        return metaDataPropertyBindingParameterRepository.save(parameter);
    }

    @Override
    public MetaDataPropertyBindingParameter removeOperator(Long metaDataPropertyBindingParameter, Operator operator) {
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(metaDataPropertyBindingParameter);
        parameter.removeOperator(operator);
        return metaDataPropertyBindingParameterRepository.save(parameter);
    }

    @Override
    public MetaDataPropertyBindingParameter addCombineOperator(Long metaDataPropertyBindingParameter, CombineOperator combineOperator) {
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(metaDataPropertyBindingParameter);
        parameter.addCombineOperator(combineOperator);
        return metaDataPropertyBindingParameterRepository.save(parameter);
    }

    @Override
    public MetaDataPropertyBindingParameter removeCombineOperator(Long metaDataPropertyBindingParameter, CombineOperator combineOperator) {
        MetaDataPropertyBindingParameter parameter = metaDataPropertyBindingParameterRepository.findOne(metaDataPropertyBindingParameter);
        parameter.removeCombineOperator(combineOperator);
        return metaDataPropertyBindingParameterRepository.save(parameter);
    }
}
