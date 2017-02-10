package io.smsc.encryption;

import io.smsc.model.CustomerUser;
import io.smsc.model.User;
import io.smsc.util.EncrypterUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;

public class EncrypterUtilTest {

    @Before
    public void removeCryptographyRestriction() {
        removeCryptographyRestrictions();
    }

    @Test
    public void testEncryptDecryptUserPassword() {
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
    public void testEncryptDecryptCustomerUserPassword() {
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
}