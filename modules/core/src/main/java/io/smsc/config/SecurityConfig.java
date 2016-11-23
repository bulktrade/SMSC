package io.smsc.config;

import io.smsc.security.CustomAuthenticationProvider;
import io.smsc.security.CustomWebAuthenticationDetailsSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomWebAuthenticationDetailsSource authenticationDetailsSource;

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider());
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
        http.authorizeRequests()
                .antMatchers("/rest/repository/user").access("hasRole('ADMIN')")
                .antMatchers("/rest/repository/role").access("hasRole('ADMIN')")
                .antMatchers("/rest/repository/permission").access("hasRole('ADMIN')")
                .and().formLogin().defaultSuccessUrl("/", false);
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        final CustomAuthenticationProvider authProvider = new CustomAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
//        authProvider.setPasswordEncoder(encoder());
        return authProvider;
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

}
