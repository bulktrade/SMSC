package io.smsc.repository.gateway.settings.policy;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.settings.policy.MessageType;
import io.smsc.model.gateway.settings.policy.SenderPolicy;
import io.smsc.model.gateway.settings.policy.Type;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class SenderPolicyUnitTest {

    private SenderPolicy senderPolicy1;
    private SenderPolicy senderPolicy2;

    @Before
    public void initSenderPolicies() throws Exception {
        this.senderPolicy1 = new SenderPolicy();
        this.senderPolicy2 = new SenderPolicy();
        senderPolicy1.setId(1L);
        senderPolicy1.setMessageType(MessageType.DYN);
        senderPolicy1.setType(Type.APPEND);
        senderPolicy1.setValue("value");
        senderPolicy1.setPolicy("policy");
        senderPolicy1.setCreatedBy(new User());
        senderPolicy1.setLastModifiedBy(new User());
        senderPolicy1.setCreatedDate(new Date());
        senderPolicy1.setLastModifiedDate(new Date());
        senderPolicy1.setVersion(0L);
        senderPolicy2.setId(1L);
        senderPolicy2.setMessageType(MessageType.DYN);
        senderPolicy2.setType(Type.APPEND);
        senderPolicy2.setValue("value");
        senderPolicy2.setPolicy("policy");
        senderPolicy2.setCreatedBy(new User());
        senderPolicy2.setLastModifiedBy(new User());
        senderPolicy2.setCreatedDate(new Date());
        senderPolicy2.setLastModifiedDate(new Date());
        senderPolicy2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameSenderPolicy() throws Exception {
        assertThat(senderPolicy1).isEqualTo(senderPolicy1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualSenderPolicies() throws Exception {
        assertThat(senderPolicy1).isEqualTo(senderPolicy2);
    }

    @Test
    public void testEqualsAndHashcodeSenderPolicyAndNull() throws Exception {
        assertThat(senderPolicy1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeSenderPolicyAndOtherObject() throws Exception {
        assertThat(senderPolicy1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSenderPolicies1() throws Exception {
        senderPolicy2.setId(2L);

        assertThat(senderPolicy1).isNotEqualTo(senderPolicy2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSenderPolicies2() throws Exception {
        senderPolicy2.setType(Type.PREPEND);

        assertThat(senderPolicy1).isNotEqualTo(senderPolicy2);
    }

    @Test
    public void testEqualsAndHashcodeEqualSenderPoliciesInSet() throws Exception {
        Set<SenderPolicy> set = new HashSet<>();
        set.add(senderPolicy1);
        set.add(senderPolicy2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testSenderPolicyToString() throws Exception {
        assertThat(senderPolicy1.toString()).isEqualTo("{id = " + senderPolicy1.getId() +
                ", messageType = " + senderPolicy1.getMessageType() +
                ", type = " + senderPolicy1.getType() +
                ", value = '" + senderPolicy1.getValue() + '\'' +
                ", policy = '" + senderPolicy1.getPolicy() + '\'' +
                ", version = " + senderPolicy1.getVersion() +
                ", createdDate = '" + senderPolicy1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + senderPolicy1.getLastModifiedDate() + '\'' +
                "}");
    }
}
