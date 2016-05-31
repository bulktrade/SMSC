package io.smsc.config;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

import javax.servlet.DispatcherType;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.EnumSet;
import java.util.Properties;

@Configuration
@ComponentScan(basePackages="io.smsc")
@EnableAutoConfiguration
public class App {
	@Bean
	public FilterRegistrationBean characterEncodingFilterRegistrationBean () {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new org.springframework.web.filter.CharacterEncodingFilter());
		registrationBean.addUrlPatterns("/*");
		registrationBean.addInitParameter("encoding", "UTF-8");
		registrationBean.addInitParameter("forceEncoding", "true");
		registrationBean.setName("CharacterEncodingFilter");

		return registrationBean;
	}

	@Bean
	public FilterRegistrationBean shallowEtagHeaderFilter() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new ShallowEtagHeaderFilter());
		registration.setDispatcherTypes(EnumSet.allOf(DispatcherType.class));
		registration.addUrlPatterns("/");

		return registration;
	}

    @Bean
    public OrientJdbcConnection orientDBConnection() {
        Properties info = new Properties();
        info.put("user", "admin");
        info.put("password", "admin");

        info.put("db.usePool", "true"); // USE THE POOL
        info.put("db.pool.min", "3");   // MINIMUM POOL SIZE
        info.put("db.pool.max", "30");  // MAXIMUM POOL SIZE

        try {
            return (OrientJdbcConnection) DriverManager.getConnection("jdbc:orient:remote:localhost/smsc", info);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
