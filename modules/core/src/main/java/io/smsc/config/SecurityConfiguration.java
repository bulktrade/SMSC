package io.smsc.config;

import io.smsc.jwt.JWTAuthenticationEntryPoint;
import io.smsc.jwt.JWTAuthenticationTokenFilter;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.*;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.security.SecureRandom;

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
@Import(RepositoryIdExposingConfiguration.class)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JWTUserDetailsService userDetailsService;
    private final JWTAuthenticationEntryPoint unauthorizedHandler;
    private final JWTTokenGenerationService tokenGenerationService;

    @Value("${encrypt.key}")
    private String encryptionKey;

    @Value("${encrypt.strength}")
    private Integer encryptionStrength;

    @Autowired
    public SecurityConfiguration(
            JWTUserDetailsService userDetailsService,
            JWTAuthenticationEntryPoint unauthorizedHandler,
            JWTTokenGenerationService tokenGenerationService
    ) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.tokenGenerationService = tokenGenerationService;
    }

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(this.userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    /**
     * Gets the {@link SecurityExpressionHandler} which is used for role hierarchy definition
     *
     * @return authenticationTokenFilter
     */
    private SecurityExpressionHandler<FilterInvocation> expressionHandler() {
        DefaultWebSecurityExpressionHandler defaultWebSecurityExpressionHandler = new DefaultWebSecurityExpressionHandler();
        defaultWebSecurityExpressionHandler.setRoleHierarchy(roleHierarchy());

        return defaultWebSecurityExpressionHandler;
    }

    /**
     * Gets the {@link BCryptPasswordEncoder} which is used for user's password encoding
     *
     * @return passwordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(encryptionStrength, new SecureRandom(encryptionKey.getBytes()));
    }

    /**
     * Gets the {@link RoleHierarchy} bean
     *
     * @return roleHierarchy
     */
    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_POWER_ADMIN_USER > ROLE_ADMIN_USER");

        return roleHierarchy;
    }

    /**
     * Gets the {@link JWTAuthenticationTokenFilter} bean
     *
     * @return authenticationTokenFilter
     */
    @Bean
    public JWTAuthenticationTokenFilter authenticationTokenFilterBean() {
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
                // enable csrf protection for Angular
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository
                        .withHttpOnlyFalse())
                .ignoringAntMatchers("/rest/auth/token")
                .and()
                // enable role hierarchy
                .authorizeRequests().expressionHandler(expressionHandler())
                // /rest/auth/token is used for token receiving and updating
                .antMatchers("/").permitAll()
                .antMatchers("/rest/repository/browser/**").permitAll()
                .antMatchers("/admin/**").permitAll()
                .antMatchers("/rest/auth/token").permitAll()
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

        http
                .headers()
                .cacheControl().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/admin/**");
    }

    @Bean
    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
        return new SecurityEvaluationContextExtension();
    }
}
