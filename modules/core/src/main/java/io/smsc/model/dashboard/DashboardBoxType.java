package io.smsc.model.dashboard;

import io.smsc.model.BaseEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Set;

/**
 * Specifies DashboardBoxType class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @see Type
 * @see Kind
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "DASHBOARD_BOX_TYPE", uniqueConstraints = {@UniqueConstraint(columnNames = {"NAME"}, name = "dashboard_box_type's_unique_name_idx")})
public class DashboardBoxType extends BaseEntity {

    @Id
    @SequenceGenerator(name = "dashboard_box_type_seq", sequenceName = "dashboard_box_type_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "dashboard_box_type_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{dashboardBoxType.name.validation}")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{dashboardBoxType.type.validation}")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "KIND", nullable = false)
    @NotNull(message = "{dashboardBoxType.kind.validation}")
    private Kind kind;

    @OneToMany(
            mappedBy = "dashboardBoxType",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    @OrderBy("id asc")
    private Set<DashboardBox> dashboardBoxes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Kind getKind() {
        return kind;
    }

    public void setKind(Kind kind) {
        this.kind = kind;
    }

    public Set<DashboardBox> getDashboardBoxes() {
        return dashboardBoxes;
    }

    public void setDashboardBoxes(Set<DashboardBox> dashboardBoxes) {
        this.dashboardBoxes = dashboardBoxes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DashboardBoxType that = (DashboardBoxType) o;

        if (!getId().equals(that.getId())) return false;
        if (!getName().equals(that.getName())) return false;
        if (getType() != that.getType()) return false;
        return getKind() == that.getKind();
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getName());
        result = 31 * result + Objects.hashCode(getType());
        result = 31 * result + Objects.hashCode(getKind());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", name = '" + name + '\'' +
                ", type = '" + type + '\'' +
                ", kind = '" + kind + '\'' +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
