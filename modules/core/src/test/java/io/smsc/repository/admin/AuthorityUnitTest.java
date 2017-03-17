package io.smsc.repository.admin;

import io.smsc.model.admin.Authority;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class AuthorityUnitTest {

    private Authority authority1;
    private Authority authority2;

    @Before
    public void initAuthorities() throws Exception {
        this.authority1 = new Authority();
        this.authority2 = new Authority();
        authority1.setId(1L);
        authority1.setName("NEW_AUTHORITY");
        authority1.setUsers(Collections.emptySet());
        authority1.setGroups(Collections.emptySet());
        authority2.setId(1L);
        authority2.setName("NEW_AUTHORITY");
        authority2.setUsers(Collections.emptySet());
        authority2.setGroups(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameAuthority() throws Exception {
        assertThat(authority1).isEqualTo(authority1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualAuthorities() throws Exception {
        assertThat(authority1).isEqualTo(authority2);
        assertThat(authority1.getUsers()).isEqualTo(authority2.getUsers());
        assertThat(authority1.getGroups()).isEqualTo(authority2.getGroups());
    }

    @Test
    public void testEqualsAndHashcodeAuthorityAndNull() throws Exception {
        assertThat(authority1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeAuthorityAndOtherObject() throws Exception {
        assertThat(authority1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualAuthorities1() throws Exception {
        authority2.setId(2L);

        assertThat(authority1).isNotEqualTo(authority2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualAuthorities2() throws Exception {
        authority2.setName("some name");

        assertThat(authority1).isNotEqualTo(authority2);
    }

    @Test
    public void testEqualsAndHashcodeEqualAuthoritiesInSet() throws Exception {
        Set<Authority> set = new HashSet<>();
        set.add(authority1);
        set.add(authority2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testAuthorityToString() throws Exception {
        assertThat(authority1.toString()).isEqualTo("{id = " + authority1.getId() +
                ", name = '" + authority1.getName() + '\'' +
                ", version = " + authority1.getVersion() +
                ", lastModifiedDate = '" + authority1.getLastModifiedDate() + '\'' +
                "}");
    }
}
