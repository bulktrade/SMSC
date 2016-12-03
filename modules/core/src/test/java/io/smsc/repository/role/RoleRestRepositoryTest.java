package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Test;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.RoleTestData.*;

public class RoleRestRepositoryTest extends AbstractRepositoryTest {

    @Test
    public void testGetSingleRole() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/3"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(ROLE_USER.getName())));
    }

    @Test
    public void testRoleNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/roles/99")
                .content(json(new Role()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllRoles() throws Exception {
        mockMvc.perform(get("/rest/repository/roles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.roles", hasSize(2)));
//                .andExpect(jsonPath("$._embedded.roles[0].name", is(ROLE_USER.getName())))
//                .andExpect(jsonPath("$._embedded.roles[1].name", is(ROLE_ADMIN.getName())));
    }

    @Test
    public void testCreateRole() throws Exception {
        String roleJson = json(new Role(null,"GOD"));
        this.mockMvc.perform(post("/rest/repository/roles")
                .contentType(contentType)
                .content(roleJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteRole() throws Exception {
        mockMvc.perform(delete("/rest/repository/roles/3"))
                .andDo(print());
        mockMvc.perform(post("/rest/repository/roles/3"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateRole() throws Exception {
        Role updated = new Role(ROLE_USER);
        updated.setName("GUEST");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/roles/3")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/roles/3"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name",is(updated.getName())));
    }
}
