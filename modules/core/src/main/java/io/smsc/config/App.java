package io.smsc.config;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.netflix.zuul.filters.discovery.PatternServiceRouteMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
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
@EnableZuulProxy
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
}
