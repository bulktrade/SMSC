package io.smsc.listeners;

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

    private static final Logger LOG = LoggerFactory.getLogger(EncrypterUtil.class);

    private static String SECRET_KEY;

    @Value("${encrypt.key}")
    public void setSecretKey(String secretKey) {
        SECRET_KEY = secretKey;
    }

    /**
     * Method to encrypt password before user persisting.
     *
     * @param  obj  the {@link User} whose password should be encrypted
     */
    static void encrypt(Object obj) {
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
        try {
            Field salt_field = obj.getClass().getDeclaredField("salt");
            Field password_field = obj.getClass().getDeclaredField("password");
            salt_field.setAccessible(true);
            password_field.setAccessible(true);
            if(null == salt_field.get(obj)){
                String salt = KeyGenerators.string().generateKey();
                salt_field.set(obj, salt);
            }
            TextEncryptor encryptor = Encryptors.text(SECRET_KEY, (CharSequence) salt_field.get(obj));
            String encryptedPassword = encryptor.encrypt((String) password_field.get(obj));
            password_field.set(obj, encryptedPassword);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    /**
     * Method to decrypt password after user loading.
     *
     * @param  obj  the {@link User} whose password should be decrypted
     */
    static void decrypt(Object obj) {
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
        try {
            Field salt_field = obj.getClass().getDeclaredField("salt");
            Field password_field = obj.getClass().getDeclaredField("password");
            salt_field.setAccessible(true);
            password_field.setAccessible(true);
            TextEncryptor encryptor = Encryptors.text(SECRET_KEY, (CharSequence) salt_field.get(obj));
            String decryptedPassword = encryptor.decrypt((String) password_field.get(obj));
            password_field.set(obj, decryptedPassword);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method is used to avoid exception associated with cryptography
     * strength limit. When using JDK 9+ this method is not more necessary and
     * should be removed.
     */
    private static void removeCryptographyRestrictions() {
        if (!isRestrictedCryptography()) {
            LOG.info("Cryptography restrictions removal not needed");
            return;
        }        try {
        /*
         * Do the following, but with reflection to bypass access checks:
         *
         * JceSecurity.isRestricted = false;
         * JceSecurity.defaultPolicy.perms.clear();
         * JceSecurity.defaultPolicy.add(CryptoAllPermission.INSTANCE);
         */
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

            LOG.info("Successfully removed cryptography restrictions");
        } catch (final Exception e) {
            LOG.debug("WARNING", "Failed to remove cryptography restrictions", e);
        }
    }

    private static boolean isRestrictedCryptography() {
        // This simply matches the Oracle JRE, but not OpenJDK.
        return "Java(TM) SE Runtime Environment".equals(System.getProperty("java.runtime.name"));
    }
}
