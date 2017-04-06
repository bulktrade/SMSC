package io.smsc.repository.mcc;


import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.mcc.Mcc;
import io.smsc.model.mcc.Mnc;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class MncUnitTest {

    private Mnc mnc1;
    private Mnc mnc2;

    @Before
    public void setUp() throws Exception {
        mnc1 = new Mnc();
        mnc2 = new Mnc();
        mnc1.setId(1L);
        mnc1.setMnc("1000");
        mnc1.setCarrier("Carrier");
        mnc1.setMcc(new Mcc());
        mnc1.setCreatedBy(new User());
        mnc1.setLastModifiedBy(new User());
        mnc1.setCreatedDate(new Date());
        mnc1.setLastModifiedDate(new Date());
        mnc1.setVersion(0L);
        mnc2.setId(1L);
        mnc2.setMnc("1000");
        mnc2.setCarrier("Carrier");
        mnc2.setMcc(new Mcc());
        mnc2.setCreatedBy(new User());
        mnc2.setLastModifiedBy(new User());
        mnc2.setCreatedDate(new Date());
        mnc2.setLastModifiedDate(new Date());
        mnc2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameMcc() throws Exception {
        assertThat(mnc1).isEqualTo(mnc1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualMcc() throws Exception {
        assertThat(mnc1).isEqualTo(mnc2);
    }

    @Test
    public void testEqualsAndHashcodeMccAndNull() throws Exception {
        assertThat(mnc1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeMccAndOtherObject() throws Exception {
        assertThat(mnc1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc1() throws Exception {
        mnc2.setId(2L);

        assertThat(mnc1).isNotEqualTo(mnc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc2() throws Exception {
        mnc2.setCarrier("new carrier");

        assertThat(mnc1).isNotEqualTo(mnc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc3() throws Exception {
        mnc2.setMnc("1012");

        assertThat(mnc1).isNotEqualTo(mnc2);
    }

    @Test
    public void testEqualsAndHashcodeEqualMccInSet() throws Exception {
        Set<Mnc> set = new HashSet<>();
        set.add(mnc1);
        set.add(mnc2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testMccToString() throws Exception {
        assertThat(mnc1.toString()).isEqualTo("{id = " + mnc1.getId() +
                ", mnc = '" + mnc1.getMnc() + '\'' +
                ", carrier = '" + mnc1.getCarrier() + '\'' +
                ", createdBy = '" + mnc1.getCreatedBy() + '\'' +
                ", lastModifiedBy = '" + mnc1.getLastModifiedBy() + '\'' +
                ", createdDate = '" + mnc1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + mnc1.getLastModifiedDate() + '\'' +
                ", version = " + mnc1.getVersion() +
                "}");
    }
}
