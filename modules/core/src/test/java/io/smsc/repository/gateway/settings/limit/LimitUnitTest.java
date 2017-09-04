package io.smsc.repository.gateway.settings.limit;

import io.smsc.model.admin.User;
import io.smsc.model.gateway.settings.limit.Limit;
import io.smsc.model.gateway.settings.limit.Type;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class LimitUnitTest {

    private Limit limit1;
    private Limit limit2;

    @Before
    public void initLimits() throws Exception {
        this.limit1 = new Limit();
        this.limit2 = new Limit();
        limit1.setId(1L);
        limit1.setType(Type.DAY);
        limit1.setMessageLimit(10.0);
        limit1.setCreatedBy(new User());
        limit1.setLastModifiedBy(new User());
        limit1.setCreatedDate(new Date());
        limit1.setLastModifiedDate(new Date());
        limit1.setVersion(0L);
        limit2.setId(1L);
        limit2.setType(Type.DAY);
        limit2.setMessageLimit(10.0);
        limit2.setCreatedBy(new User());
        limit2.setLastModifiedBy(new User());
        limit2.setCreatedDate(new Date());
        limit2.setLastModifiedDate(new Date());
        limit2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameLimit() throws Exception {
        assertThat(limit1).isEqualTo(limit1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualLimits() throws Exception {
        assertThat(limit1).isEqualTo(limit2);
    }

    @Test
    public void testEqualsAndHashcodeLimitAndNull() throws Exception {
        assertThat(limit1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeLimitAndOtherObject() throws Exception {
        assertThat(limit1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualLimits1() throws Exception {
        limit2.setId(2L);

        assertThat(limit1).isNotEqualTo(limit2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualLimits2() throws Exception {
        limit2.setType(Type.MILLISECOND);

        assertThat(limit1).isNotEqualTo(limit2);
    }

    @Test
    public void testEqualsAndHashcodeEqualLimitsInSet() throws Exception {
        Set<Limit> set = new HashSet<>();
        set.add(limit1);
        set.add(limit2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testLimitToString() throws Exception {
        assertThat(limit1.toString()).isEqualTo("{id = " + limit1.getId() +
                ", type = " + limit1.getType() +
                ", messageLimit = " + limit1.getMessageLimit() +
                ", version = " + limit1.getVersion() +
                ", createdDate = '" + limit1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + limit1.getLastModifiedDate() + '\'' +
                "}");
    }
}
