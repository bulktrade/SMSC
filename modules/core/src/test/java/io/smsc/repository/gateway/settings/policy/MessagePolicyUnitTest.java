package io.smsc.repository.gateway.settings.policy;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.settings.policy.MessagePolicy;
import io.smsc.model.gateway.settings.policy.MessageType;
import io.smsc.model.gateway.settings.policy.Type;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class MessagePolicyUnitTest {
    
    private MessagePolicy messagePolicy1;
    private MessagePolicy messagePolicy2;

    @Before
    public void initMessagePolicies() throws Exception {
        this.messagePolicy1 = new MessagePolicy();
        this.messagePolicy2 = new MessagePolicy();
        messagePolicy1.setId(1L);
        messagePolicy1.setMessageType(MessageType.DYN);
        messagePolicy1.setType(Type.APPEND);
        messagePolicy1.setValue("value");
        messagePolicy1.setPolicy("policy");
        messagePolicy1.setCreatedBy(new User());
        messagePolicy1.setLastModifiedBy(new User());
        messagePolicy1.setCreatedDate(new Date());
        messagePolicy1.setLastModifiedDate(new Date());
        messagePolicy1.setVersion(0L);
        messagePolicy2.setId(1L);
        messagePolicy2.setMessageType(MessageType.DYN);
        messagePolicy2.setType(Type.APPEND);
        messagePolicy2.setValue("value");
        messagePolicy2.setPolicy("policy");
        messagePolicy2.setCreatedBy(new User());
        messagePolicy2.setLastModifiedBy(new User());
        messagePolicy2.setCreatedDate(new Date());
        messagePolicy2.setLastModifiedDate(new Date());
        messagePolicy2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameMessagePolicy() throws Exception {
        assertThat(messagePolicy1).isEqualTo(messagePolicy1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualMessagePolicies() throws Exception {
        assertThat(messagePolicy1).isEqualTo(messagePolicy2);
    }

    @Test
    public void testEqualsAndHashcodeMessagePolicyAndNull() throws Exception {
        assertThat(messagePolicy1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeMessagePolicyAndOtherObject() throws Exception {
        assertThat(messagePolicy1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMessagePolicies1() throws Exception {
        messagePolicy2.setId(2L);

        assertThat(messagePolicy1).isNotEqualTo(messagePolicy2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMessagePolicies2() throws Exception {
        messagePolicy2.setType(Type.PREPEND);

        assertThat(messagePolicy1).isNotEqualTo(messagePolicy2);
    }

    @Test
    public void testEqualsAndHashcodeEqualMessagePoliciesInSet() throws Exception {
        Set<MessagePolicy> set = new HashSet<>();
        set.add(messagePolicy1);
        set.add(messagePolicy2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testMessagePolicyToString() throws Exception {
        assertThat(messagePolicy1.toString()).isEqualTo("{id = " + messagePolicy1.getId() +
                ", messageType = " + messagePolicy1.getMessageType() +
                ", type = " + messagePolicy1.getType() +
                ", value = '" + messagePolicy1.getValue() + '\'' +
                ", policy = '" + messagePolicy1.getPolicy() + '\'' +
                ", version = " + messagePolicy1.getVersion() +
                ", createdDate = '" + messagePolicy1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + messagePolicy1.getLastModifiedDate() + '\'' +
                "}");
    }
}
