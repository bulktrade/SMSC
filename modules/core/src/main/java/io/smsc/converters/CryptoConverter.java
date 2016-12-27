package io.smsc.converters;

import io.smsc.Application;
import io.smsc.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.util.Assert;

import javax.persistence.AttributeConverter;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.security.Permission;
import java.security.PermissionCollection;
import java.util.Map;

public class CryptoConverter {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoConverter.class);

    public static String encrypt(User user, String secretKey) {
//      Solution of JCE problem for JDK up to 1.8.0.112 (can be useless on other builds)
        removeCryptographyRestrictions();
        String salt = KeyGenerators.string().generateKey();
        String password = user.getPassword();
        TextEncryptor encryptor = Encryptors.text(secretKey,salt);
        String encryptedPassword = encryptor.encrypt(password);
        user.setPassword(encryptedPassword);
        user.setSalt(salt);
        return encryptedPassword;
    }

    public static String decrypt(User user, String secretKey) {
//     Solution of JCE problem for JDK up to 1.8.0.112 (can be useless on next builds)
       removeCryptographyRestrictions();
       String salt = user.getSalt();
       String password = user.getPassword();
       TextEncryptor encryptor = Encryptors.text(secretKey,salt);
       String decryptedPassword = encryptor.decrypt(password);
       user.setPassword(decryptedPassword);
       return decryptedPassword;
    }

    private static void removeCryptographyRestrictions() {
        if (!isRestrictedCryptography()) {
            LOG.info("Cryptography restrictions removal not needed");
            return;
        }
        try {
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
