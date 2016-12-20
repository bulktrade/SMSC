package io.smsc.repository.crud.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.crud.CrudMetaGridData;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudMetaGridDataValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaGridDataPropertySave() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"", true,
                true, null, 10.0,50.0);
        crudMetaGridDataRepository.save(newCrudMetaGridData);
        crudMetaGridDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaGridDataEditableSave() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"defaultProperty", null,
                true, null, 10.0,50.0);
        crudMetaGridDataRepository.save(newCrudMetaGridData);
        crudMetaGridDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaGridDataVisibleSave() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"defaultProperty", true,
                null, null, 10.0,50.0);
        crudMetaGridDataRepository.save(newCrudMetaGridData);
        crudMetaGridDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaGridDataOrderSave() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"defaultProperty", true,
                true, null, null,50.0);
        crudMetaGridDataRepository.save(newCrudMetaGridData);
        crudMetaGridDataRepository.findAll();
    }
}
