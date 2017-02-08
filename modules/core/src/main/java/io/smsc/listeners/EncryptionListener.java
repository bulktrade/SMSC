package io.smsc.listeners;

import io.smsc.model.User;
import io.smsc.util.EncrypterUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * The UserPasswordEncryptionListener class is used for providing custom user's
 * password encryption\decryption.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public class EncryptionListener {

    /**
     * Method to encrypt password before user persisting.
     *
     * @param obj the {@link User} whose password should be encrypted
     */
    @PrePersist
    @PreUpdate
    public void encrypt(Object obj) {
        EncrypterUtil.encrypt(obj);
    }

    /**
     * Method to decrypt password after user loading.
     *
     * @param obj the {@link User} whose password should be decrypted
     */
    @PostLoad
    @PostUpdate
    public void decrypt(Object obj) {
        EncrypterUtil.decrypt(obj);
    }
}
