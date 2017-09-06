package io.smsc.validator;

import io.smsc.model.gateway.settings.notification.Notification;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * The PushUrlValid annotation is used for marking {@link Notification} entity to validate
 * pushUrl property.
 *
 * @author Nazar Lipkovskyy
 * @see NotificationValidator
 * @since 0.0.4-SNAPSHOT
 */
@Target({TYPE, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = NotificationValidator.class)
@Documented
public @interface PushUrlValid {

    String message() default "{gateway.notification.pushUrl.empty.message}";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };

}
