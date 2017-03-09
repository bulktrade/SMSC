package io.smsc.converters;

import io.smsc.util.EncrypterUtil;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * The CryptoConverter class is used for encoding raw user's password before persisting
 * and returning encoded password while user retrieving.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.2-SNAPSHOT
 */
@Converter
public class CryptoConverter implements AttributeConverter<String, String> {

    /**
     * Method to convert raw user's password into encoded before persisting.
     *
     * @param rawPassword raw password
     * @return encoded password
     */
    @Override
    public String convertToDatabaseColumn(String rawPassword) {
        return EncrypterUtil.hashPassword(rawPassword);
    }

    /**
     * Method to return encoded password from database without changes
     *
     * @param hashedPassword encoded password from database
     * @return encoded password
     */
    @Override
    public String convertToEntityAttribute(String hashedPassword) {
        return hashedPassword;
    }
}
