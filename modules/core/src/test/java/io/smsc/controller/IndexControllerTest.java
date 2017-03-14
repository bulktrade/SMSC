package io.smsc.controller;

import io.smsc.AbstractTest;
import io.smsc.service.StaticResourceService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Calendar;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.assertj.core.api.Assertions.assertThat;

public class IndexControllerTest extends AbstractTest {

    @MockBean
    private StaticResourceService staticResourceService;

    private Long lastModified;
    private static final String MOCK_CONTENT = "{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}";

    @Before
    public void setUp() {
        lastModified = Calendar.getInstance().getTimeInMillis();
    }

    @Test
    public void testIndexActionWithUnmodifiedData() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/")
                .header("If-Unmodified-Since", lastModified - 100000L))
                .andReturn();

        assertThat(result.getResponse().getContentAsString()).isEqualTo("");
    }

    @Test
    public void testIndexActionWithModifiedData() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/")
                .header("If-Unmodified-Since", lastModified + 100000L))
                .andReturn();

        assertThat(result.getResponse().getContentAsString()).isEqualTo("SMSC");
        assertThat(result.getResponse().getContentType()).isEqualTo("text/plain");
        assertThat(result.getResponse().getCharacterEncoding()).isEqualTo("UTF-8");
    }

    @Test
    public void testAdminActionWithoutFilePathAndResource() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("not-exists.html"));

        MvcResult result = mockMvc
                .perform(get("/admin"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(404);
    }

    @Test
    public void testAdminActionWithoutFilePathWithMockedResourceNotModified() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));

        MvcResult result = mockMvc
                .perform(get("/admin")
                .header("If-Unmodified-Since", lastModified - 100000L))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(412);
    }

    @Test
    public void testAdminActionWithoutFilePathWithMockedResourceModified() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));

        MvcResult result = mockMvc
                .perform(get("/admin"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).contains("SMSC");
    }

    @Test
    public void testAdminActionWithFilePathAndMockedResourceModified() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));

        MvcResult result = mockMvc
                .perform(get("/admin/index.html"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).contains("SMSC");
    }

    @Test
    public void testAdminActionWithFilePathAndMockedResourceNotModified() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));

        MvcResult result = mockMvc
                .perform(get("/admin/index.html")
                .header("If-Unmodified-Since", lastModified - 100000L))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(412);
    }

    @Test
    public void testConfigActionWithoutResourceAndProperties() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn("");

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":null,\"i18nPath\":null,\"debug\":null}");
    }

    @Test
    public void testConfigActionWithMockedResourceWithoutProperties() throws Exception {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn(MOCK_CONTENT);

        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}");
    }


}
