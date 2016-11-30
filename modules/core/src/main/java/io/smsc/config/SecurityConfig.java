package io.smsc.config;

import io.smsc.security.JWTAuthenticationEntryPoint;
import io.smsc.security.JWTAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableAutoConfiguration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(this.userDetailsService);
//                .passwordEncoder(passwordEncoder());
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    @Bean
    public JWTAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JWTAuthenticationTokenFilter();
    }

//    @Override
//    protected void configure(final HttpSecurity http) throws Exception {
//            // @formatter:off
//            http
//                    .csrf().disable()
//                    .authorizeRequests()
//                    .antMatchers("/login*","/login*", "/logout*", "/signin/**", "/signup/**",
//                            "/user/registration*", "/registrationConfirm*", "/expiredAccount*", "/registration*",
//                            "/badUser*", "/user/resendRegistrationToken*" ,"/forgetPassword*", "/user/resetPassword*",
//                            "/user/changePassword*", "/emailError*", "/resources/**","/old/user/registration*","/successRegister*","/qrcode*").permitAll()
//                    .antMatchers("/invalidSession*").anonymous()
//                    .anyRequest().authenticated()
//                    .and()
//                    .formLogin()
//                    .loginPage("/login")
//                    .defaultSuccessUrl("/homepage.html")
//                    .failureUrl("/login?error=true")
//                    .successHandler(myAuthenticationSuccessHandler)
//                    .failureHandler(authenticationFailureHandler)
//                    .authenticationDetailsSource(authenticationDetailsSource)
//                    .permitAll()
//                    .and()
//                    .sessionManagement()
//                    .invalidSessionUrl("/invalidSession.html")
//                    .maximumSessions(1).sessionRegistry(sessionRegistry()).and()
//                    .sessionFixation().none()
//                    .and()
//                    .logout()
//                    .logoutSuccessHandler(myLogoutSuccessHandler)
//                    .invalidateHttpSession(false)
//                    .logoutSuccessUrl("/logout.html?logSucc=true")
//                    .deleteCookies("JSESSIONID")
//                    .permitAll();
//            // @formatter:on
//        }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // we don't need CSRF because our token is invulnerable
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/rest/repository").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/users").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/roles").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/permissions").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/roles/**").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/permissions/**").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-class-meta-data").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-meta-form-data").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-meta-grid-data").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/meta_data_property_binding_parameter").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-class-meta-data/**").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-meta-form-data/**").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/crud-meta-grid-data/**").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/rest/repository/meta_data_property_binding_parameter/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().authenticated()
                .and()
                // Call our errorHandler if authentication/authorisation fails
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                // don't create session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Custom JWT based security filter
        http
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
        // disable page caching
        http.
                headers()
                .cacheControl();
    }
}
