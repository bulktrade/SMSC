package io.smsc.config;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
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

//    @Value("${spring.datasource.url}")
//    String dataSourceUrl;
//
//    @Value("${spring.datasource.username}")
//    String dataSourceUsername;
//
//    @Value("${spring.datasource.password}")
//    String dataSourcePassword;
//
//    @Value("${spring.datasource.driver-class-name}")
//    String dataSourceDriver;
//
//    @Primary
//    @Bean
//    public DataSource dataSource() {
//        DataSource dataSource = new DataSource();
//        dataSource.setDriverClassName(dataSourceDriver);
//        dataSource.setUrl(dataSourceUrl);
//        dataSource.setUsername(dataSourceUsername);
//        dataSource.setPassword(dataSourcePassword);
//        return dataSource;
//    }

//    @Primary
//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManager() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSource());
//        em.setPackagesToScan("io.smsc.model");
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setShowSql(true);
//        em.setJpaVendorAdapter(vendorAdapter);
//        HashMap<String, Object> properties = new HashMap<>();
//        properties.put("hibernate.hbm2ddl.auto", true);
//        properties.put("hibernate.format_sql", true);
//        properties.put("hibernate.use_sql_comments", true);
//        properties.put("hibernate.id.new_generator_mappings", true);
//        em.setJpaPropertyMap(properties);
//        return em;
//    }

//    @Primary
//    @Bean(initMethod = "migrate")
////     It doesn't work
//    @DependsOn("entityManager")
//    public Flyway flyway(){
//        Flyway flyway = new Flyway();
//        flyway.setBaselineOnMigrate(true);
//        flyway.setLocations("classpath:io/smsc/db/migration");
//        flyway.setDataSource(dataSource());
//        return flyway;
//    }

//    @Primary
//    @Bean
//    @DependsOn("entityManager")
//    public JdbcTemplate jdbcTemplate() {
//        return new JdbcTemplate(dataSource());
//    }


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
