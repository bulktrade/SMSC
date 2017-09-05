package io.smsc.validator;

import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.notification.PushType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotificationValidator implements ConstraintValidator<PushUrlValid, Notification> {

    @Override
    public void initialize(PushUrlValid constraintAnnotation) {
    }

    // Notification is not valid if push type is generic and push url is null or empty
    @Override
    public boolean isValid(Notification notification, ConstraintValidatorContext context) {
        PushType type = notification.getPushType();
        String url = notification.getPushUrl();
        if(url == null || url.isEmpty()) {
            if (type.equals(PushType.GENERIC)){
                return false;
            }
        }
        return true;
    }
}
