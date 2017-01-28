package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.RoleTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class RoleRestTest extends AbstractTest {

    @Test
    public void testGetSingleRole() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/51"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(ROLE_USER.getName())));
    }

    @Test
    public void testRoleNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllRoles() throws Exception {
        mockMvc.perform(get("/rest/repository/roles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.roles", hasSize(2)));
    }

    @Test
    public void testCreateRole() throws Exception {
        String roleJson = json(new Role(null,"GOD"));
        this.mockMvc.perform(post("/rest/repository/roles")
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteRole() throws Exception {
        mockMvc.perform(delete("/rest/repository/roles/51"))
                .andDo(print());
        mockMvc.perform(get("/rest/repository/roles/51"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateRole() throws Exception {
        Role updated = new Role(ROLE_USER);
        updated.setName("GUEST");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/roles/51")
                .contentType("application/json;charset=UTF-8")
                .content(permissionJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/roles/51"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(updated.getName())));
    }
}
