package io.smsc.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

/**
 * The AppConfiguration class is used for customizing encoding and etag.
 *
 * @author Sergej Kunz
 * @since 0.0.2-SNAPSHOT
 */
@Configuration
public class AppConfiguration {

    /**
     * Define filter to force UTF-8 encoding.
     *
     * @return filter
     */
    @Bean
    public FilterRegistrationBean characterEncodingFilterRegistrationBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new org.springframework.web.filter.CharacterEncodingFilter());
        registrationBean.addUrlPatterns("/*");
        registrationBean.addInitParameter("encoding", "UTF-8");
        registrationBean.addInitParameter("forceEncoding", "true");
        registrationBean.setName("CharacterEncodingFilter");

        return registrationBean;
    }

    /**
     * Define filter to enable etag.
     *
     * @return filter
     */
    @Bean
    public FilterRegistrationBean shallowEtagBean() {
        FilterRegistrationBean frb = new FilterRegistrationBean();
        frb.setFilter(new ShallowEtagHeaderFilter());
        frb.addUrlPatterns("/", "/admin", "/admin/*");
        frb.setOrder(2);

        return frb;
    }

    @Primary
    @Bean(name = "messageSource")
    public ReloadableResourceBundleMessageSource messageSource() { // @todo not working
        ReloadableResourceBundleMessageSource messageBundle = new ReloadableResourceBundleMessageSource();
        messageBundle.setBasename("classpath:messages");
        messageBundle.addBasenames("classpath:messages", "classpath:validation");
        messageBundle.setUseCodeAsDefaultMessage(true);
        messageBundle.setDefaultEncoding("UTF-8");
        messageBundle.setFallbackToSystemLocale(true);

        return messageBundle;
    }
}
