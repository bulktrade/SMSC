package io.smsc.encryption;

import io.smsc.AbstractTest;
import io.smsc.model.CustomerUser;
import io.smsc.model.User;
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
        User user = new User();
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
        CustomerUser customerUser = new CustomerUser();
        customerUser.setPassword("john123456");
        System.out.println("Raw password: " + customerUser.getPassword());
        EncrypterUtil.encrypt(customerUser);
        System.out.println("Encrypted password: " + customerUser.getPassword());
        System.out.println("Salt: " + customerUser.getSalt());
        EncrypterUtil.decrypt(customerUser);
        System.out.println("Decrypted password: " + customerUser.getPassword());
        Assert.assertEquals("john123456", customerUser.getPassword());
    }

    @Test
    public void testExistingUserEncryptDecryptPassword() {
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

    @Test
    public void testExistingCustomerUserEncryptDecryptPassword() {
        CustomerUser customerUser = new CustomerUser();
        customerUser.setPassword("john123456");
        String salt = KeyGenerators.string().generateKey();
        customerUser.setSalt(salt);
        System.out.println("Raw password: " + customerUser.getPassword());
        EncrypterUtil.encrypt(customerUser);
        System.out.println("Encrypted password: " + customerUser.getPassword());
        System.out.println("Salt: " + customerUser.getSalt());
        EncrypterUtil.decrypt(customerUser);
        System.out.println("Decrypted password: " + customerUser.getPassword());
        Assert.assertEquals("john123456", customerUser.getPassword());
        Assert.assertEquals(salt, customerUser.getSalt());
    }
}