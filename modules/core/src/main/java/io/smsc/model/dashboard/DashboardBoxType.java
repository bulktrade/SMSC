package io.smsc.model.dashboard;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "DASHBOARD_BOX_TYPE", uniqueConstraints = {@UniqueConstraint(columnNames = {"NAME"}, name = "dashboard_box_type's_unique_name_idx")})
public class DashboardBoxType extends BaseEntity {

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{dashboardBoxType.name.validation}")
    private String name;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Kind kind;

    @OneToMany(mappedBy = "dashboardBoxType", fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<DashboardBox> dashboardBoxes;

    public DashboardBoxType() {
    }

    public DashboardBoxType(DashboardBoxType dashboardBoxType) {
        this(dashboardBoxType.getId(),dashboardBoxType.getName(),dashboardBoxType.getType(),dashboardBoxType.getKind());
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
