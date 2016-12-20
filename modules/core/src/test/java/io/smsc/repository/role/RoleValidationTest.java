package io.smsc.repository.role;

import io.smsc.AbstractTest;
import io.smsc.model.Role;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.RoleTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class RoleValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testInvalidRoleNameSave() throws Exception {
        Role newRole = new Role(null,"wrong_name_role");
        roleRepository.save(newRole);
        roleRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyRoleNameSave() throws Exception {
        Role newRole = new Role(null,"");
        roleRepository.save(newRole);
        roleRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateRoleNameSave() throws Exception {
        Role newRole = new Role(ROLE_USER);
        newRole.setId(null);
        roleRepository.save(newRole);
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }
}
