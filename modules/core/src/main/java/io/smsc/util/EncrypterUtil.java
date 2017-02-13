package io.smsc.util;

import io.smsc.annotation.Encrypt;
import io.smsc.exception.EmptySaltException;
import io.smsc.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.security.Permission;
import java.security.PermissionCollection;
import java.util.Map;

@Component
public class EncrypterUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(EncrypterUtil.class);
    private static String secretKey;

    public EncrypterUtil() {
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
    }

    /**
     * Method to encrypt password before user persisting.
     *
     * @param obj the {@link User} whose password should be encrypted
     */
    public static void encrypt(Object obj) {
        try {
            CharSequence salt = getSalt(obj);
            if (secretKey == null) {
                secretKey = "smsc.io";
            }
            TextEncryptor encryptor = Encryptors.text(secretKey, salt);
            for (Field field : obj.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(Encrypt.class) && !field.isAccessible()) {
                    field.setAccessible(true);
                    field.set(obj, encryptor.encrypt((String) field.get(obj)));
                    field.setAccessible(false);
                } else if(field.isAnnotationPresent(Encrypt.class)) {
                    field.set(obj, encryptor.decrypt((String) field.get(obj)));
                }
            }
        } catch (IllegalAccessException e) {
            LOGGER.error("Encrypt exception.", e);
        }
    }

    /**
     * Method to decrypt fields based on io.smsc.annotation.Encrypt annotation.
     *
     * @param obj entity object
     */
    public static void decrypt(Object obj) {
        try {
            CharSequence salt = getSalt(obj);
            if (secretKey == null) {
                secretKey = "smsc.io";
            }
            TextEncryptor encryptor = Encryptors.text(secretKey, salt);
            for (Field field : obj.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(Encrypt.class) && !field.isAccessible()) {
                    field.setAccessible(true);
                    field.set(obj, encryptor.decrypt((String) field.get(obj)));
                    field.setAccessible(false);
                } else if(field.isAnnotationPresent(Encrypt.class)) {
                    field.set(obj, encryptor.decrypt((String) field.get(obj)));
                }
            }
        } catch (IllegalAccessException e) {
            LOGGER.error("Decrypt exception.", e);
        }
    }

    private static CharSequence getSalt(Object obj) throws IllegalAccessException {
        CharSequence salt;
        try {
            Field saltField = obj.getClass().getDeclaredField("salt");
            Boolean isAccessible = saltField.isAccessible();

            if (!isAccessible) {
                saltField.setAccessible(true);
            }

            salt = (CharSequence) saltField.get(obj);

            if (salt == null || "".equals(salt)) {
                salt = KeyGenerators.string().generateKey();
                saltField.set(obj, salt);
            }

            if (!isAccessible) {
                saltField.setAccessible(false);
            }
        } catch (NoSuchFieldException e) {
            LOGGER.info("Decrypt exception: salt field not found.", e);
            // Use class name as salt, if salt field not available.
            salt = obj.getClass().getName();
        }
        return salt;
    }

    /**
     * This method is used to avoid exception associated with cryptography
     * strength limit. When using JDK 9+ this method is not more necessary and
     * should be removed.
     */
    public static void removeCryptographyRestrictions() {
        if (!isRestrictedCryptography()) {
            LOGGER.info("Cryptography restrictions removal not needed");
            return;
        }

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
        } catch (final Exception e) {
            LOGGER.debug("WARNING", "Failed to remove cryptography restrictions", e);
        }
    }

    private static boolean isRestrictedCryptography() {
        // This simply matches the Oracle JRE, but not OpenJDK.
        return "Java(TM) SE Runtime Environment".equals(System.getProperty("java.runtime.name"));
    }

    @Value("${encrypt.key}")
    public void setSecretKey(String secretKey) {
        EncrypterUtil.secretKey = secretKey;
    }
}
