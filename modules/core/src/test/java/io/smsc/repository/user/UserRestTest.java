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
        mockMvc.perform(get("/rest/repository/users/search/findOne?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.userName", is(USER.getUserName())))
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
        mockMvc.perform(post("/rest/repository/users/search/findOne?id=999")
                .content(this.json(new User()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.users", hasSize(2)))
                .andExpect(jsonPath("$._embedded.users[0].userName", is(USER.getUserName())))
//                .andExpect(jsonPath("$._embedded.users[0].password", is(USER.getPassword())))
                .andExpect(jsonPath("$._embedded.users[0].firstName", is(USER.getFirstName())))
                .andExpect(jsonPath("$._embedded.users[0].email", is(USER.getEmail())))
                .andExpect(jsonPath("$._embedded.users[0].active", is(USER.isActive())))
//                .andExpect(jsonPath("$._embedded.users[0].created", is(USER.getCreated().toString().substring(0,19))))
                .andExpect(jsonPath("$._embedded.users[0].blocked", is(USER.isBlocked())))
                .andExpect(jsonPath("$._embedded.users[1].userName", is(ADMIN.getUserName())))
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
        String userJson = json(new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false));
        this.mockMvc.perform(post("/rest/repository/users")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/delete?id=1"));
        mockMvc.perform(post("/rest/repository/users/search/findOne?id=1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateUser() throws Exception {
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        String userJson = json(updated);
        mockMvc.perform(put("/rest/repository/users/save")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/users/search/findOne?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.userName",is(updated.getUserName())))
                .andExpect(jsonPath("$.password",is(updated.getPassword())))
                .andExpect(jsonPath("$.firstName",is(updated.getFirstName())))
                .andExpect(jsonPath("$.surName",is(updated.getSurName())))
                .andExpect(jsonPath("$.email",is(updated.getEmail())))
                .andExpect(jsonPath("$.active",is(updated.isActive())))
//                .andExpect(jsonPath("$.created",is(updated.getCreated())))
                .andExpect(jsonPath("$.blocked",is(updated.isBlocked())));
    }
}
