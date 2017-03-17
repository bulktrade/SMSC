package io.smsc.controller;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.service.StaticResourceService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.mock.env.MockEnvironment;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@ContextConfiguration(initializers = IndexControllerConfigActionWithEnvironmentVariablesTest.MockPropertyInitializer.class)
public class IndexControllerConfigActionWithEnvironmentVariablesTest extends AbstractSpringMVCTest {

    @MockBean
    private StaticResourceService staticResourceService;

    @Autowired
    ApplicationContext context;

    private static final String MOCK_CONTENT = "{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}";

    @Test
    public void testConfigActionWithMockedResourceAndEnvironmentVariables() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn(MOCK_CONTENT);

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/admin\",\"i18nPath\":\"/admin/i18n\",\"debug\":true}");
    }

    @Test
    public void testConfigActionWithoutResourceWithEnvironmentVariables() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn("");

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/admin\",\"i18nPath\":\"/admin/i18n\",\"debug\":true}");
    }

    public static class MockPropertyInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        @Override
        public void initialize(ConfigurableApplicationContext applicationContext) {
            MockEnvironment environment = new MockEnvironment();
            environment.setProperty("admin.api.url", "/admin");
            environment.setProperty("admin.i18n.path", "/admin/i18n");
            environment.setProperty("admin.debug", "true");
            applicationContext.setEnvironment(environment);
        }
    }
}
