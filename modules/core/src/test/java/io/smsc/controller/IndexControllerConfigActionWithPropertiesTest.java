package io.smsc.controller;

import io.smsc.AbstractTest;
import io.smsc.service.StaticResourceService;
import org.junit.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@TestPropertySource("classpath:index_controller.properties")
public class IndexControllerConfigActionWithPropertiesTest extends AbstractTest {

    @MockBean
    private StaticResourceService staticResourceService;

    private static final String MOCK_CONTENT = "{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}";

    @Test
    public void testConfigActionWithMockedResourceAndProperties() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn(MOCK_CONTENT);

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/admin\",\"i18nPath\":\"/admin/i18n\",\"debug\":true}");
    }

    @Test
    public void testConfigActionWithoutResourceWithProperties() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn("");

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/admin\",\"i18nPath\":\"/admin/i18n\",\"debug\":true}");
    }
}
