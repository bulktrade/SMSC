package io.smsc.service;

import org.springframework.core.io.Resource;
import io.smsc.service.impl.StaticResourceServiceImpl;

import java.io.InputStream;

/**
 * Base interface which is describing methods for receiving static resources in different representations.
 * Methods implementation is in {@link StaticResourceServiceImpl}
 *
 * @author Sergej Kunz
 * @since 0.0.2-SNAPSHOT
 */
public interface StaticResourceService {

    String getContent(String path);

    byte[] getBinarayContent(String path);

    InputStream getInputStream(String path);

    Resource getResource(String path);
}
