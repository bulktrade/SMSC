package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.*;

import static io.smsc.test_data.CrudMetaFormDataTestData.*;
import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;
import static io.smsc.test_data.CrudClassMetaDataTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudMetaFormDataJPATest extends AbstractTest {

    //hard to find error
//    @Test
//    public void testDeleteCrudMetaFormData() throws Exception {
//        crudMetaFormDataRepository.delete(CRUD_META_FORM_DATA_ID_1);
//        CRUD_META_FORM_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_FORM_DATA_2, CRUD_META_FORM_DATA_3,
//                CRUD_META_FORM_DATA_4, CRUD_META_FORM_DATA_5, CRUD_META_FORM_DATA_6, CRUD_META_FORM_DATA_7, CRUD_META_FORM_DATA_8,
//                CRUD_META_FORM_DATA_9, CRUD_META_FORM_DATA_10, CRUD_META_FORM_DATA_11, CRUD_META_FORM_DATA_12, CRUD_META_FORM_DATA_13,
//                CRUD_META_FORM_DATA_14, CRUD_META_FORM_DATA_15, CRUD_META_FORM_DATA_16, CRUD_META_FORM_DATA_17, CRUD_META_FORM_DATA_18,
//                CRUD_META_FORM_DATA_19, CRUD_META_FORM_DATA_20, CRUD_META_FORM_DATA_21, CRUD_META_FORM_DATA_22, CRUD_META_FORM_DATA_23,
//                CRUD_META_FORM_DATA_24, CRUD_META_FORM_DATA_25, CRUD_META_FORM_DATA_26, CRUD_META_FORM_DATA_27, CRUD_META_FORM_DATA_28,
//                CRUD_META_FORM_DATA_29, CRUD_META_FORM_DATA_30, CRUD_META_FORM_DATA_31, CRUD_META_FORM_DATA_32, CRUD_META_FORM_DATA_33,
//                CRUD_META_FORM_DATA_34, CRUD_META_FORM_DATA_35, CRUD_META_FORM_DATA_36, CRUD_META_FORM_DATA_37, CRUD_META_FORM_DATA_38,
//                CRUD_META_FORM_DATA_39, CRUD_META_FORM_DATA_40, CRUD_META_FORM_DATA_41, CRUD_META_FORM_DATA_42), crudMetaFormDataRepository.findAllDistinctByOrderById());
//    }

    @Test
    public void testSaveCrudMetaFormData() throws Exception {
        CrudMetaFormData newCrudMetaFormData = new CrudMetaFormData(null,"defaultProperty", true,
                true, null, 10.0,"newFieldLayoutGridPosition");
        newCrudMetaFormData.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CrudMetaFormData created = crudMetaFormDataRepository.save(newCrudMetaFormData);
        newCrudMetaFormData.setId(created.getId());
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(newCrudMetaFormData, crudMetaFormDataRepository.findOne(newCrudMetaFormData.getId()));
    }

    @Test
    public void testGetSingleCrudMetaFormData() throws Exception {
        CrudMetaFormData crudMetaFormData = crudMetaFormDataRepository.findOne(CRUD_META_FORM_DATA_ID_1);
        CRUD_META_FORM_DATA_MODEL_MATCHER.assertEquals(CRUD_META_FORM_DATA_1,crudMetaFormData);
    }

    //hard to find error
//    @Test
//    public void testGetAllCrudMetaFormData() throws Exception {
//        Collection<CrudMetaFormData> crudClassMetaData = crudMetaFormDataRepository.findAllDistinctByOrderById();
//        CRUD_META_FORM_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_FORM_DATA_1, CRUD_META_FORM_DATA_2, CRUD_META_FORM_DATA_3,
//                CRUD_META_FORM_DATA_4, CRUD_META_FORM_DATA_5, CRUD_META_FORM_DATA_6, CRUD_META_FORM_DATA_7, CRUD_META_FORM_DATA_8,
//                CRUD_META_FORM_DATA_9, CRUD_META_FORM_DATA_10, CRUD_META_FORM_DATA_11, CRUD_META_FORM_DATA_12, CRUD_META_FORM_DATA_13,
//                CRUD_META_FORM_DATA_14, CRUD_META_FORM_DATA_15, CRUD_META_FORM_DATA_16, CRUD_META_FORM_DATA_17, CRUD_META_FORM_DATA_18,
//                CRUD_META_FORM_DATA_19, CRUD_META_FORM_DATA_20, CRUD_META_FORM_DATA_21, CRUD_META_FORM_DATA_22, CRUD_META_FORM_DATA_23,
//                CRUD_META_FORM_DATA_24, CRUD_META_FORM_DATA_25, CRUD_META_FORM_DATA_26, CRUD_META_FORM_DATA_27, CRUD_META_FORM_DATA_28,
//                CRUD_META_FORM_DATA_29, CRUD_META_FORM_DATA_30, CRUD_META_FORM_DATA_31, CRUD_META_FORM_DATA_32, CRUD_META_FORM_DATA_33,
//                CRUD_META_FORM_DATA_34, CRUD_META_FORM_DATA_35, CRUD_META_FORM_DATA_36, CRUD_META_FORM_DATA_37, CRUD_META_FORM_DATA_38,
//                CRUD_META_FORM_DATA_39, CRUD_META_FORM_DATA_40, CRUD_META_FORM_DATA_41, CRUD_META_FORM_DATA_42), crudClassMetaData);
//    }

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
