package io.smsc;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@ContextConfiguration(classes = {Application.class})
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@TestPropertySource(properties = {"smsc.database = postgresql"})
public class PasswordCryptTest {

    @Test
    public void testEncryptDecryptPassword(){
        User user = new User(99L,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        String encryptedPassword = CryptoConverter.encryptPassword(user);
        String decryptedPassword = CryptoConverter.decryptPassword(user);
        System.out.println("Raw password: " + "john123456");
        System.out.println("Encrypted password: " + encryptedPassword);
        System.out.println("Decrypted password: " + decryptedPassword);
        Assert.assertEquals("john123456",decryptedPassword);
    }
}
