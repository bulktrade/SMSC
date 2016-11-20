package io.smsc;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@ContextConfiguration(classes = {Application.class})
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@TestPropertySource(properties = {"smsc.database = hsqldb"})
public class PasswordCryptTest {

    @Value("${encrypt.key}")
    private String secretKey;

    @Test
    public void testEncryptDecryptPassword(){
        System.out.println(secretKey);
        User user = new User(99L,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        String encryptedPassword = CryptoConverter.encryptPassword(user,secretKey);
        String decryptedPassword = CryptoConverter.decryptPassword(user,secretKey);
        System.out.println("Raw password: " + "john123456");
        System.out.println("Encrypted password: " + encryptedPassword);
        System.out.println("Decrypted password: " + decryptedPassword);
        Assert.assertEquals("john123456",decryptedPassword);
    }
}
