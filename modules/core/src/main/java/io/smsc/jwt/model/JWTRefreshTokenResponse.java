package io.smsc.jwt.model;

import java.io.Serializable;

/**
 * Class for access token refresh response. Contains refreshed access token string.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public class JWTRefreshTokenResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private String refreshedToken;

    public JWTRefreshTokenResponse() {
        super();
    }

    public JWTRefreshTokenResponse(String refreshedToken) {
        this.refreshedToken = refreshedToken;
    }

    public String getRefreshedToken() {
        return refreshedToken;
    }
}
