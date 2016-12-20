package io.smsc.repository.crud.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class MetaDataPropertyBindingParameterValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyMetaDataPropertyBindingParameterFromPropertySave() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "",
                "to_new_property", CombineOperator.OR, Operator.MORE_OR_LESS);
        metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        metaDataPropertyBindingParameterRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyMetaDataPropertyBindingParameterToPropertySave() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "from_new_property",
                "", CombineOperator.OR, Operator.MORE_OR_LESS);
        metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        metaDataPropertyBindingParameterRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyMetaDataPropertyBindingParameterCombineOperatorSave() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", null, Operator.MORE_OR_LESS);
        metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        metaDataPropertyBindingParameterRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyMetaDataPropertyBindingParameterOperatorSave() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", CombineOperator.OR, null);
        metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        metaDataPropertyBindingParameterRepository.findAll();
    }
}
