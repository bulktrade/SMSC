package io.smsc.repository.gateway.settings.notification;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.settings.limit.Type;
import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.notification.PushType;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class NotificationUnitTest {

    private Notification notification1;
    private Notification notification2;

    @Before
    public void initNotifications() throws Exception {
        this.notification1 = new Notification();
        this.notification2 = new Notification();
        notification1.setId(1L);
        notification1.setPushType(PushType.GENERIC);
        notification1.setPushUrl("push url");
        notification1.setCreatedBy(new User());
        notification1.setLastModifiedBy(new User());
        notification1.setCreatedDate(new Date());
        notification1.setLastModifiedDate(new Date());
        notification1.setVersion(0L);
        notification2.setId(1L);
        notification2.setPushType(PushType.GENERIC);
        notification2.setPushUrl("push url");
        notification2.setCreatedBy(new User());
        notification2.setLastModifiedBy(new User());
        notification2.setCreatedDate(new Date());
        notification2.setLastModifiedDate(new Date());
        notification2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameNotification() throws Exception {
        assertThat(notification1).isEqualTo(notification1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualNotifications() throws Exception {
        assertThat(notification1).isEqualTo(notification2);
    }

    @Test
    public void testEqualsAndHashcodeNotificationAndNull() throws Exception {
        assertThat(notification1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeNotificationAndOtherObject() throws Exception {
        assertThat(notification1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualNotifications1() throws Exception {
        notification2.setId(2L);

        assertThat(notification1).isNotEqualTo(notification2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualNotifications2() throws Exception {
        notification2.setPushType(PushType.SMPP);

        assertThat(notification1).isNotEqualTo(notification2);
    }

    @Test
    public void testEqualsAndHashcodeEqualNotificationsInSet() throws Exception {
        Set<Notification> set = new HashSet<>();
        set.add(notification1);
        set.add(notification2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testNotificationToString() throws Exception {
        assertThat(notification1.toString()).isEqualTo("{id = " + notification1.getId() +
                ", pushType = " + notification1.getPushType() +
                ", pushUrl = '" + notification1.getPushUrl() + '\'' +
                ", version = " + notification1.getVersion() +
                ", createdDate = '" + notification1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + notification1.getLastModifiedDate() + '\'' +
                "}");
    }
}
