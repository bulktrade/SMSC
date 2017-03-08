package io.smsc.encryption;

import io.smsc.AbstractTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;

public class EncrypterUtilTest extends AbstractTest {

    private final static String PASSWORD = "john123456";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Before
    public void removeCryptographyRestriction() {
        removeCryptographyRestrictions();
    }

    @Test
    public void testEncodeAndComparePasswords() {
        String encodedPassword = passwordEncoder.encode(PASSWORD);
        Assert.assertTrue(passwordEncoder.matches(PASSWORD, encodedPassword));
    }
}