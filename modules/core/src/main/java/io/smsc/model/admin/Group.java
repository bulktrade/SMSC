package io.smsc.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import io.smsc.model.acl.AclSid;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Entity
@Table(name = "GROUP")
public class Group extends BaseEntity {

    @Id
    @SequenceGenerator(name = "group_seq", sequenceName = "group_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "group_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "GROUP_NAME", nullable = false)
    @NotEmpty(message = "{group.name.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{group.name.pattern.validation}")
    private String groupName;

    @ManyToMany(cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            targetEntity = User.class)
    @JoinTable(
            name = "USER_GROUP",
            joinColumns = @JoinColumn(name = "GROUP_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<User> users;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "group")
    private AclSid aclSid;

    @JsonIgnore
    public boolean isNew() {
        return getId() == null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public AclSid getAclSid() {
        return aclSid;
    }

    public void setAclSid(AclSid aclSid) {
        this.aclSid = aclSid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Group group = (Group) o;

        if (!getId().equals(group.getId())) return false;
        return getGroupName().equals(group.getGroupName());
    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + getGroupName().hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                "} " + super.toString();
    }
}
