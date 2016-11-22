package io.smsc.repository;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.User;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

public class PasswordCryptTest extends AbstractRepositoryTest {

    @Test
    public void testEncryptDecryptPassword(){
        System.out.println(secretKey);
        User user = new User(99L,"Old Johnny","","John","Forrester","john@gmail.com",true,false);
        String encryptedPassword = CryptoConverter.encrypt(user,secretKey);
        String decryptedPassword = CryptoConverter.decrypt(user,secretKey);
        System.out.println("Raw password: " + "john123456");
        System.out.println("Encrypted password: " + encryptedPassword);
        System.out.println("Salt: " + user.getSalt());
        System.out.println("Decrypted password: " + decryptedPassword);
        Assert.assertEquals("john123456",decryptedPassword);
    }
}
