package io.smsc.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.smsc.AbstractSpringMVCTest;
import io.smsc.config.AppConfiguration;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ContextConfiguration(classes = AppConfiguration.class)
@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class SpringSecurityAuditorAwareRestTest extends AbstractSpringMVCTest {

    private String adminToken;

    private Authority authority;

    private ObjectMapper mapper;

    @Before
    public void setUp() throws Exception {
        this.mapper = new ObjectMapper();

        authority = new Authority();
        authority.setName("NEW_AUTHORITY");

        UserDetails admin = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("admin"));
        adminToken = jwtTokenGenerationService.generateAccessToken(admin);
    }

    @Test
    public void auditEntityCreation() throws Exception {

        MvcResult result = mockMvc.perform(post("/rest/repository/authorities")
                .with(csrf())
                .header(tokenHeader, adminToken)
                .content(json(authority)))
                .andExpect(status().isCreated())
                .andReturn();

        Authority returnedAuthority = mapper.readValue(result.getResponse().getContentAsString(), Authority.class);

        assertThat(returnedAuthority.getCreatedDate()).isNotNull();
        assertThat(returnedAuthority.getLastModifiedDate()).isNotNull();

        MvcResult createdResult = mockMvc.perform(get(String.format("/rest/repository/authorities/%d/createdBy", returnedAuthority.getId()))
                .header(tokenHeader, adminToken))
                .andReturn();

        MvcResult lastModifiedByResult = mockMvc.perform(get(String.format("/rest/repository/authorities/%d/lastModifiedBy", returnedAuthority.getId()))
                .header(tokenHeader, adminToken))
                .andReturn();

        User createdUser = mapper.readValue(createdResult.getResponse().getContentAsString(), User.class);
        User lastModifiedByUser = mapper.readValue(lastModifiedByResult.getResponse().getContentAsString(), User.class);

        assertThat(createdUser).isEqualTo(lastModifiedByUser);
    }
}
