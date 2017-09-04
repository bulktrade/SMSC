package io.smsc.repository.gateway.settings;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.settings.Payment;
import io.smsc.model.gateway.settings.Settings;
import io.smsc.model.gateway.settings.limit.Limit;
import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.policy.MessagePolicy;
import io.smsc.model.gateway.settings.policy.MessageType;
import io.smsc.model.gateway.settings.policy.SenderPolicy;
import io.smsc.model.gateway.settings.policy.Type;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class SettingsUnitTest {

    private Settings settings1;
    private Settings settings2;

    @Before
    public void initSettings() throws Exception {
        this.settings1 = new Settings();
        this.settings2 = new Settings();
        settings1.setId(1L);
        settings1.setPayment(Payment.POSTPAID);
        settings1.setDeposit(10.0);
        settings1.setNotification(new Notification());
        settings1.setLimit(new Limit());
        settings1.setMessagePolicy(new MessagePolicy());
        settings1.setSenderPolicy(new SenderPolicy());
        settings1.setCreatedBy(new User());
        settings1.setLastModifiedBy(new User());
        settings1.setCreatedDate(new Date());
        settings1.setLastModifiedDate(new Date());
        settings1.setVersion(0L);
        settings2.setId(1L);
        settings2.setPayment(Payment.POSTPAID);
        settings2.setDeposit(10.0);
        settings2.setNotification(new Notification());
        settings2.setLimit(new Limit());
        settings2.setMessagePolicy(new MessagePolicy());
        settings2.setSenderPolicy(new SenderPolicy());
        settings2.setCreatedBy(new User());
        settings2.setLastModifiedBy(new User());
        settings2.setCreatedDate(new Date());
        settings2.setLastModifiedDate(new Date());
        settings2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameSettings() throws Exception {
        assertThat(settings1).isEqualTo(settings1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualSettings() throws Exception {
        assertThat(settings1).isEqualTo(settings2);
    }

    @Test
    public void testEqualsAndHashcodeSettingsAndNull() throws Exception {
        assertThat(settings1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeSettingsAndOtherObject() throws Exception {
        assertThat(settings1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSettings1() throws Exception {
        settings2.setId(2L);

        assertThat(settings1).isNotEqualTo(settings2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSettings2() throws Exception {
        settings2.setPayment(Payment.PREPAID);

        assertThat(settings1).isNotEqualTo(settings2);
    }

    @Test
    public void testEqualsAndHashcodeEqualSettingsInSet() throws Exception {
        Set<Settings> set = new HashSet<>();
        set.add(settings1);
        set.add(settings2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testSettingsToString() throws Exception {
        assertThat(settings1.toString()).isEqualTo("{id = " + settings1.getId() +
                ", payment = " + settings1.getPayment() +
                ", deposit = " + settings1.getDeposit() +
                ", version = " + settings1.getVersion() +
                ", createdDate = '" + settings1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + settings1.getLastModifiedDate() + '\'' +
                "}");
    }
}
