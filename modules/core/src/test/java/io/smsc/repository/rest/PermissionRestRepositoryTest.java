package io.smsc.repository.rest;

import io.smsc.model.Permission;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Test;

import static io.smsc.PermissionTestData.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PermissionRestRepositoryTest extends AbstractRepositoryTest {

    @Test
    public void testGetSinglePermission() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions/5"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(PERMISSION_READ_USER.getName())));
    }

    @Test
    public void testPermissionNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/permissions/99")
                .content(json(new Permission()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllPermissions() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.permissions", hasSize(6)));
//                .andExpect(jsonPath("$._embedded.permissions[0].name", is(PERMISSION_READ_USER.getName())))
//                .andExpect(jsonPath("$._embedded.permissions[1].name", is(PERMISSION_UPDATE_USER.getName())))
//                .andExpect(jsonPath("$._embedded.permissions[2].name", is(PERMISSION_CREATE_USER.getName())))
//                .andExpect(jsonPath("$._embedded.permissions[3].name", is(PERMISSION_DELETE_USER.getName())))
//                .andExpect(jsonPath("$._embedded.permissions[4].name", is(PERMISSION_READ_OWN_USER.getName())))
//                .andExpect(jsonPath("$._embedded.permissions[5].name", is(PERMISSION_UPDATE_OWN_USER.getName())));
    }

    @Test
    public void testCreatePermission() throws Exception {
        String permissionJson = json(new Permission(null,"UNLIMITED"));
        mockMvc.perform(post("/rest/repository/permissions")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeletePermission() throws Exception {
        mockMvc.perform(delete("/rest/repository/permissions/5"))
                .andDo(print());
        mockMvc.perform(post("/rest/repository/permissions/5"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdatePermission() throws Exception {
        Permission updated = new Permission(PERMISSION_READ_USER);
        updated.setName("WITHOUT_ACCESS");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/permissions/5")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/permissions/5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name",is(updated.getName())));
    }
}