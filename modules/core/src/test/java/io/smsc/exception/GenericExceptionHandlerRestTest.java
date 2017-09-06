package io.smsc.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.smsc.AbstractSpringMVCTest;

import io.smsc.dto.Message;
import io.smsc.dto.MessageType;
import io.smsc.model.admin.Role;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Salutation;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.assertj.core.api.Assertions.assertThat;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class GenericExceptionHandlerRestTest extends AbstractSpringMVCTest {

    private ObjectMapper mapper;

    @Before
    public void setUp() throws Exception {
        this.mapper = new ObjectMapper();
    }

    @Test
    public void testInitRepositoryConstraintViolationException() throws Exception {
        MvcResult result = mockMvc.perform(post("/rest/repository/roles")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(json(new Role())))
                .andExpect(status().isConflict())
                .andReturn();

        this.compareMessages(result, "name", "Role name cannot be empty", MessageType.ERROR);

    }

    @Test
    public void testInitDataIntegrityViolationException() throws Exception {
        User user = new User();
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("user@gmail.com");
        user.setActive(true);
        user.setBlocked(false);
        user.setSalutation(Salutation.MR);
        String userJson = json(user);
        // json is ignoring password
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n }");

        MvcResult result = this.mockMvc.perform(post("/rest/repository/users")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isConflict())
                .andReturn();

        this.compareMessages(result, null,
                "integrity constraint violation: unique constraint or index violation; UK_32EHDHSRKQTJKSV0X1X9SV5PK table: USER_ACCOUNT",
                MessageType.ERROR);
    }

    private void compareMessages(MvcResult result, String field, String message, MessageType type) throws Exception {
        Message expectedMessage = new Message();
        expectedMessage.setField(field);
        expectedMessage.setMessage(message);
        expectedMessage.setType(type);
        Message returnedMessage = mapper.readValue(result.getResponse().getContentAsString().replaceAll("\\[", "").replaceAll("]", ""), Message.class);

        assertThat(returnedMessage.getField()).isEqualTo(expectedMessage.getField());
        assertThat(returnedMessage.getType()).isEqualTo(expectedMessage.getType());
        assertThat(returnedMessage.getMessage()).isEqualTo(expectedMessage.getMessage());
    }
}
