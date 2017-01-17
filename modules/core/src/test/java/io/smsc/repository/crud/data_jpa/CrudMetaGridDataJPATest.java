package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.*;

import static io.smsc.test_data.CrudMetaGridDataTestData.*;
import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;
import static io.smsc.test_data.CrudClassMetaDataTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudMetaGridDataJPATest extends AbstractTest {

    @Test
    public void testDeleteCrudMetaGridData() throws Exception {
        crudMetaGridDataRepository.delete(CRUD_META_GRID_DATA_ID_1);
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_GRID_DATA_2, CRUD_META_GRID_DATA_3,
                CRUD_META_GRID_DATA_4, CRUD_META_GRID_DATA_5, CRUD_META_GRID_DATA_6, CRUD_META_GRID_DATA_7, CRUD_META_GRID_DATA_8,
                CRUD_META_GRID_DATA_9, CRUD_META_GRID_DATA_10, CRUD_META_GRID_DATA_11, CRUD_META_GRID_DATA_12, CRUD_META_GRID_DATA_13,
                CRUD_META_GRID_DATA_14, CRUD_META_GRID_DATA_15, CRUD_META_GRID_DATA_16, CRUD_META_GRID_DATA_17, CRUD_META_GRID_DATA_18,
                CRUD_META_GRID_DATA_19, CRUD_META_GRID_DATA_20, CRUD_META_GRID_DATA_21, CRUD_META_GRID_DATA_22, CRUD_META_GRID_DATA_23,
                CRUD_META_GRID_DATA_24, CRUD_META_GRID_DATA_25, CRUD_META_GRID_DATA_26, CRUD_META_GRID_DATA_27, CRUD_META_GRID_DATA_28,
                CRUD_META_GRID_DATA_29, CRUD_META_GRID_DATA_30, CRUD_META_GRID_DATA_31), crudMetaGridDataRepository.findAll());
    }

    @Test
    public void testSaveCrudMetaGridData() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"defaultProperty", true, true,
                "newDecorator", 10.0, 50.0);
        newCrudMetaGridData.setCrudClassMetaData(CRUD_CLASS_META_DATA_1);
        CrudMetaGridData created = crudMetaGridDataRepository.save(newCrudMetaGridData);
        newCrudMetaGridData.setId(created.getId());
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertEquals(newCrudMetaGridData, crudMetaGridDataRepository.findOne(newCrudMetaGridData.getId()));
    }

    @Test
    public void testGetSingleCrudMetaGridData() throws Exception {
        CrudMetaGridData crudMetaGridData = crudMetaGridDataRepository.findOne(CRUD_META_GRID_DATA_ID_1);
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertEquals(CRUD_META_GRID_DATA_1,crudMetaGridData);
    }

    @Test
    public void testGetAllCrudMetaGridData() throws Exception {
        Collection<CrudMetaGridData> crudMetaGridData = crudMetaGridDataRepository.findAll();
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_META_GRID_DATA_1, CRUD_META_GRID_DATA_2, CRUD_META_GRID_DATA_3,
                CRUD_META_GRID_DATA_4, CRUD_META_GRID_DATA_5, CRUD_META_GRID_DATA_6, CRUD_META_GRID_DATA_7, CRUD_META_GRID_DATA_8,
                CRUD_META_GRID_DATA_9, CRUD_META_GRID_DATA_10, CRUD_META_GRID_DATA_11, CRUD_META_GRID_DATA_12, CRUD_META_GRID_DATA_13,
                CRUD_META_GRID_DATA_14, CRUD_META_GRID_DATA_15, CRUD_META_GRID_DATA_16, CRUD_META_GRID_DATA_17, CRUD_META_GRID_DATA_18,
                CRUD_META_GRID_DATA_19, CRUD_META_GRID_DATA_20, CRUD_META_GRID_DATA_21, CRUD_META_GRID_DATA_22, CRUD_META_GRID_DATA_23,
                CRUD_META_GRID_DATA_24, CRUD_META_GRID_DATA_25, CRUD_META_GRID_DATA_26, CRUD_META_GRID_DATA_27, CRUD_META_GRID_DATA_28,
                CRUD_META_GRID_DATA_29, CRUD_META_GRID_DATA_30, CRUD_META_GRID_DATA_31), crudMetaGridData);
    }

    @Test
    public void testUpdateCrudMetaGridData() throws Exception{
        CrudMetaGridData updated = new CrudMetaGridData(CRUD_META_GRID_DATA_1);
        updated.setDecorator("newDecorator");
        updated.setEditable(false);
        updated.setOrder(20.0);
        updated.setProperty("newProperty");
        updated.setVisible(false);
        updated.setColumnWidth(30.0);
        crudMetaGridDataRepository.save(updated);
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertEquals(updated, crudMetaGridDataRepository.findOne(CRUD_META_GRID_DATA_ID_1));
    }

    @Test
    public void testAddAndRemoveBindingParameter() throws Exception {
        CrudMetaGridData crudMetaGridData = crudMetaGridDataRepository.findOne(CRUD_META_GRID_DATA_ID_1);
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findOne(META_DATA_PROPERTY_BINDING_PARAMETER_ID_1);
        crudMetaGridData.addBindingParameter(metaDataPropertyBindingParameter);
        crudMetaGridDataRepository.save(crudMetaGridData);
        CRUD_META_GRID_DATA_1.setBindingParameters(Collections.singleton(metaDataPropertyBindingParameter));
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertEquals(CRUD_META_GRID_DATA_1, crudMetaGridData);
        CRUD_META_GRID_DATA_1.setBindingParameters(Collections.emptySet());
        crudMetaGridData.removeBindingParameter(metaDataPropertyBindingParameter);
        CRUD_META_GRID_DATA_MODEL_MATCHER.assertEquals(CRUD_META_GRID_DATA_1, crudMetaGridData);
    }
}
