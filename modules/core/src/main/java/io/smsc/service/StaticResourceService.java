package io.smsc.service;

import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public interface StaticResourceService {
    String getContent(String path);
    byte[] getBinarayContent(String path);
    InputStream getInputStream(String path);
}
