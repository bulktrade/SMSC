package io.smsc.controller;

import io.smsc.AbstractTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Calendar;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.assertj.core.api.Assertions.assertThat;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class IndexControllerTest extends AbstractTest {

    private Long LAST_MODIFIED;

    @Before
    public void setLastModified() {
        LAST_MODIFIED = Calendar.getInstance().getTimeInMillis();
    }

    @Test
    public void testIndexActionWithUnmodifiedData() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/")
                .header("If-Unmodified-Since", LAST_MODIFIED - 100000L))
                .andReturn();
        assertThat(result.getResponse().getContentAsString()).isEqualTo("");
    }

    @Test
    public void testIndexActionWithModifiedData() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/")
                .header("If-Unmodified-Since", LAST_MODIFIED + 100000L))
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
        assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

//    @Test
//    public void testAdminActionWithUnmodifiedResource() throws Exception {
//        MvcResult result = mockMvc
//                .perform(get("/admin/index.html")
//                .header("If-Unmodified-Since", LAST_MODIFIED - 10000L))
//                .andReturn();
//        assertThat(result.getResponse().getContentAsString()).isEqualTo(null);
//    }

//    @Test
//    public void testAdminActionWithModifiedResource() throws Exception {
//        MvcResult result = mockMvc
//                .perform(get("/admin")
//                        .requestAttr("org.springframework.web.servlet.HandlerMapping.pathWithinHandlerMapping", "classpath:META-INF/resources/io.smsc.admin/index.html")
//                        .header("If-Unmodified-Since", LAST_MODIFIED + 10000L))
//                .andReturn();
//        assertThat(result.getResponse().getContentAsString()).isEqualTo("SMSC");
//    }

//    @Test
//    public void testAdminActionWithFilePathPresent() throws Exception {
//        File file = new File("classpath:META-INF/resources/io.smsc.admin/index.html");
//        FileWriter fw = new FileWriter(file.getAbsoluteFile());
//        BufferedWriter bw = new BufferedWriter(fw);
//        bw.write("SMSC");
//        bw.close();
//        MvcResult result = mockMvc
//                .perform(get("/admin"))
//                .andReturn();
//        assertThat(result.getResponse().getContentAsString()).isEqualTo("SMSC");
//    }

//    @Test
//    public void testConfigActionWithoutResource() throws Exception {
//        MvcResult result = mockMvc
//                .perform(get("/admin/config.json"))
//                .andReturn();
//        assertThat(result.getResponse().getStatus()).isEqualTo(200);
//        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}");
//    }
}
