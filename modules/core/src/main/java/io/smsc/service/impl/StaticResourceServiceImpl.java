package io.smsc.service.impl;

import io.smsc.service.StaticResourceService;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class StaticResourceServiceImpl implements StaticResourceService {
    private static Logger log = Logger.getLogger(StaticResourceServiceImpl.class);

    @Autowired
    private ApplicationContext appContext;

    @Override
    public String getContent(String path) {
        Resource resource = appContext.getResource(path);
        try {
            return IOUtils.toString(resource.getInputStream());
        } catch (IOException e) {
            log.error(e);
        }

        return null;
    }

    @Override
    public byte[] getBinarayContent(String path) {
        Resource resource = appContext.getResource(path);

        try {
            return IOUtils.toByteArray(resource.getInputStream());
        } catch (IOException e) {
            log.error(e);
        }

        return new byte[0];
    }

    @Override
    public InputStream getInputStream(String path) {
        Resource resource = appContext.getResource(path);

        try {
            return resource.getInputStream();
        } catch (IOException e) {
            log.error(e);
        }

        return null;
    }

    @Override
    public Resource getResource(String path) {
        return appContext.getResource(path);
    }
}
