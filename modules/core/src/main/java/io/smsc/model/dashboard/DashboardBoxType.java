package io.smsc.model.dashboard;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.smsc.model.BaseEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Specifies DashboardBoxType class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @see     Type
 * @see     Kind
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "DASHBOARD_BOX_TYPE", uniqueConstraints = {@UniqueConstraint(columnNames = {"NAME"}, name = "dashboard_box_type's_unique_name_idx")})
public class DashboardBoxType extends BaseEntity {

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
    private Set<DashboardBox> dashboardBoxes;

    public DashboardBoxType() {
    }

    public DashboardBoxType(DashboardBoxType dashboardBoxType) {
        this(dashboardBoxType.getId(), dashboardBoxType.getName(), dashboardBoxType.getType(), dashboardBoxType.getKind());
    }

    public DashboardBoxType(Long id, String name, Type type, Kind kind) {
        super(id);
        this.name = name;
        this.type = type;
        this.kind = kind;
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
    public String toString() {
        return "DashboardBoxType{" +
                "name='" + name + '\'' +
                ", type=" + type +
                ", kind=" + kind +
                "} " + super.toString();
    }
}
