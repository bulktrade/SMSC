package io.smsc.util;

import io.smsc.annotation.Encrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.security.Permission;
import java.security.PermissionCollection;
import java.util.Map;

/**
 * This class contains static methods to encrypt\decrypt properties, annotated with {@link Encrypt}
 * and hash user's password using default Spring {@link BCryptPasswordEncoder}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.2-SNAPSHOT
 */
@Component
public class EncrypterUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(EncrypterUtil.class);
    private static String secretKey;
    private static PasswordEncoder passwordEncoder;

    @Autowired
    public EncrypterUtil() throws Exception {
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        EncrypterUtil.passwordEncoder = passwordEncoder;
    }

    /**
     * Method to encrypt fields based on {@link Encrypt} annotation.
     *
     * @param obj entity object
     */
    public static void encrypt(Object obj) throws IllegalAccessException {
        CharSequence salt = getSalt(obj);

        TextEncryptor encryptor = Encryptors.text(secretKey, salt);
        for (Field field : obj.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(Encrypt.class)) {
                field.setAccessible(true);
                field.set(obj, encryptor.encrypt((String) field.get(obj)));
                field.setAccessible(false);
            }
        }
    }

    /**
     * Method to decrypt fields based on {@link Encrypt} annotation.
     *
     * @param obj entity object
     */
    public static void decrypt(Object obj) throws IllegalAccessException {
        CharSequence salt = getSalt(obj);

        TextEncryptor encryptor = Encryptors.text(secretKey, salt);
        for (Field field : obj.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(Encrypt.class)) {
                field.setAccessible(true);
                field.set(obj, encryptor.decrypt((String) field.get(obj)));
                field.setAccessible(false);
            }
        }
    }

    /**
     * Additional method to get salt from object.
     *
     * @param obj entity object
     * @return string with salt
     */
    private static CharSequence getSalt(Object obj) throws IllegalAccessException {
        CharSequence salt;
        try {
            Field saltField = obj.getClass().getDeclaredField("salt");
            saltField.setAccessible(true);
            salt = (CharSequence) saltField.get(obj);

            if (salt == null || salt.toString().isEmpty()) {
                salt = KeyGenerators.string().generateKey();
                saltField.set(obj, salt);
            }

            saltField.setAccessible(false);

        } catch (NoSuchFieldException e) {
            LOGGER.info("Decrypt exception: salt field not found.");
            // Use encoded class name as salt, if salt field not available.
            salt = new String(Hex.encode(obj.getClass().getName().getBytes()));
        }

        return salt;
    }

    /**
     * Main method to hash user's password before persisting.
     *
     * @param rawPassword user's password
     * @return encoded password
     */
    public static String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * This method is used to avoid exception associated with cryptography
     * strength limit. When using JDK 9+ this method is not more necessary and
     * should be removed.
     */
    public static void removeCryptographyRestrictions() throws Exception {
        try {
            final Class<?> jceSecurity = Class.forName("javax.crypto.JceSecurity");
            final Class<?> cryptoPermissions = Class.forName("javax.crypto.CryptoPermissions");
            final Class<?> cryptoAllPermission = Class.forName("javax.crypto.CryptoAllPermission");

            final Field isRestrictedField = jceSecurity.getDeclaredField("isRestricted");
            isRestrictedField.setAccessible(true);
            final Field modifiersField = Field.class.getDeclaredField("modifiers");
            modifiersField.setAccessible(true);
            modifiersField.setInt(isRestrictedField, isRestrictedField.getModifiers() & ~Modifier.FINAL);
            isRestrictedField.set(null, false);

            final Field defaultPolicyField = jceSecurity.getDeclaredField("defaultPolicy");
            defaultPolicyField.setAccessible(true);
            final PermissionCollection defaultPolicy = (PermissionCollection) defaultPolicyField.get(null);

            final Field perms = cryptoPermissions.getDeclaredField("perms");
            perms.setAccessible(true);
            ((Map<?, ?>) perms.get(defaultPolicy)).clear();

            final Field instance = cryptoAllPermission.getDeclaredField("INSTANCE");
            instance.setAccessible(true);
            defaultPolicy.add((Permission) instance.get(null));

            LOGGER.info("Successfully removed cryptography restrictions");
        }
        catch (Exception ex) {
            LOGGER.error("Removing cryptography restrictions failed", ex);
        }
    }

    @Value("${encrypt.key}")
    public void setSecretKey(String secretKey) {
        EncrypterUtil.secretKey = secretKey;
    }
}
