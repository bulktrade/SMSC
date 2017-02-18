package io.smsc.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/**
 * Used by {@link ExceptionTranslationFilter} to commence an authentication scheme.
 * <p>
 * Since our API only 'speaks' REST we give a HTTP 401 if user cannot be authenticated. There is no
 * login page top redirect to.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public interface JWTAuthenticationEntryPoint extends AuthenticationEntryPoint {

}
