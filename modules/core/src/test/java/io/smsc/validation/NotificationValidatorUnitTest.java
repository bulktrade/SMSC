package io.smsc.validation;

import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.notification.PushType;
import io.smsc.validator.NotificationValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.validation.ConstraintValidatorContext;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class NotificationValidatorUnitTest {

    private NotificationValidator notificationValidator;

    @Mock
    private Notification notification;

    @Mock
    private ConstraintValidatorContext context;

    @Before
    public void setUp() throws Exception {
        notificationValidator = new NotificationValidator();
    }

    @Test
    public void testValidNotificationWithNotEmptyPushUrlAndGenericPushType() {
        when(notification.getPushType()).thenReturn(PushType.GENERIC);
        when(notification.getPushUrl()).thenReturn("url");
        boolean isValid = notificationValidator.isValid(notification, context);

        verifyNotificationValidator();

        assertThat(isValid).isEqualTo(true);
    }

    @Test
    public void testValidNotificationWithEmptyPushUrlAndSmppPushType() {
        when(notification.getPushType()).thenReturn(PushType.SMPP);
        when(notification.getPushUrl()).thenReturn("");
        boolean isValid = notificationValidator.isValid(notification, context);

        verifyNotificationValidator();

        assertThat(isValid).isEqualTo(true);
    }

    @Test
    public void testValidNotificationWithNullPushUrlAndSmppPushType() {
        when(notification.getPushType()).thenReturn(PushType.SMPP);
        when(notification.getPushUrl()).thenReturn(null);
        boolean isValid = notificationValidator.isValid(notification, context);

        verifyNotificationValidator();

        assertThat(isValid).isEqualTo(true);
    }

    @Test
    public void testValidNotificationWithEmptyPushUrlAndGenericPushType() {
        when(notification.getPushType()).thenReturn(PushType.GENERIC);
        when(notification.getPushUrl()).thenReturn("");
        boolean isValid = notificationValidator.isValid(notification, context);

        verifyNotificationValidator();

        assertThat(isValid).isEqualTo(false);
    }

    @Test
    public void testValidNotificationWithNullPushUrlAndGenericPushType() {
        when(notification.getPushType()).thenReturn(PushType.GENERIC);
        when(notification.getPushUrl()).thenReturn(null);
        boolean isValid = notificationValidator.isValid(notification, context);

        verifyNotificationValidator();

        assertThat(isValid).isEqualTo(false);
    }

    private void verifyNotificationValidator() {
        verify(notification, times(1)).getPushType();
        verify(notification, times(1)).getPushUrl();
    }
}