package io.smsc.encryption;

import io.smsc.AbstractTest;
import io.smsc.util.EncrypterUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.lang.reflect.Field;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;
import static org.assertj.core.api.Assertions.assertThat;

public class EncrypterUtilTest extends AbstractTest {

    private final static String RAW_PASSWORD = "john123456";
    private final static String STRING_FOR_ENCODING  = "someString";
    private EncryptionTestClassWithPrivateFieldWithoutSalt obj1;
    private EncryptionTestClassWithPublicFieldAndSalt obj2;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Before
    public void removeCryptographyRestriction() throws Exception {
        removeCryptographyRestrictions();
        obj1 = new EncryptionTestClassWithPrivateFieldWithoutSalt();
        obj1.setFieldToBeEncoded(STRING_FOR_ENCODING);
        obj2 = new EncryptionTestClassWithPublicFieldAndSalt();
        obj2.setFieldToBeEncoded(STRING_FOR_ENCODING);
        obj2.setSalt(KeyGenerators.string().generateKey());
    }

    @Test
    public void testEncodeAndComparePasswordsWithBCrypt() {
        String encodedPassword = passwordEncoder.encode(RAW_PASSWORD);
        Assert.assertTrue(passwordEncoder.matches(RAW_PASSWORD, encodedPassword));
    }

    @Test
    public void testEncryptAndDecryptPrivateFieldForObjectWithoutSalt() throws Exception {
        EncrypterUtil.encrypt(obj1);
        assertThat(obj1.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj1);
        assertThat(obj1.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithPublicSalt() throws Exception {
        EncrypterUtil.encrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithEmptySalt() throws Exception {
        obj2.setSalt("");
        EncrypterUtil.encrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithPrivateSalt() throws Exception {
        Field saltField = obj2.getClass().getDeclaredField("salt");
        saltField.setAccessible(false);
        EncrypterUtil.encrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj2);
        assertThat(obj2.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
        saltField.setAccessible(true);
    }
}