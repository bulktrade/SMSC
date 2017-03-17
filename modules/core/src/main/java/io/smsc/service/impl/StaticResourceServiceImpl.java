package io.smsc.service.impl;

import io.smsc.service.StaticResourceService;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

/**
 * The StaticResourceServiceImpl class is an implementation of {@link StaticResourceService} interface and
 * is used for receiving static resources in different representations using {@link ApplicationContext}.
 *
 * @author Sergej Kunz
 * @since 0.0.2-SNAPSHOT
 */
@Service
public class StaticResourceServiceImpl implements StaticResourceService {
    private static Logger log = Logger.getLogger(StaticResourceServiceImpl.class);

    @Autowired
    private ApplicationContext appContext;

    /**
     * Method to receive resource as string.
     *
     * @param path to resource
     * @return resource as string
     */
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

    /**
     * Method to receive resource as binary code.
     *
     * @param path to resource
     * @return resource as binary code
     */
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

    /**
     * Method to receive resource as input stream.
     *
     * @param path to resource
     * @return resource as input stream
     */
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

    /**
     * Method to receive resource as class object.
     *
     * @param path to resource
     * @return resource as class object
     */
    @Override
    public Resource getResource(String path) {
        return appContext.getResource(path);
    }
}
