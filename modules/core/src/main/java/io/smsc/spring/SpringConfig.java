package io.smsc.spring;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        basePackages = "io.smsc.repository",
        entityManagerFactoryRef = "entityManager"
)
@PropertySource(value = "classpath:${smsc.database:postgresql}.properties")
public class SpringConfig {

    @Autowired
    private Environment env;

//    @Primary
//    @Bean
//    @DependsOn("flyway")
//    public LocalContainerEntityManagerFactoryBean entityManager() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSource());
//        em.setPackagesToScan("io.smsc.model");
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setShowSql(Boolean.getBoolean(env.getProperty("jpa.showSql")));
//        em.setJpaVendorAdapter(vendorAdapter);
//        HashMap<String, Object> properties = new HashMap<>();
//        properties.put("hibernate.format_sql", env.getProperty("hibernate.format.sql"));
//        properties.put("hibernate.use_sql_comments", env.getProperty("hibernate.use.sql.comments"));
//        properties.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
//        em.setJpaPropertyMap(properties);
//        return em;
//    }

    @Primary
    @Bean
    public DataSource dataSource() {
        DataSource dataSource = new DataSource();
        dataSource.setDriverClassName(env.getProperty("database.driver"));
        dataSource.setUrl(env.getProperty("database.url"));
        dataSource.setUsername(env.getProperty("database.username"));
        dataSource.setPassword(env.getProperty("database.password"));
        return dataSource;
    }

//    @Primary
//    @Bean
//    public PlatformTransactionManager transactionManager() {
//        JpaTransactionManager transactionManager = new JpaTransactionManager();
//        transactionManager.setEntityManagerFactory(entityManager().getObject());
//        return transactionManager;
//    }

    @Primary
    @Bean(initMethod = "migrate")
    public Flyway flyway(){
        Flyway flyway = new Flyway();
        flyway.setBaselineOnMigrate(true);
//        flyway.setLocations("classpath:sql/common","classpath:sql/${smsc.database:postgresql}");
        flyway.setDataSource(dataSource());
        return flyway;
    }

//    @Primary
//    @Bean
//    public PropertyPlaceholderConfigurer placeholderConfigurer(){
//        PropertyPlaceholderConfigurer configurer = new PropertyPlaceholderConfigurer();
//        configurer.setLocation(new ClassPathResource("classpath:#{systemProperties['smsc.database']}.properties"));
//        configurer.setIgnoreUnresolvablePlaceholders(true);
//        configurer.setOrder(0);
//        return configurer;
//    }
}
