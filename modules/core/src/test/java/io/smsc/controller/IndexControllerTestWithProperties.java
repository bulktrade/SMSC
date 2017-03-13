package io.smsc.controller;

import org.junit.Test;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@TestPropertySource("classpath:index_controller.properties")
public class IndexControllerTestWithProperties extends IndexControllerAbstractTest {

    @Test
    public void testConfigActionWithMockedResourceAndProperties() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/admin/config.json"))
                .andReturn();
        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        assertThat(result.getResponse().getContentAsString()).isEqualTo("{\"apiUrl\":\"/admin\",\"i18nPath\":\"/admin/i18n\",\"debug\":true}");
    }

}
