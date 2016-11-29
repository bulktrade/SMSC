package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.crud.meta_data_property_binding_parameter.MetaDataPropertyBindingParameterRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;

public class MetaDataPropertyBindingParameterJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    @Test
    public void testDeleteMetaDataPropertyBindingParameter() throws Exception {
        metaDataPropertyBindingParameterRepository.deleteById(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertCollectionEquals(Collections.emptyList(), metaDataPropertyBindingParameterRepository.findAll());
    }

    @Test
    public void testSaveMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", Collections.singletonList(CombineOperator.OR), Arrays.asList(Operator.IS,Operator.LIKE,Operator.MORE_OR_LESS));
        MetaDataPropertyBindingParameter created = metaDataPropertyBindingParameterRepository.save(newMetaDataPropertyBindingParameter);
        newMetaDataPropertyBindingParameter.setId(created.getId());
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(newMetaDataPropertyBindingParameter, metaDataPropertyBindingParameterRepository.findOne(newMetaDataPropertyBindingParameter.getId()));
    }

    @Test
    public void testGetSingleMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(META_DATA_PROPERTY_BINDING_PARAMETER_1,metaDataPropertyBindingParameter);
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
        updated.setCombineOperator(Arrays.asList(CombineOperator.AND,CombineOperator.NOT));
        updated.setOperator(Arrays.asList(Operator.BETWEEN,Operator.INSTANCE_OF,Operator.LIKE, Operator.MORE_OR_LESS));
        metaDataPropertyBindingParameterRepository.save(updated);
        META_DATA_PROPERTY_BINDING_PARAMETER_MODEL_MATCHER.assertEquals(updated, metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1));
    }
}
