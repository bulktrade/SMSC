package io.smsc.service.encryption;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.util.EncrypterUtil;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class EncrypterUtilHashingTest extends AbstractSpringMVCTest {

    private final static String RAW_PASSWORD = "john123456";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testHashPasswordWithBCrypt() {
        String encodedPassword = EncrypterUtil.hashPassword(RAW_PASSWORD);

        Assert.assertTrue(passwordEncoder.matches(RAW_PASSWORD, encodedPassword));
    }
}
