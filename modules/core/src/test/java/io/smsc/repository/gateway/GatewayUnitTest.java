package io.smsc.repository.gateway;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.Gateway;
import io.smsc.model.gateway.Type;
import io.smsc.model.gateway.settings.Payment;
import io.smsc.model.gateway.settings.Settings;
import io.smsc.model.gateway.settings.policy.SenderPolicy;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class GatewayUnitTest {

    private Gateway gateway1;
    private Gateway gateway2;

    @Before
    public void initGateway() throws Exception {
        this.gateway1 = new Gateway();
        this.gateway2 = new Gateway();
        gateway1.setId(1L);
        gateway1.setName("name");
        gateway1.setActive(true);
        gateway1.setSettings(new Settings());
        gateway1.setType(Type.GENERIC);
        gateway1.setCreatedBy(new User());
        gateway1.setLastModifiedBy(new User());
        gateway1.setCreatedDate(new Date());
        gateway1.setLastModifiedDate(new Date());
        gateway1.setVersion(0L);
        gateway2.setId(1L);
        gateway2.setName("name");
        gateway2.setActive(true);
        gateway2.setSettings(new Settings());
        gateway2.setType(Type.GENERIC);
        gateway2.setCreatedBy(new User());
        gateway2.setLastModifiedBy(new User());
        gateway2.setCreatedDate(new Date());
        gateway2.setLastModifiedDate(new Date());
        gateway2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameGateway() throws Exception {
        assertThat(gateway1).isEqualTo(gateway1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualGateway() throws Exception {
        assertThat(gateway1).isEqualTo(gateway2);
    }

    @Test
    public void testEqualsAndHashcodeGatewayAndNull() throws Exception {
        assertThat(gateway1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeGatewayAndOtherObject() throws Exception {
        assertThat(gateway1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualGateway1() throws Exception {
        gateway2.setId(2L);

        assertThat(gateway1).isNotEqualTo(gateway2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualGateway2() throws Exception {
        gateway2.setType(Type.SMPP);

        assertThat(gateway1).isNotEqualTo(gateway2);
    }

    @Test
    public void testEqualsAndHashcodeEqualGatewayInSet() throws Exception {
        Set<Gateway> set = new HashSet<>();
        set.add(gateway1);
        set.add(gateway2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testGatewayToString() throws Exception {
        assertThat(gateway1.toString()).isEqualTo("{id = " + gateway1.getId() +
                ", name = '" + gateway1.getName() + '\'' +
                ", active = " + gateway1.isActive() +
                ", type = " + gateway1.getType() +
                ", version = " + gateway1.getVersion() +
                ", createdDate = '" + gateway1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + gateway1.getLastModifiedDate() + '\'' +
                "}");
    }
}
