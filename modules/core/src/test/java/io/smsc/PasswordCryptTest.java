package io.smsc;

import io.smsc.converters.CryptoConverter;
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
@TestPropertySource(properties = {"smsc.database = postgresql","encoding.key = MySuperSecretKey"})
public class PasswordCryptTest {

    @Test
    public void testEncryptDecryptPassword(){
        String PASSWORD = "qwerty123456";
        CryptoConverter converter = new CryptoConverter();
        String encryptedPassword = converter.convertToDatabaseColumn(PASSWORD);
        String decryptedPassword = converter.convertToEntityAttribute(encryptedPassword);
        Assert.assertEquals(PASSWORD,decryptedPassword);
        System.out.println("Raw password: " + PASSWORD);
        System.out.println("Encrypted password: " + encryptedPassword);
        System.out.println("Decrypted password: " + decryptedPassword);
    }
}
