package io.smsc.config;

import io.smsc.security.JWTAuthenticationEntryPoint;

import io.smsc.security.JWTAuthenticationTokenFilter;
import io.smsc.security.service.JWTTokenGenerationService;
import io.smsc.security.service.JWTUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * The SecurityConfiguration class is used for configuring Spring
 * Security service considering JWT {@link JWTAuthenticationTokenFilter}
 * implementation.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@Configuration
@EnableWebSecurity
@EnableAutoConfiguration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JWTUserDetailsService userDetailsService;

    private final JWTAuthenticationEntryPoint unauthorizedHandler;

    private final JWTTokenGenerationService tokenGenerationService;

    @Autowired
    public SecurityConfiguration(JWTUserDetailsService userDetailsService, JWTAuthenticationEntryPoint unauthorizedHandler, JWTTokenGenerationService tokenGenerationService) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.tokenGenerationService = tokenGenerationService;
    }

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(this.userDetailsService);
    }

    /**
     * Gets the {@link JWTAuthenticationTokenFilter} bean
     *
     * @return authenticationTokenFilter
     * @throws Exception if an error occurs
     */
    @Bean
    public JWTAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JWTAuthenticationTokenFilter(userDetailsService, tokenGenerationService);
    }

    /**
     * This is the main method to configure the {@link HttpSecurity}.
     *
     * @param http the {@link HttpSecurity} to modify
     * @throws Exception if an error occurs
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                // /rest/auth/** is used for token receiving and updating
                .antMatchers("/**").permitAll()
                .antMatchers("/rest/repository/browser/**").permitAll()
                .antMatchers("/admin/**").permitAll()
                .antMatchers("/rest/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                // Call our errorHandler if authentication/authorization fails
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                // don't create session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Custom JWT based security filter
        http
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
        // disable page caching
        http
                .headers()
                .cacheControl();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/admin/**");
    }
}
