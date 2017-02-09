package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class RoleRestTest extends AbstractTest {

    @Test
    public void testGetSingleRole() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_USER")));
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
                .andExpect(jsonPath("$._embedded.roles", hasSize(2)))
                .andExpect(jsonPath("$._embedded.roles[0].name", is("ROLE_USER")))
                .andExpect(jsonPath("$._embedded.roles[1].name", is("ROLE_ADMIN")));
    }

    @Test
    public void testCreateRole() throws Exception {
        Role role = new Role();
        role.setName("ROLE_GOD");
        String roleJson = json(role);
        this.mockMvc.perform(post("/rest/repository/roles")
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteRole() throws Exception {
        mockMvc.perform(delete("/rest/repository/roles/1"))
                .andDo(print());
        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateRole() throws Exception {
        Role role = new Role();
        role.setId(1L);
        role.setName("ROLE_GOD");
        String roleJson = json(role);
        mockMvc.perform(put("/rest/repository/roles/1")
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_GOD")));
    }
}
