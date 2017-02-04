package io.smsc.listeners;

import io.smsc.model.CustomerUser;
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

/**
 * The CustomerUserPasswordEncryptionListener class is used for providing custom CustomerUser's
 * password encryption\decryption.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class CustomerUserPasswordEncryptionListener {

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    //This value is not injected (need to find solution)
    //http://stackoverflow.com/questions/12155632/injecting-a-spring-dependency-into-a-jpa-entitylistener
    private String secretKey = "smsc.io";

    private static final Logger LOG = LoggerFactory.getLogger(UserPasswordEncryptionListener.class);

    /**
     * Method to encrypt password before customerUser persisting.
     *
     * @param  obj  the {@link CustomerUser} whose password should be encrypted
     */
    @PrePersist
    @PreUpdate
    public void encrypt(Object obj) {
        if(!(obj instanceof CustomerUser)) {
            return;
        }
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        UserPasswordEncryptionListener.removeCryptographyRestrictions();
        CustomerUser customerUser = (CustomerUser) obj;
        if(customerUser.getSalt() == null){
            String salt = KeyGenerators.string().generateKey();
            customerUser.setSalt(salt);
        }
        TextEncryptor encryptor = Encryptors.text(secretKey, customerUser.getSalt());
        String encryptedPassword = encryptor.encrypt(customerUser.getPassword());
        customerUser.setPassword(encryptedPassword);
    }

    /**
     * Method to decrypt password after customerUser loading.
     *
     * @param  obj  the {@link CustomerUser} whose password should be decrypted
     */
    @PostLoad
    @PostUpdate
    public void decrypt(Object obj) {
        if(!(obj instanceof CustomerUser)) {
            return;
        }
        //Solution of JCE problem for JDK up to 1.8.0.112 (should not be used for JDK 9)
        UserPasswordEncryptionListener.removeCryptographyRestrictions();
        CustomerUser customerUser = (CustomerUser) obj;
        TextEncryptor encryptor = Encryptors.text(secretKey, customerUser.getSalt());
        String decryptedPassword = encryptor.decrypt(customerUser.getPassword());
        customerUser.setPassword(decryptedPassword);
    }
}
