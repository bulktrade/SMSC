package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.crud.CrudMetaFormDataRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static io.smsc.test_data.CrudMetaFormDataTestData.*;
import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;
import static io.smsc.test_data.CrudClassMetaDataTestData.*;

public class CrudMetaFormDataJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private CrudMetaFormDataRepository crudMetaFormDataRepository;

    @Test
    public void testDeleteCrudMetaFormData() throws Exception {
        crudMetaFormDataRepository.deleteById(CRUD_META_FORM_DATA_ID_1);
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_FORM_DATA_2,CRUD_META_FORM_DATA_3,
                CRUD_META_FORM_DATA_4, CRUD_META_FORM_DATA_5, CRUD_META_FORM_DATA_6, CRUD_META_FORM_DATA_7, CRUD_META_FORM_DATA_8,
                CRUD_META_FORM_DATA_9, CRUD_META_FORM_DATA_10, CRUD_META_FORM_DATA_11, CRUD_META_FORM_DATA_12, CRUD_META_FORM_DATA_13,
                CRUD_META_FORM_DATA_14, CRUD_META_FORM_DATA_15, CRUD_META_FORM_DATA_16, CRUD_META_FORM_DATA_17, CRUD_META_FORM_DATA_18,
                CRUD_META_FORM_DATA_19, CRUD_META_FORM_DATA_20), crudMetaFormDataRepository.findAll());
    }

    @Test
    public void testSaveCrudMetaFormData() throws Exception {
        Set<MetaDataPropertyBindingParameter> metaDataPropertyBindingParameters = new HashSet<>();
        metaDataPropertyBindingParameters.addAll(Arrays.asList(META_DATA_PROPERTY_BINDING_PARAMETER_1,META_DATA_PROPERTY_BINDING_PARAMETER_2));
        CrudMetaFormData newCrudClassMetaData = new CrudMetaFormData(null,"defaultProperty", true, true, null, 10.0,
        CRUD_CLASS_META_DATA_1, metaDataPropertyBindingParameters,"newFieldLayoutGridPosition");
        CrudMetaFormData created = crudMetaFormDataRepository.save(newCrudClassMetaData);
        newCrudClassMetaData.setId(created.getId());
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(newCrudClassMetaData, crudMetaFormDataRepository.findOne(newCrudClassMetaData.getId()));
    }

    @Test
    public void testGetSingleCrudMetaFormData() throws Exception {
        CrudMetaFormData crudClassMetaData = crudMetaFormDataRepository.findOne(CRUD_META_FORM_DATA_ID_1);
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(CRUD_META_FORM_DATA_1,crudClassMetaData);
    }

    @Test
    public void testGetAllCrudMetaFormDatas() throws Exception {
        Collection<CrudMetaFormData> crudClassMetaDatas = crudMetaFormDataRepository.findAll();
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_FORM_DATA_1, CRUD_META_FORM_DATA_2,
                CRUD_META_FORM_DATA_3, CRUD_META_FORM_DATA_4, CRUD_META_FORM_DATA_5, CRUD_META_FORM_DATA_6, CRUD_META_FORM_DATA_7,
                CRUD_META_FORM_DATA_8, CRUD_META_FORM_DATA_9, CRUD_META_FORM_DATA_10, CRUD_META_FORM_DATA_11, CRUD_META_FORM_DATA_12,
                CRUD_META_FORM_DATA_13, CRUD_META_FORM_DATA_14, CRUD_META_FORM_DATA_15, CRUD_META_FORM_DATA_16, CRUD_META_FORM_DATA_17,
                CRUD_META_FORM_DATA_18, CRUD_META_FORM_DATA_19, CRUD_META_FORM_DATA_20), crudClassMetaDatas);
    }

    @Test
    public void testUpdateCrudMetaFormData() throws Exception{
        CrudMetaFormData updated = new CrudMetaFormData(CRUD_META_FORM_DATA_1);
        updated.setDecorator("newDecorator");
        updated.setEditable(false);
        updated.setOrder(20.0);
        updated.setProperty("newProperty");
        updated.setVisible(false);
        updated.setFieldLayoutGridPosition("newFieldLayoutGridPosition");
        crudMetaFormDataRepository.save(updated);
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(updated, crudMetaFormDataRepository.findOne(CRUD_META_FORM_DATA_ID_1));
    }
}
