package io.smsc.service.impl;

import io.smsc.dao.MigrationDao;
import io.smsc.listener.MigrationListener;
import io.smsc.service.MigrationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.io.Resource;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.Enumeration;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

@Component
public class MigrationServiceImpl implements MigrationService {
    private static Logger log = Logger.getLogger(MigrationServiceImpl.class);

    @Autowired
    private MigrationDao migrationDao;

    @Value("classpath:db/migration/*.sql")
    Resource[] resources;

    public void upgradeDatabase() {
//        migrationDao.upgradeDatabase(sql);
        for (Resource resource : resources) {
            try {
                log.info("Resource: " + resource.getInputStream().toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
