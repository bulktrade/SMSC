package io.smsc.jwt;

import io.smsc.jwt.model.JWTUser;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Class that extends base {@link org.springframework.web.filter.OncePerRequestFilter} filter
 * class and provides one execution of {@link #doFilterInternal} method per each request.
 *
 * @author Nazar Lipkovskyy
 * @see io.smsc.jwt.service.JWTTokenGenerationService
 * @see io.smsc.jwt.service.JWTUserDetailsService
 * @since 0.0.1-SNAPSHOT
 */
@Component
public class JWTAuthenticationTokenFilter extends OncePerRequestFilter {

    private static final Logger LOG = LoggerFactory.getLogger(JWTAuthenticationTokenFilter.class);

    private final JWTUserDetailsService userDetailsService;

    private final JWTTokenGenerationService jwtTokenGenerationService;

    /**
     * This string is used as a name of request header which contains tokens
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    public JWTAuthenticationTokenFilter(JWTUserDetailsService userDetailsService, JWTTokenGenerationService jwtTokenGenerationService) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenGenerationService = jwtTokenGenerationService;
    }

    /**
     * This method will be be invoked once per request within a single request thread.
     * Base method which is used to check user authorities using tokens during any request.
     * <p>
     * Implementation of basic {@link org.springframework.web.filter.OncePerRequestFilter
     * #doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain)}  method.
     *
     * @param request  the request, in which method will be executed
     * @param response the response
     * @param chain    an object provided by the servlet container to the developer
     *                 giving a view into the invocation chain of a filtered request
     *                 for a resource
     * @throws ServletException if {@code request} or {@code response} are not {@link HttpServletRequest}
     *                          or {@link HttpServletResponse} type accordingly
     * @throws IOException      on input error
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String authToken = request.getHeader(this.tokenHeader);
        String username = jwtTokenGenerationService.getUsernameFromToken(authToken);
        if (username != null) {
            LOG.info(String.format("Checking authentication for user %s ", username));

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                JWTUser jwtUser = this.userDetailsService.loadUserByUsername(username);
                if (jwtTokenGenerationService.validateToken(authToken, jwtUser)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(jwtUser, null, jwtUser.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    LOG.info(String.format("Authenticated user %s, setting security context", username));
                    LOG.info(String.format("%s has authorities: %s", username, jwtUser.getAuthorities()));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        chain.doFilter(request, response);
    }

}
