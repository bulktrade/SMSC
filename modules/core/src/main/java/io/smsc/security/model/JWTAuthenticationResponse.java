package io.smsc.security.model;

import java.io.Serializable;

/**
 * Class for tokens receiving response. Contains token and refreshToken strings.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class JWTAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private final String token;

    private final String refreshToken;

    public JWTAuthenticationResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return this.token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
