package io.smsc;

import io.smsc.converters.CryptoConverter;
import org.junit.Assert;
import org.junit.Test;

public class PasswordCryptTest {

    private static final CryptoConverter CONVERTER = new CryptoConverter();
    private static final String PASSWORD = "qwerty123456";

    @Test
    public void testEncryptDecryptPassword(){
        String encryptedPassword = CONVERTER.convertToDatabaseColumn(PASSWORD);
        String decryptedPassword = CONVERTER.convertToEntityAttribute(encryptedPassword);
        Assert.assertEquals(PASSWORD,decryptedPassword);
        System.out.println("Raw password: " + PASSWORD);
        System.out.println("Encrypted password: " + encryptedPassword);
        System.out.println("Decrypted password: " + decryptedPassword);
    }
}
