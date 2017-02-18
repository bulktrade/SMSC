package io.smsc.jwt.service;

import io.smsc.jwt.service.impl.JWTTokenGenerationServiceImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Map;

/**
 * This interface is describing methods to provide JWT authentication service.
 * Methods implementation is in {@link JWTTokenGenerationServiceImpl}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public interface JWTTokenGenerationService extends Serializable {

    String getUsernameFromToken(String token);

    String refreshToken(String token);

    Boolean validateToken(String token, UserDetails userDetails);

    String generateAccessToken(UserDetails userDetails);

    String generateRefreshToken(UserDetails userDetails);

    String generateAccessToken(Map<String, Object> claims);

    String generateRefreshToken(Map<String, Object> claims);
}
