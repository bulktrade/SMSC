package io.smsc.repository.permission;

import io.smsc.model.Permission;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static io.smsc.test_data.PermissionTestData.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class PermissionRestTest extends AbstractTest {

    @Test
    public void testGetSinglePermission() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions/1"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(PERMISSION_USER_READ.getName())));
    }

    @Test
    public void testPermissionNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllPermissions() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                // paginating is showing 20 items by default
                .andExpect(jsonPath("$._embedded.permissions", hasSize(20)))
                .andExpect(jsonPath("$._embedded.permissions[0].name", is(PERMISSION_USER_READ.getName())))
                .andExpect(jsonPath("$._embedded.permissions[19].name", is(PERMISSION_CRUD_META_FORM_DATA_UPDATE.getName())));
    }

    @Test
    public void testCreatePermission() throws Exception {
        String permissionJson = json(new Permission(null,"UNLIMITED"));
        mockMvc.perform(post("/rest/repository/permissions")
                .contentType("application/json;charset=UTF-8")
                .content(permissionJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeletePermission() throws Exception {
        mockMvc.perform(delete("/rest/repository/permissions/1"));
        mockMvc.perform(get("/rest/repository/permissions/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdatePermission() throws Exception {
        Permission updated = new Permission(PERMISSION_USER_READ);
        updated.setName("WITHOUT_ACCESS");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/permissions/1")
                .contentType("application/json;charset=UTF-8")
                .content(permissionJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/permissions/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(updated.getName())));
    }
}