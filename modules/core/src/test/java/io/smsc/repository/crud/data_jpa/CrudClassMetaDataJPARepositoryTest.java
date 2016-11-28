package io.smsc.repository.crud.data_jpa;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.crud.CrudClassMetaDataRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

public class CrudClassMetaDataJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private CrudClassMetaDataRepository crudClassMetaDataRepository;

    @Test
    public void testDeleteCrudClassMetaData() throws Exception {
        crudClassMetaDataRepository.deleteById(CRUD_CLASS_META_DATA_ID_1);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(CRUD_CLASS_META_DATA_2,CRUD_CLASS_META_DATA_3,
                CRUD_CLASS_META_DATA_4), crudClassMetaDataRepository.findAll());
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
        Collection<CrudClassMetaData> crudClassMetaDatas = crudClassMetaDataRepository.findAll();
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
                CRUD_CLASS_META_DATA_2, CRUD_CLASS_META_DATA_3, CRUD_CLASS_META_DATA_4), crudClassMetaDataRepository.findAll());
    }
}
