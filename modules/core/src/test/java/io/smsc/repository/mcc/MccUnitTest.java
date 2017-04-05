package io.smsc.repository.mcc;

import io.smsc.model.mcc.Mcc;
import io.smsc.model.customer.Customer;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class MccUnitTest {

    private Mcc mcc1;
    private Mcc mcc2;

    @Before
    public void setUp() throws Exception {
        mcc1 = new Mcc();
        mcc2 = new Mcc();
        mcc1.setId(1L);
        mcc1.setMcc(276);
        mcc1.setCode(355);
        mcc1.setCountry("Albania");
        mcc2.setId(1L);
        mcc2.setMcc(276);
        mcc2.setCode(355);
        mcc2.setCountry("Albania");
    }

    @Test
    public void testEqualsAndHashcodeSameMcc() throws Exception {
        assertThat(mcc1).isEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualMcc() throws Exception {
        assertThat(mcc1).isEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodeMccAndNull() throws Exception {
        assertThat(mcc1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeMccAndOtherObject() throws Exception {
        assertThat(mcc1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc1() throws Exception {
        mcc2.setId(2L);

        assertThat(mcc1).isNotEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc2() throws Exception {
        mcc2.setMcc(1);

        assertThat(mcc1).isNotEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc3() throws Exception {
        mcc2.setCode(1);

        assertThat(mcc1).isNotEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMcc4() throws Exception {
        mcc2.setCountry("Ukraine");

        assertThat(mcc1).isNotEqualTo(mcc2);
    }

    @Test
    public void testEqualsAndHashcodeEqualMccInSet() throws Exception {
        Set<Mcc> set = new HashSet<>();
        set.add(mcc1);
        set.add(mcc2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testMccToString() throws Exception {
        assertThat(mcc1.toString()).isEqualTo("{id = " + mcc1.getId() +
                ", mcc = " + mcc1.getMcc() +
                ", code = " + mcc1.getCode() +
                ", country = '" + mcc1.getCountry() + '\'' +
                ", createdBy = '" + mcc1.getCreatedBy() + '\'' +
                ", lastModifiedBy = '" + mcc1.getLastModifiedBy() + '\'' +
                ", createdDate = '" + mcc1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + mcc1.getLastModifiedDate() + '\'' +
                ", version = " + mcc1.getVersion() +
                "}");
    }
}
