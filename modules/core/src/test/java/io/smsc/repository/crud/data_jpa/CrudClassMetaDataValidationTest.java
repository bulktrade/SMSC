package io.smsc.repository.crud.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.crud.CrudClassMetaData;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudClassMetaDataValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudClassMetaDataClassNameSave() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(null,"",
                "columnHeight", true, null);
        crudClassMetaDataRepository.save(newCrudClassMetaData);
        crudClassMetaDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudClassMetaDataTitleColumnSave() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(null,"CrudMetaDefaultData",
                "", true, null);
        crudClassMetaDataRepository.save(newCrudClassMetaData);
        crudClassMetaDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudClassMetaDataEditableSave() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(null,"CrudMetaDefaultData",
                "columnHeight", null, null);
        crudClassMetaDataRepository.save(newCrudClassMetaData);
        crudClassMetaDataRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateClassNameSave() throws Exception {
        CrudClassMetaData newCrudClassMetaData = new CrudClassMetaData(CRUD_CLASS_META_DATA_1);
        newCrudClassMetaData.setId(null);
        crudClassMetaDataRepository.save(newCrudClassMetaData);
        CRUD_CLASS_META_DATA_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newCrudClassMetaData, CRUD_CLASS_META_DATA_1,
                CRUD_CLASS_META_DATA_2, CRUD_CLASS_META_DATA_3, CRUD_CLASS_META_DATA_4), crudClassMetaDataRepository.findAll());
    }
}
