package io.smsc.repository.admin;

import io.smsc.AbstractTest;
import io.smsc.model.admin.Group;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "admin", authorities = {"USER_2"})
public class GroupRestTest extends AbstractTest {

    @Test
    public void testGetSingleGroup() throws Exception {
        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groupName", is("GROUP_USER")));
    }

    @Test
    public void testGroupNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/groups/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllGroups() throws Exception {
        mockMvc.perform(get("/rest/repository/groups"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.groups", hasSize(2)))
                .andExpect(jsonPath("$._embedded.groups[0].groupName", is("GROUP_USER")))
                .andExpect(jsonPath("$._embedded.groups[1].groupName", is("GROUP_ADMIN")));

    }

    @Test
    public void testCreateGroup() throws Exception {
        Group group = new Group();
        group.setGroupName("GROUP_ALL_RIGHTS");
        this.mockMvc.perform(post("/rest/repository/groups")
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/groups/1"));
        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateUser() throws Exception {
        Group group = new Group();
        group.setId(2L);
        group.setGroupName("GROUP_ALL_RIGHTS");
        mockMvc.perform(put("/rest/repository/groups/2")
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/groups/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groupName", is("GROUP_ALL_RIGHTS")));
    }
}
