package io.smsc.controller;

import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.web.servlet.MvcResult;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.assertj.core.api.Assertions.assertThat;

public class IndexControllerTest extends IndexControllerAbstractTest {

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
    public void testAdminActionWithoutResource() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/admin"))
                .andReturn();
        assertThat(result.getResponse().getStatus()).isEqualTo(404);
    }

    @Test
    public void testAdminActionWithMockedResource() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));
        MvcResult result = mockMvc
                .perform(get("/admin"))
                .andReturn();
        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).contains("SMSC");
    }

    @Test
    public void testAdminActionWithPresentFilePathAndMockedResource() throws Exception {
        given(this.staticResourceService.getResource("classpath:META-INF/resources/io.smsc.admin/index.html")).willReturn(new ClassPathResource("index.html"));
        MvcResult result = mockMvc
                .perform(get("/admin/index.html"))
                .andReturn();
        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).contains("SMSC");
    }

    @Test
    public void testConfigActionWithMockedResourceWithoutProperties() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();
        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}");
    }


}
