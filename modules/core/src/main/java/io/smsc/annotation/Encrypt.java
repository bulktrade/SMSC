package io.smsc.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * The Encrypt annotation is used for marking entity properties which should be encoded
 * before entity is persisted
 *
 * @author Nazar Lipkovskyy
 * @see io.smsc.listeners.EncryptionListener
 * @see io.smsc.util.EncrypterUtil
 * @since 0.0.1-SNAPSHOT
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Encrypt {
}
