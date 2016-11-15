package io.smsc.repository.rest;

import io.smsc.model.Permission;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.permission.PermissionRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PermissionRepositoryRestTest extends AbstractRepositoryTest {

    @Autowired
    private PermissionRepository permissionRepository;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    private MediaType contentType = MediaType.valueOf("application/hal+json;charset=UTF-8");

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {
        this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Test
    public void getSinglePermission() throws Exception {
        mockMvc.perform(get("/rest/repository/permissions/5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(permissionRepository.getOne(5L).getName())));
    }

    @Test
    public void permissionNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/permissions/99")
                .content(this.json(new Permission()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllPermissions() throws Exception {
        List<Permission> permissions = permissionRepository.findAll();
        mockMvc.perform(get("/rest/repository/permissions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.permissions", hasSize(6)))
                .andExpect(jsonPath("$._embedded.permissions[0].name", is(permissions.get(0).getName())))
                .andExpect(jsonPath("$._embedded.permissions[1].name", is(permissions.get(1).getName())))
                .andExpect(jsonPath("$._embedded.permissions[2].name", is(permissions.get(2).getName())))
                .andExpect(jsonPath("$._embedded.permissions[3].name", is(permissions.get(3).getName())))
                .andExpect(jsonPath("$._embedded.permissions[4].name", is(permissions.get(4).getName())))
                .andExpect(jsonPath("$._embedded.permissions[5].name", is(permissions.get(5).getName())));
    }

    @Test
    public void createPermission() throws Exception {
        String permissionJson = json(new Permission(null,"PERMISSION_UNLIMITED"));
        this.mockMvc.perform(post("/rest/repository/permissions")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isCreated());
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}