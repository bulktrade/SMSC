package io.smsc.converters;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;

@Component
public class CryptoConverter implements AttributeConverter<String, String> {

    @Value("${encrypt.key}")
    private String secretKey = "asdasd";

    private String salt = KeyGenerators.string().generateKey();

    private TextEncryptor encryptor = Encryptors.text(secretKey,salt);

    @Override
    public String convertToDatabaseColumn(String userPassword) {
        return encryptor.encrypt(userPassword);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
       return encryptor.decrypt(dbData);
    }
}
