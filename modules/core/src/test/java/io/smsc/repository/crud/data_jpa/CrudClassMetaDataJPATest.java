package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudClassMetaDataJPATest extends AbstractTest {

    @Test
    public void testDeleteCrudClassMetaData() throws Exception {
        crudClassMetaDataRepository.delete(CRUD_CLASS_META_DATA_ID_1);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_CLASS_META_DATA_2, CRUD_CLASS_META_DATA_3,
                CRUD_CLASS_META_DATA_4, CRUD_CLASS_META_DATA_5, CRUD_CLASS_META_DATA_6, CRUD_CLASS_META_DATA_7,
                CRUD_CLASS_META_DATA_8, CRUD_CLASS_META_DATA_9, CRUD_CLASS_META_DATA_10, CRUD_CLASS_META_DATA_11, CRUD_CLASS_META_DATA_12),
                crudClassMetaDataRepository.findAll());
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
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertEquals(CRUD_CLASS_META_DATA_1, crudClassMetaData);
    }

    @Test
    public void testGetAllCrudClassMetaData() throws Exception {
        Collection<CrudClassMetaData> crudClassMetaData = crudClassMetaDataRepository.findAll();
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_CLASS_META_DATA_1, CRUD_CLASS_META_DATA_2, CRUD_CLASS_META_DATA_3,
                CRUD_CLASS_META_DATA_4, CRUD_CLASS_META_DATA_5, CRUD_CLASS_META_DATA_6, CRUD_CLASS_META_DATA_7,
                CRUD_CLASS_META_DATA_8, CRUD_CLASS_META_DATA_9, CRUD_CLASS_META_DATA_10, CRUD_CLASS_META_DATA_11,
                CRUD_CLASS_META_DATA_12), crudClassMetaData);
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
}
