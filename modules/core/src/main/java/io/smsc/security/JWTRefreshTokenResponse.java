package io.smsc.security;

import java.io.Serializable;

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
