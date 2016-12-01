package io.smsc.converters;

import io.smsc.model.User;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.util.Assert;

import javax.persistence.AttributeConverter;

public class CryptoConverter {

    public static String encrypt(User user, String secretKey) {
        String salt = KeyGenerators.string().generateKey();
        String password = user.getPassword();
        TextEncryptor encryptor = Encryptors.text(secretKey,salt);
        String encryptedPassword = encryptor.encrypt(password);
        user.setPassword(encryptedPassword);
        user.setSalt(salt);
        return encryptedPassword;
    }

    public static String decrypt(User user, String secretKey) {
       String salt = user.getSalt();
       String password = user.getPassword();
       TextEncryptor encryptor = Encryptors.text(secretKey,salt);
       String decryptedPassword = encryptor.decrypt(password);
       user.setPassword(decryptedPassword);
       return decryptedPassword;
    }

    public static String generateSalt(String password, String secretKey) {
        String salt = KeyGenerators.string().generateKey();
        TextEncryptor encryptor = Encryptors.text(secretKey,salt);
        String encryptedPassword = encryptor.encrypt(password);
        return encryptedPassword + " " + salt;
    }
}
