package io.smsc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class MVC extends WebMvcConfigurerAdapter {
	@Autowired
	Environment env;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		if (!registry.hasMappingForPattern("/webjars/**")) {
			registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		}

		if (!registry.hasMappingForPattern("/resources/admin/**")) {
			registry.addResourceHandler("/resources/admin/**").addResourceLocations("classpath:/META-INF/resources/io.smsc.admin/");
		}

		if (!registry.hasMappingForPattern("/**")) {
			registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
		}
	}
}