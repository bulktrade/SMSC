package io.smsc.listener;

import org.flywaydb.core.Flyway;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class MigrationListener implements ApplicationListener<ApplicationReadyEvent>, Ordered {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(MigrationListener.class);

    @Value("${spring.datasource.url}")
    String dataSourceUrl;

    @Value("${spring.datasource.username}")
    String dataSourceUsername;

    @Value("${spring.datasource.password}")
    String dataSourcePassword;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent contextEvent) {
        LOG.info("Start migration!");
        Flyway flyway = new Flyway();
        flyway.setDataSource(dataSourceUrl,dataSourceUsername,dataSourcePassword);
        flyway.setBaselineOnMigrate(true);
        flyway.setBaselineVersionAsString("1");
        flyway.setLocations("classpath:io/smsc/db/migration");
        flyway.migrate();
        LOG.info("Migration finish!");
    }

    @Override
    public int getOrder() {
        return 0;
    }

}
