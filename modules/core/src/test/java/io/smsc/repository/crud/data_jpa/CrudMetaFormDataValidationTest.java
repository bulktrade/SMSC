package io.smsc.repository.crud.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.crud.CrudMetaFormData;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudMetaFormDataValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaFormDataPropertySave() throws Exception {
        CrudMetaFormData newCrudMetaFormData = new CrudMetaFormData(null,"", true,
                true, null, 10.0,"newFieldLayoutGridPosition");
        crudMetaFormDataRepository.save(newCrudMetaFormData);
        crudMetaFormDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaFormDataEditableSave() throws Exception {
        CrudMetaFormData newCrudMetaFormData = new CrudMetaFormData(null,"defaultProperty", null,
                true, null, 10.0,"newFieldLayoutGridPosition");
        crudMetaFormDataRepository.save(newCrudMetaFormData);
        crudMetaFormDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaFormDataVisibleSave() throws Exception {
        CrudMetaFormData newCrudMetaFormData = new CrudMetaFormData(null,"defaultProperty", true,
                null, null, 10.0,"newFieldLayoutGridPosition");
        crudMetaFormDataRepository.save(newCrudMetaFormData);
        crudMetaFormDataRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCrudMetaFormDataOrderSave() throws Exception {
        CrudMetaFormData newCrudMetaFormData = new CrudMetaFormData(null,"defaultProperty", true,
                true, null, null,"newFieldLayoutGridPosition");
        crudMetaFormDataRepository.save(newCrudMetaFormData);
        crudMetaFormDataRepository.findAll();
    }
}
