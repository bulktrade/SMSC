package io.smsc.validator;

import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.notification.PushType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * The NotificationValidator class is used for providing validation for Notification's
 * pushUrl property.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
public class NotificationValidator implements ConstraintValidator<PushUrlValid, Notification> {

    @Override
    public void initialize(PushUrlValid constraintAnnotation) {
    }

    /**
     * PushUrl cannot be null or empty if pushType is GENERIC
     */
    @Override
    public boolean isValid(Notification notification, ConstraintValidatorContext context) {
        PushType type = notification.getPushType();
        String url = notification.getPushUrl();
        if (url == null || url.isEmpty()) {
            if (type.equals(PushType.GENERIC)) {
                return false;
            }
        }
        return true;
    }
}