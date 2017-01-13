package io.smsc.security;

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
 * @author  Nazar Lipkovskyy
 * @see     io.smsc.security.JWTTokenUtil
 * @see     io.smsc.security.JWTUserDetailsServiceImpl
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class JWTAuthenticationTokenFilter extends OncePerRequestFilter {

    private static final Logger LOG = LoggerFactory.getLogger(JWTAuthenticationTokenFilter.class);

    @Autowired
    private JWTUserDetailsServiceImpl userDetailsService;

    @Autowired
    private JWTTokenUtil JWTTokenUtil;

    /**
     * This string is used as a name of request header which contains tokens
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * This method will be be invoked once per request within a single request thread.
     * Base method which is used to check user authorities using tokens during any request.
     * <p>
     * Implementation of basic {@link org.springframework.web.filter.OncePerRequestFilter
     * #doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain)}  method.
     *
     * @param request           the request, in which method will be executed
     * @param response          the response
     * @param chain             an object provided by the servlet container to the developer
     *                          giving a view into the invocation chain of a filtered request
     *                          for a resource
     * @throws ServletException if {@code request} or {@code response} are not {@link HttpServletRequest}
     *                          or {@link HttpServletResponse} type accordingly
     * @throws IOException      on input error
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String authToken = request.getHeader(this.tokenHeader);
        // String authToken = header.substring(7);
        String username = JWTTokenUtil.getUsernameFromToken(authToken);
        LOG.info("checking authentication for user " + username);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            JWTUser jwtUser = this.userDetailsService.loadUserByUsername(username);
            if (JWTTokenUtil.validateToken(authToken, jwtUser)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(jwtUser, null, jwtUser.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                LOG.info("authenticated user " + username + ", setting security context");
                LOG.info(username + " has roles: " + jwtUser.getRoles());
                LOG.info(username + " has permissions: " + jwtUser.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }

}
