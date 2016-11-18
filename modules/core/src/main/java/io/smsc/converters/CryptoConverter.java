package io.smsc.converters;

import io.smsc.model.User;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;

public class CryptoConverter {

    private static final String SECRET_KEY = "smsc.io";

    public static String encryptPassword(User user) {
        String salt = KeyGenerators.string().generateKey();
        String password = user.getPassword();
        TextEncryptor encryptor = Encryptors.text(SECRET_KEY,salt);
        user.setPassword(encryptor.encrypt(password));
        user.setSalt(salt);
        return encryptor.encrypt(password);
    }

    public static String decryptPassword(User user) {
       String salt = user.getSalt();
       String password = user.getPassword();
       TextEncryptor encryptor = Encryptors.text(SECRET_KEY,salt);
       user.setPassword(encryptor.decrypt(password));
       return encryptor.decrypt(password);
    }
}