package io.smsc.security;

import org.assertj.core.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class JWTTokenUtilTest {

    private JWTTokenUtil jwtTokenUtil;

    @Before
    public void init() {
        jwtTokenUtil = new JWTTokenUtil();
        ReflectionTestUtils.setField(jwtTokenUtil, "expiration", 3600000L);
        ReflectionTestUtils.setField(jwtTokenUtil, "secret", "mySecret");
    }

    @Test
    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenUtil.generateToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenUtil.generateToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    private Map<String, Object> createClaims(String creationDate) {
        Map<String, Object> claims = new HashMap();
        claims.put(JWTTokenUtil.CLAIM_KEY_USERNAME, "testUser");
        claims.put(JWTTokenUtil.CLAIM_KEY_AUDIENCE, "testAudience");
        claims.put(JWTTokenUtil.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }
}
