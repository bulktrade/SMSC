package io.smsc.service;

import org.springframework.stereotype.Service;

@Service
public interface StaticResourceService {
	String getContent(String path);
	byte[] getBinarayContent(String path);
}
