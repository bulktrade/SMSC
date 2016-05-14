package io.smsc.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

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
}
