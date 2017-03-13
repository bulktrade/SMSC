package io.smsc.controller;

import io.smsc.AbstractTest;
import io.smsc.service.StaticResourceService;
import org.junit.Before;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Calendar;

import static org.mockito.BDDMockito.given;

public abstract class IndexControllerAbstractTest extends AbstractTest {

    @MockBean
    protected StaticResourceService staticResourceService;

    Long lastModified;
    private static final String MOCK_CONTENT = "{\"apiUrl\":\"/rest\",\"i18nPath\":\"assets/i18n\",\"debug\":false}";

    @Before
    public void setUp() {
        given(this.staticResourceService.getContent("classpath:META-INF/resources/io.smsc.admin/config.json")).willReturn(MOCK_CONTENT);
        lastModified = Calendar.getInstance().getTimeInMillis();
    }
}
