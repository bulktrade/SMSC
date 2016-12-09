package io.smsc.config;

import org.flywaydb.core.Flyway;
import io.smsc.db.migration.ApplicationContextAwareSpringJdbcMigrationResolver;
import org.flywaydb.core.internal.util.Location;
import org.flywaydb.core.internal.util.scanner.Scanner;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("io.smsc.db.migration")
public class FlywayConfiguration {

    @Bean
    public BeanPostProcessor postProcessFlyway(ApplicationContext context) {
        return new BeanPostProcessor() {

            @Override
            public Object postProcessBeforeInitialization(Object o, String s) throws BeansException {
                return o;
            }

            @Override
            public Object postProcessAfterInitialization(Object o, String s) throws BeansException {
                if (o instanceof Flyway) {
                    Flyway flyway = (Flyway) o;
                    flyway.setSkipDefaultResolvers(true);
                    ApplicationContextAwareSpringJdbcMigrationResolver resolver = new ApplicationContextAwareSpringJdbcMigrationResolver(
                            new Scanner(Thread.currentThread().getContextClassLoader()),
                            new Location("classpath:io/smsc/db/migration"),
                            context.getBean(org.flywaydb.core.api.configuration.FlywayConfiguration.class),
                            context);
                    flyway.setResolvers(resolver);
                    flyway.setBaselineOnMigrate(true);
                    flyway.setBaselineVersionAsString("1");
                }
                return o;
            }
        };
    }
}
