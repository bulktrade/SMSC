package io.smsc.repository.rest;

import io.smsc.model.User;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Test;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.UserTestData.*;

public class UserRestRepositoryTest extends AbstractRepositoryTest {

    @Test
    public void testGetSingleUser() throws Exception {
        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username", is(USER.getUsername())))
//                .andExpect(jsonPath("$.password", is(USER.getPassword())))
                .andExpect(jsonPath("$.firstName", is(USER.getFirstName())))
                .andExpect(jsonPath("$.surName", is(USER.getSurName())))
                .andExpect(jsonPath("$.email", is(USER.getEmail())))
                .andExpect(jsonPath("$.active", is(USER.isActive())))
//                .andExpect(jsonPath("$.created", is(USER.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$.blocked", is(USER.isBlocked())));
    }

    @Test
    public void testUserNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/users/99")
                .content(this.json(new User()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/rest/repository/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.users", hasSize(2)))
                .andExpect(jsonPath("$._embedded.users[0].username", is(USER.getUsername())))
//                .andExpect(jsonPath("$._embedded.users[0].password", is(USER.getPassword())))
                .andExpect(jsonPath("$._embedded.users[0].firstName", is(USER.getFirstName())))
                .andExpect(jsonPath("$._embedded.users[0].email", is(USER.getEmail())))
                .andExpect(jsonPath("$._embedded.users[0].active", is(USER.isActive())))
//                .andExpect(jsonPath("$._embedded.users[0].created", is(USER.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$._embedded.users[0].blocked", is(USER.isBlocked())))
                .andExpect(jsonPath("$._embedded.users[1].username", is(ADMIN.getUsername())))
//                .andExpect(jsonPath("$._embedded.users[1].password", is(ADMIN.getPassword())))
                .andExpect(jsonPath("$._embedded.users[1].firstName", is(ADMIN.getFirstName())))
                .andExpect(jsonPath("$._embedded.users[1].surName", is(ADMIN.getSurName())))
                .andExpect(jsonPath("$._embedded.users[1].email", is(ADMIN.getEmail())))
                .andExpect(jsonPath("$._embedded.users[1].active", is(ADMIN.isActive())))
//                .andExpect(jsonPath("$._embedded.users[1].created", is(ADMIN.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$._embedded.users[1].blocked", is(ADMIN.isBlocked())));
    }

    @Test
    public void testCreateUser() throws Exception {
        String roleJson = json(new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false));
        this.mockMvc.perform(post("/rest/repository/roles")
                .contentType(contentType)
                .content(roleJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/1"));
        mockMvc.perform(post("/rest/repository/users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdatePermission() throws Exception {
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/users/1")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username",is(updated.getUsername())))
                .andExpect(jsonPath("$.password",is(updated.getPassword())))
                .andExpect(jsonPath("$.firstName",is(updated.getFirstName())))
                .andExpect(jsonPath("$.surName",is(updated.getSurName())))
                .andExpect(jsonPath("$.email",is(updated.getEmail())))
                .andExpect(jsonPath("$.active",is(updated.isActive())))
//                .andExpect(jsonPath("$.created",is(updated.getCreated())))
                .andExpect(jsonPath("$.blocked",is(updated.isBlocked())));
    }
}
