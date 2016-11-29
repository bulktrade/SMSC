package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.crud.crud_meta_form_data.CrudMetaFormDataRepository;
import io.smsc.repository.crud.meta_data_property_binding_parameter.MetaDataPropertyBindingParameterRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static io.smsc.test_data.CrudMetaFormDataTestData.*;
import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;
import static io.smsc.test_data.CrudClassMetaDataTestData.*;

public class CrudMetaFormDataJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private CrudMetaFormDataRepository crudMetaFormDataRepository;

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

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
        CrudMetaFormData newCrudClassMetaData = new CrudMetaFormData(null,"defaultProperty", true,
                true, null, 10.0,"newFieldLayoutGridPosition");
        newCrudClassMetaData.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
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
    public void testUpdateCrudMetaFormData() throws Exception {
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

    @Test
    public void testAddAndRemoveBindingParameter() throws Exception {
        CrudMetaFormData crudMetaFormData = crudMetaFormDataRepository.findOne(CRUD_META_FORM_DATA_ID_1);
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        crudMetaFormData.addBindingParameter(metaDataPropertyBindingParameter);
        crudMetaFormDataRepository.save(crudMetaFormData);
        CRUD_META_FORM_DATA_1.setBindingParameters(Collections.singleton(metaDataPropertyBindingParameter));
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(CRUD_META_FORM_DATA_1,crudMetaFormData);
        CRUD_META_FORM_DATA_1.setBindingParameters(Collections.emptySet());
        crudMetaFormData.removeBindingParameter(metaDataPropertyBindingParameter);
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(CRUD_META_FORM_DATA_1,crudMetaFormData);
    }
}
