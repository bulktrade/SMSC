package io.smsc.service;

import io.smsc.service.impl.StaticResourceServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.InputStream;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class StaticResourceServiceUnitTest {

    private static final String PATH = "index.html";

    private StaticResourceService resourceService;

    @Mock
    private ApplicationContext context;

    @Before
    public void setUp() {
        resourceService = new StaticResourceServiceImpl();
        ReflectionTestUtils.setField(resourceService, "appContext", context);
    }

    @Test
    public void getContentWithResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("index.html"));
        assertThat(resourceService.getContent(PATH)).contains("SMSC");
    }

    @Test
    public void getContentWithoutResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("not-exist.html"));
        assertThat(resourceService.getContent(PATH)).isNull();
    }

    @Test
    public void getBinarayContentWithResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("index.html"));
        assertThat(resourceService.getBinarayContent(PATH)).contains("SMSC".getBytes());
    }

    @Test
    public void getBinarayContentWithoutResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("not-exist.html"));
        assertThat(resourceService.getBinarayContent(PATH)).isEmpty();
    }

    @Test
    public void getInputStreamWithResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("index.html"));
        assertThat(resourceService.getInputStream(PATH)).hasSameContentAs(new ClassPathResource("index.html").getInputStream());
    }

    @Test
    public void getInputStreamWithoutResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("not-exist.html"));
        assertThat(resourceService.getInputStream(PATH)).isNull();
    }

    @Test
    public void getResourceWithResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("index.html"));
        assertThat(resourceService.getResource(PATH)).isEqualTo(new ClassPathResource("index.html"));
    }

    @Test
    public void getResourceWithoutResourceTest() throws Exception {
        when(context.getResource(PATH)).thenReturn(new ClassPathResource("not-exist.html"));
        assertThat(resourceService.getResource(PATH)).isEqualTo(new ClassPathResource("not-exist.html"));
    }
}
