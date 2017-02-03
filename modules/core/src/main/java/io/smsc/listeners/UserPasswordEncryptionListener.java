package io.smsc.listeners;

import io.smsc.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Component;

import javax.persistence.PostLoad;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.security.Permission;
import java.security.PermissionCollection;
import java.util.Map;

/**
 * The UserPasswordEncryptionListener class is used for providing custom user's
 * password encryption\decryption.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class UserPasswordEncryptionListener {

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    //This value is not injected (need to find solution)
    //http://stackoverflow.com/questions/12155632/injecting-a-spring-dependency-into-a-jpa-entitylistener
    private String secretKey = "smsc.io";

    private static final Logger LOG = LoggerFactory.getLogger(UserPasswordEncryptionListener.class);

    /**
     * Method to encrypt password before user persisting.
     *
     * @param  obj  the {@link User} whose password should be encrypted
     */
    @PrePersist
    @PreUpdate
    public void encrypt(Object obj) {
        if(!(obj instanceof User)) {
            return;
        }
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
        User user = (User) obj;
        if(user.getSalt() == null){
            String salt = KeyGenerators.string().generateKey();
            user.setSalt(salt);
        }
        TextEncryptor encryptor = Encryptors.text(secretKey, user.getSalt());
        String encryptedPassword = encryptor.encrypt(user.getPassword());
        user.setPassword(encryptedPassword);
    }

    /**
     * Method to decrypt password after user loading.
     *
     * @param  obj  the {@link User} whose password should be decrypted
     */
    @PostLoad
    @PostUpdate
    public void decrypt(Object obj) {
        if(!(obj instanceof User)) {
            return;
        }
        System.out.println(secretKey);
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        removeCryptographyRestrictions();
        User user = (User) obj;
        TextEncryptor encryptor = Encryptors.text(secretKey, user.getSalt());
        String decryptedPassword = encryptor.decrypt(user.getPassword());
        user.setPassword(decryptedPassword);
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
