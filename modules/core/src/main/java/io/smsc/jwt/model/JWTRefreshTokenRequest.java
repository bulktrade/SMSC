package io.smsc.jwt.model;

import java.io.Serializable;

/**
 * Class for access token refresh request. Contains string with valid refresh token.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public class JWTRefreshTokenRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private String refreshToken;

    public JWTRefreshTokenRequest() {
        super();
    }

    public JWTRefreshTokenRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
