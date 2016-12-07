package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.AbstractTest;
import io.smsc.repository.crud.crudClassMetaData.CrudClassMetaDataRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudClassMetaDataJPATest extends AbstractTest {

    @Autowired
    private CrudClassMetaDataRepository crudClassMetaDataRepository;

    @Test
    public void testDeleteCrudClassMetaData() throws Exception {
        crudClassMetaDataRepository.delete(CRUD_CLASS_META_DATA_ID_1);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_CLASS_META_DATA_2,CRUD_CLASS_META_DATA_3,
                CRUD_CLASS_META_DATA_4), crudClassMetaDataRepository.findAllDistinctByOrderById());
    }

    @Test
    public void testSaveCrudClassMetaData() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(null,"CrudMetaDefaultData", "columnHeight", true, "new_query");
        CrudClassMetaData created = crudClassMetaDataRepository.save(newCrudClassMetaData);
        newCrudClassMetaData.setId(created.getId());
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertEquals(newCrudClassMetaData, crudClassMetaDataRepository.findOne(newCrudClassMetaData.getId()));
    }

    @Test
    public void testGetSingleCrudClassMetaData() throws Exception {
        CrudClassMetaData crudClassMetaData = crudClassMetaDataRepository.findOne(CRUD_CLASS_META_DATA_ID_1);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertEquals(CRUD_CLASS_META_DATA_1,crudClassMetaData);
    }

    @Test
    public void testGetAllCrudClassMetaDatas() throws Exception {
        Collection<CrudClassMetaData> crudClassMetaDatas = crudClassMetaDataRepository.findAllDistinctByOrderById();
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_CLASS_META_DATA_1, CRUD_CLASS_META_DATA_2,
                CRUD_CLASS_META_DATA_3, CRUD_CLASS_META_DATA_4), crudClassMetaDatas);
    }

    @Test
    public void testUpdateCrudClassMetaData() throws Exception{
        CrudClassMetaData updated = new CrudClassMetaData(CRUD_CLASS_META_DATA_1);
        updated.setClassName("newClassName");
        updated.setEditable(false);
        updated.setQuery("newQuery");
        crudClassMetaDataRepository.save(updated);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertEquals(updated, crudClassMetaDataRepository.findOne(CRUD_CLASS_META_DATA_ID_1));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateClassNameSave() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(CRUD_CLASS_META_DATA_1);
        newCrudClassMetaData.setId(null);
        crudClassMetaDataRepository.save(newCrudClassMetaData);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newCrudClassMetaData,CRUD_CLASS_META_DATA_1,
                CRUD_CLASS_META_DATA_2, CRUD_CLASS_META_DATA_3, CRUD_CLASS_META_DATA_4), crudClassMetaDataRepository.findAllDistinctByOrderById());
    }
}
