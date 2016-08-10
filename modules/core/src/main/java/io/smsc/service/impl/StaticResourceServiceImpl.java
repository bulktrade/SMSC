package io.smsc.service.impl;

import io.smsc.service.StaticResourceService;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

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
}
