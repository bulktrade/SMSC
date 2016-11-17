package io.smsc.config;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.HashMap;

//@EnableJpaRepositories(
//        basePackages = "io.smsc.repository",
//        entityManagerFactoryRef = "entityManager",
//        transactionManagerRef = "transactionManager"
//)
//@Configuration
//@SpringBootApplication
//@PropertySource(value = "classpath:application.properties")
//@PropertySource(value = "classpath:${smsc.database:postgresql}.properties")
public class ApplicationConfig {

//    @Autowired
//    private Environment env;
//
//    @Primary
//    @Bean(initMethod = "migrate")
//    public Flyway flyway(){
//        Flyway flyway = new Flyway();
//        flyway.setBaselineOnMigrate(true);
//        flyway.setLocations("classpath:sql/common");
//        flyway.setDataSource(dataSource());
//        return flyway;
//    }
//
//    @Primary
//    @Bean
////    @DependsOn("flyway")
//    public LocalContainerEntityManagerFactoryBean entityManager() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSource());
//        em.setPackagesToScan("io.smsc.model");
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setShowSql(Boolean.getBoolean(env.getProperty("jpa.showSql")));
//        em.setJpaVendorAdapter(vendorAdapter);
//        HashMap<String, Object> properties = new HashMap<>();
//        properties.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
//        properties.put("hibernate.format_sql", env.getProperty("hibernate.format_sql"));
//        properties.put("hibernate.use_sql_comments", env.getProperty("hibernate.use_sql_comments"));
//        properties.put("hibernate.id.new_generator_mappings", env.getProperty("hibernate.id.new_generator_mappings"));
//        em.setJpaPropertyMap(properties);
//        return em;
//    }
//
//    @Primary
//    @Bean
//    public DataSource dataSource() {
//        DataSource dataSource = new DataSource();
//        dataSource.setDriverClassName(env.getProperty("database.driver"));
//        dataSource.setUrl(env.getProperty("database.url"));
//        dataSource.setUsername(env.getProperty("database.username"));
//        dataSource.setPassword(env.getProperty("database.password"));
//        return dataSource;
//    }
//
//    @Primary
//    @Bean
//    public PlatformTransactionManager transactionManager() {
//        JpaTransactionManager transactionManager = new JpaTransactionManager();
//        transactionManager.setEntityManagerFactory(entityManager().getObject());
//        return transactionManager;
//    }
//
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
