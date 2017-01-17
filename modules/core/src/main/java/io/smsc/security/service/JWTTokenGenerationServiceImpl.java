package io.smsc.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.smsc.security.model.JWTUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class used for generating and processing access and refresh tokens.
 *
 * @author  Nazar Lipkovskyy
 * @see     JWTTokenGenerationService
 * @see     io.jsonwebtoken.Claims;
 * @see     io.jsonwebtoken.Jwts;
 * @see     io.jsonwebtoken.SignatureAlgorithm;
 * @since   0.0.1-SNAPSHOT
 */
@Service
public class JWTTokenGenerationServiceImpl implements JWTTokenGenerationService {

    public static final long serialVersionUID = -3301605591108950415L;

    public static final String CLAIM_KEY_USERNAME = "sub";
    public static final String CLAIM_KEY_CREATED = "created";

    /**
     * This string is used as a name of request header which contains tokens
     */
    @Value("${jwt.secret}")
    private String secret;

    /**
     * This digit is used as a value of access token life duration in seconds
     */
    @Value("${jwt.expiration}")
    private Long expiration;

    @Override
    public String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    private Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    private Date generateExpirationDateForAccessToken() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    private Date generateExpirationDateForRefreshToken() {
        return new Date(System.currentTimeMillis() + expiration * 24 * 1000);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    @Override
    public String refreshToken(String token) {
        String refreshedToken;
        try {
            final Claims claims = getClaimsFromToken(token);
            claims.put(CLAIM_KEY_CREATED, new Date());
            refreshedToken = generateAccessToken(claims);
        } catch (Exception e) {
            refreshedToken = null;
        }
        return refreshedToken;
    }

    @Override
    public Boolean validateToken(String token, UserDetails userDetails) {
        JWTUser user = (JWTUser) userDetails;
        final String username = getUsernameFromToken(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    @Override
    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateAccessToken(claims);
    }

    public String generateAccessToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDateForAccessToken())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateRefreshToken(claims);
    }

    public String generateRefreshToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDateForRefreshToken())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
