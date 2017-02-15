package io.smsc.jwt.model;

import java.io.Serializable;

/**
 * Class for access token refresh request. Contains expired access token and valid refresh token strings.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public class JWTRefreshTokenRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private String expiredToken;

    private String refreshToken;

    public JWTRefreshTokenRequest() {
        super();
    }

    public JWTRefreshTokenRequest(String token, String refreshToken) {
        this.expiredToken = token;
        this.refreshToken = refreshToken;
    }

    public String getExpiredToken() {
        return expiredToken;
    }

    public void setExpiredToken(String expiredToken) {
        this.expiredToken = expiredToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
