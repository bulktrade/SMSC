package io.smsc.repository.user;

import io.smsc.model.User;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.UserTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class UserRestTest extends AbstractTest {

    @Test
    public void testGetSingleUser() throws Exception {
        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username", is(USER.getUsername())))
//                .andExpect(jsonPath("$.password", is(USER.getPassword())))
                .andExpect(jsonPath("$.firstname", is(USER.getFirstname())))
                .andExpect(jsonPath("$.surname", is(USER.getSurname())))
                .andExpect(jsonPath("$.email", is(USER.getEmail())))
                .andExpect(jsonPath("$.active", is(USER.isActive())))
//                .andExpect(jsonPath("$.created", is(USER.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$.blocked", is(USER.isBlocked())));
    }

    @Test
    public void testUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/users/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.users", hasSize(2)))
                .andExpect(jsonPath("$._embedded.users[0].username", is(USER.getUsername())))
//                .andExpect(jsonPath("$._embedded.users[0].password", is(USER.getPassword())))
                .andExpect(jsonPath("$._embedded.users[0].firstname", is(USER.getFirstname())))
                .andExpect(jsonPath("$._embedded.users[0].surname", is(USER.getSurname())))
                .andExpect(jsonPath("$._embedded.users[0].email", is(USER.getEmail())))
                .andExpect(jsonPath("$._embedded.users[0].active", is(USER.isActive())))
//                .andExpect(jsonPath("$._embedded.users[0].created", is(USER.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$._embedded.users[0].blocked", is(USER.isBlocked())))
                .andExpect(jsonPath("$._embedded.users[1].username", is(ADMIN.getUsername())))
//                .andExpect(jsonPath("$._embedded.users[1].password", is(ADMIN.getPassword())))
                .andExpect(jsonPath("$._embedded.users[1].firstname", is(ADMIN.getFirstname())))
                .andExpect(jsonPath("$._embedded.users[1].surname", is(ADMIN.getSurname())))
                .andExpect(jsonPath("$._embedded.users[1].email", is(ADMIN.getEmail())))
                .andExpect(jsonPath("$._embedded.users[1].active", is(ADMIN.isActive())))
//                .andExpect(jsonPath("$._embedded.users[1].created", is(ADMIN.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$._embedded.users[1].blocked", is(ADMIN.isBlocked())));
    }

    @Test
    public void testCreateUser() throws Exception {
        String userJson = json(new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false));
        this.mockMvc.perform(post("/rest/repository/users")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/1"));
        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateUser() throws Exception {
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        String userJson = json(updated);
        mockMvc.perform(put("/rest/repository/users/1")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.username",is(updated.getUsername())))
                .andExpect(jsonPath("$.password",is(updated.getPassword())))
                .andExpect(jsonPath("$.firstname",is(updated.getFirstname())))
                .andExpect(jsonPath("$.surname",is(updated.getSurname())))
                .andExpect(jsonPath("$.email",is(updated.getEmail())))
                .andExpect(jsonPath("$.active",is(updated.isActive())))
//                .andExpect(jsonPath("$.created",is(updated.getCreated())))
                .andExpect(jsonPath("$.blocked",is(updated.isBlocked())));
    }
}
