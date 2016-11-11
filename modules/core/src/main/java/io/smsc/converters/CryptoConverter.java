package io.smsc.converters;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import java.security.Key;

public class CryptoConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private static final byte[] KEY = "MySuperSecretKey".getBytes();

    @Override
    public String convertToDatabaseColumn(String userPassword) {
        Key key = new SecretKeySpec(KEY, "AES");
        try {
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.ENCRYPT_MODE, key);
            return Base64.encodeBase64String(c.doFinal(userPassword.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        Key key = new SecretKeySpec(KEY, "AES");
        try {
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.DECRYPT_MODE, key);
            return new String(c.doFinal(Base64.decodeBase64(dbData)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
