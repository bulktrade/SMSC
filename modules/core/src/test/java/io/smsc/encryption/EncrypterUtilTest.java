package io.smsc.encryption;

import io.smsc.AbstractTest;
import io.smsc.model.customer.User;
import io.smsc.util.EncrypterUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.crypto.keygen.KeyGenerators;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;

public class EncrypterUtilTest extends AbstractTest {

    @Before
    public void removeCryptographyRestriction() {
        removeCryptographyRestrictions();
    }

    @Test
    public void testNewUserEncryptDecryptPassword() {
        io.smsc.model.User user = new io.smsc.model.User();
        user.setPassword("john123456");
        EncrypterUtil.encrypt(user);
        System.out.println("Encrypted password: " + user.getPassword());
        System.out.println("Salt: " + user.getSalt());
        EncrypterUtil.decrypt(user);
        System.out.println("Decrypted password: " + user.getPassword());
        Assert.assertEquals("john123456", user.getPassword());
    }

    @Test
    public void testNewCustomerUserEncryptDecryptPassword() {
        User user = new User();
        user.setPassword("john123456");
        System.out.println("Raw password: " + user.getPassword());
        EncrypterUtil.encrypt(user);
        System.out.println("Encrypted password: " + user.getPassword());
        System.out.println("Salt: " + user.getSalt());
        EncrypterUtil.decrypt(user);
        System.out.println("Decrypted password: " + user.getPassword());
        Assert.assertEquals("john123456", user.getPassword());
    }

    @Test
    public void testExistingUserEncryptDecryptPassword() {
        io.smsc.model.User user = new io.smsc.model.User();
        user.setPassword("john123456");
        String salt = KeyGenerators.string().generateKey();
        user.setSalt(salt);
        System.out.println("Raw password: " + user.getPassword());
        EncrypterUtil.encrypt(user);
        System.out.println("Encrypted password: " + user.getPassword());
        System.out.println("Salt: " + user.getSalt());
        EncrypterUtil.decrypt(user);
        System.out.println("Decrypted password: " + user.getPassword());
        Assert.assertEquals("john123456", user.getPassword());
        Assert.assertEquals(salt, user.getSalt());
    }

    @Test
    public void testExistingCustomerUserEncryptDecryptPassword() {
        User user = new User();
        user.setPassword("john123456");
        String salt = KeyGenerators.string().generateKey();
        user.setSalt(salt);
        System.out.println("Raw password: " + user.getPassword());
        EncrypterUtil.encrypt(user);
        System.out.println("Encrypted password: " + user.getPassword());
        System.out.println("Salt: " + user.getSalt());
        EncrypterUtil.decrypt(user);
        System.out.println("Decrypted password: " + user.getPassword());
        Assert.assertEquals("john123456", user.getPassword());
        Assert.assertEquals(salt, user.getSalt());
    }
}