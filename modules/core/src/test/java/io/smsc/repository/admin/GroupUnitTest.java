package io.smsc.repository.admin;

import io.smsc.model.admin.Group;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class GroupUnitTest {

    private Group group1;
    private Group group2;

    @Before
    public void initGroups() throws Exception {
        this.group1 = new Group();
        this.group2 = new Group();
        group1.setId(1L);
        group1.setName("NEW_GROUP");
        group1.setUsers(Collections.emptySet());
        group1.setAuthorities(Collections.emptySet());
        group2.setId(1L);
        group2.setName("NEW_GROUP");
        group2.setUsers(Collections.emptySet());
        group2.setAuthorities(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameGroup() throws Exception {
        assertThat(group1).isEqualTo(group1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualGroups1() throws Exception {
        assertThat(group1).isEqualTo(group2);
        assertThat(group1.getUsers()).isEqualTo(group2.getUsers());
        assertThat(group1.getAuthorities()).isEqualTo(group2.getAuthorities());
    }

    @Test
    public void testEqualsAndHashcodeGroupAndNull() throws Exception {
        assertThat(group1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeGroupAndOtherObject() throws Exception {
        assertThat(group1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualGroups1() throws Exception {
        group2.setId(2L);

        assertThat(group1).isNotEqualTo(group2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualGroups2() throws Exception {
        group2.setName("some name");

        assertThat(group1).isNotEqualTo(group2);
    }

    @Test
    public void testEqualsAndHashcodeEqualGroupInSet() throws Exception {
        Set<Group> set = new HashSet<>();
        set.add(group1);
        set.add(group2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testGroupToString() throws Exception {
        assertThat(group1.toString()).isEqualTo("{id = " + group1.getId() +
                ", name = '" + group1.getName() + '\'' +
                ", version = " + group1.getVersion() +
                ", createdDate = '" + group1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + group1.getLastModifiedDate() + '\'' +
                "}");
    }
}
