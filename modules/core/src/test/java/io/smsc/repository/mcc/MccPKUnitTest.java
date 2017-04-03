package io.smsc.repository.mcc;

import io.smsc.model.customer.Customer;
import io.smsc.model.mcc.MccPK;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class MccPKUnitTest {

    private MccPK mccPK1;
    private MccPK mccPK2;

    @Before
    public void setUp() throws Exception {
        mccPK1 = new MccPK();
        mccPK2 = new MccPK();
        mccPK1.setMcc(0);
        mccPK1.setCode(0);
        mccPK2.setMcc(0);
        mccPK2.setCode(0);
    }

    @Test
    public void testEqualsAndHashcodeSameMccPK() throws Exception {
        assertThat(mccPK1).isEqualTo(mccPK1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualMccPK() throws Exception {
        assertThat(mccPK1).isEqualTo(mccPK2);
    }

    @Test
    public void testEqualsAndHashcodeMccPKAndNull() throws Exception {
        assertThat(mccPK1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeMccPKAndOtherObject() throws Exception {
        assertThat(mccPK1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMccPK1() throws Exception {
        mccPK2.setMcc(1);

        assertThat(mccPK1).isNotEqualTo(mccPK2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualMccPK2() throws Exception {
        mccPK1.setCode(1);

        assertThat(mccPK1).isNotEqualTo(mccPK2);
    }

    @Test
    public void testEqualsAndHashcodeEqualMccInSet() throws Exception {
        Set<MccPK> set = new HashSet<>();
        set.add(mccPK1);
        set.add(mccPK2);

        assertThat(set.size()).isEqualTo(1);
    }
}
