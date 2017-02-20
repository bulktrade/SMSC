package io.smsc.encryption;

import io.smsc.AbstractTest;
import io.smsc.Application;
import io.smsc.model.customer.User;
import io.smsc.util.EncrypterUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.test.context.ContextConfiguration;

import static io.smsc.util.EncrypterUtil.removeCryptographyRestrictions;

@ContextConfiguration(classes = Application.class)
public class EncrypterUtilTest extends AbstractTest {

    private final static String PASSWODD = "john123456";

    @Before
    public void removeCryptographyRestriction() {
        removeCryptographyRestrictions();
    }

    @Test
    public void testNewUserEncryptDecryptPassword() {
        io.smsc.model.admin.User user = new io.smsc.model.admin.User();
        user.setPassword(PASSWODD);

        EncrypterUtil.encrypt(user);
        EncrypterUtil.decrypt(user);

        Assert.assertEquals(PASSWODD, user.getPassword());
    }

    @Test
    public void testNewCustomerUserEncryptDecryptPassword() {
        User user = new User();
        user.setPassword(PASSWODD);

        EncrypterUtil.encrypt(user);
        EncrypterUtil.decrypt(user);

        Assert.assertEquals(PASSWODD, user.getPassword());
    }

    @Test
    public void testExistingUserEncryptDecryptPassword() {
        io.smsc.model.admin.User user = new io.smsc.model.admin.User();
        user.setPassword(PASSWODD);

        String salt = KeyGenerators.string().generateKey();
        user.setSalt(salt);

        EncrypterUtil.encrypt(user);
        EncrypterUtil.decrypt(user);

        Assert.assertEquals(PASSWODD, user.getPassword());
        Assert.assertEquals(salt, user.getSalt());
    }

    @Test
    public void testExistingCustomerUserEncryptDecryptPassword() {
        User user = new User();
        user.setPassword(PASSWODD);

        String salt = KeyGenerators.string().generateKey();
        user.setSalt(salt);

        EncrypterUtil.encrypt(user);
        EncrypterUtil.decrypt(user);

        Assert.assertEquals(PASSWODD, user.getPassword());
        Assert.assertEquals(salt, user.getSalt());
    }
}