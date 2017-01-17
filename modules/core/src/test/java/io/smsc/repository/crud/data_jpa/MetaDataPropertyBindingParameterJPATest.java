package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class MetaDataPropertyBindingParameterJPATest extends AbstractTest {

    @Test
    public void testDeleteMetaDataPropertyBindingParameter() throws Exception {
        metaDataPropertyBindingParameterRepository.delete(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertCollectionEquals(Collections.emptyList(), metaDataPropertyBindingParameterRepository.findAll());
    }

    @Test
    public void testSaveMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", CombineOperator.OR, Operator.MORE_OR_LESS);
        MetaDataPropertyBindingParameter created = metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        newMetaDataPropertyBindingParameter.setId(created.getId());
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(newMetaDataPropertyBindingParameter, metaDataPropertyBindingParameterRepository.findOne(newMetaDataPropertyBindingParameter.getId()));
    }

    @Test
    public void testGetSingleMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(META_DATA_PROPERTY_BINDING_PARAMETER_1, metaDataPropertyBindingParameter);
    }

    @Test
    public void testGetAllMetaDataPropertyBindingParameters() throws Exception {
        Collection<MetaDataPropertyBindingParameter> metaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findAll();
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(META_DATA_PROPERTY_BINDING_PARAMETER_1), metaDataPropertyBindingParameter);
    }

    @Test
    public void testUpdateMetaDataPropertyBindingParameter() throws Exception{
        MetaDataPropertyBindingParameter updated = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_1);
        updated.setFromProperty("from_updated_property");
        updated.setToProperty("to_updated_property");
        updated.setCombineOperator(CombineOperator.AND);
        updated.setOperator(Operator.BETWEEN);
        metaDataPropertyBindingParameterRepository.save(updated);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(updated, metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1));
    }
}
