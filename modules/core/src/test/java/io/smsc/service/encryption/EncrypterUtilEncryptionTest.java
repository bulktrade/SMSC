package io.smsc.service.encryption;

import io.smsc.util.EncrypterUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;
import org.springframework.security.crypto.keygen.KeyGenerators;

import java.lang.reflect.Field;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EncrypterUtil.class)
@PowerMockIgnore({"javax.crypto.*"})
public class EncrypterUtilEncryptionTest {

    private final static String STRING_FOR_ENCODING = "someString";

    private EncryptionTestClassWithPrivateFieldWithoutSalt obj1;

    private EncryptionTestClassWithPublicFieldAndSalt obj2;

    @Before
    public void removeCryptographyRestriction() throws Exception {
        removeCryptographyRestrictions();

        Whitebox.setInternalState(EncrypterUtil.class, "smsc.io");

        obj1 = new EncryptionTestClassWithPrivateFieldWithoutSalt();
        obj1.setFieldToBeEncoded(STRING_FOR_ENCODING);
        obj2 = new EncryptionTestClassWithPublicFieldAndSalt();
        obj2.setFieldToBeEncoded(STRING_FOR_ENCODING);
        obj2.setSalt(KeyGenerators.string().generateKey());
    }

    @Test(expected = NullPointerException.class)
    public void testCreateEncryptorWithNullSalt() throws Exception {
        PowerMockito.spy(EncrypterUtil.class);
        PowerMockito.doReturn(null).when(EncrypterUtil.class, "getSalt", obj1);

        EncrypterUtil.encrypt(obj1);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateEncryptorWithNotEncodedSalt() throws Exception {
        PowerMockito.spy(EncrypterUtil.class);
        PowerMockito.doReturn("raw text").when(EncrypterUtil.class, "getSalt", obj1);

        EncrypterUtil.encrypt(obj1);
    }

    @Test(expected = IllegalStateException.class)
    public void testDecryptObjectWithOtherSecretKey() throws Exception {
        EncrypterUtil.encrypt(obj1);

        Whitebox.setInternalState(EncrypterUtil.class, "fake");

        EncrypterUtil.decrypt(obj1);
    }

    @Test
    public void testEncryptAndDecryptPrivateFieldForObjectWithoutSalt() throws Exception {
        checkStringForEncryptedAndDecryptedFieldForFirstObject(obj1);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithPublicSalt() throws Exception {
        checkStringForEncryptedAndDecryptedFieldForSecondObject(obj2);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithEmptySalt() throws Exception {
        obj2.setSalt("");

        checkStringForEncryptedAndDecryptedFieldForSecondObject(obj2);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithNullSalt() throws Exception {
        obj2.setSalt(null);

        checkStringForEncryptedAndDecryptedFieldForSecondObject(obj2);
    }

    @Test
    public void testEncryptAndDecryptPublicFieldForObjectWithPrivateSalt() throws Exception {
        Field saltField = obj2.getClass().getDeclaredField("salt");
        saltField.setAccessible(false);
        checkStringForEncryptedAndDecryptedFieldForSecondObject(obj2);
        saltField.setAccessible(true);
    }

    private void checkStringForEncryptedAndDecryptedFieldForFirstObject(EncryptionTestClassWithPrivateFieldWithoutSalt obj) throws Exception {
        EncrypterUtil.encrypt(obj);
        assertThat(obj.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj);
        assertThat(obj.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
    }

    private void checkStringForEncryptedAndDecryptedFieldForSecondObject(EncryptionTestClassWithPublicFieldAndSalt obj) throws Exception {
        EncrypterUtil.encrypt(obj);
        assertThat(obj.getFieldToBeEncoded()).isNotEqualTo(STRING_FOR_ENCODING);
        EncrypterUtil.decrypt(obj);
        assertThat(obj.getFieldToBeEncoded()).isEqualTo(STRING_FOR_ENCODING);
    }
}