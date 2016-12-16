package io.smsc.model.dashboard;

import io.smsc.model.BaseEntity;
import io.smsc.model.User;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "DASHBOARD", uniqueConstraints = {@UniqueConstraint(columnNames = {"NAME"}, name = "dashboards_unique_name_user_idx")})
public class Dashboard extends BaseEntity {

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{dashboard.name.validation}")
    private String name;

    @Column(name = "ICON", nullable = false)
    @NotEmpty(message = "{dashboard.icon.validation}")
    private String icon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ACCOUNT", nullable = false)
    private User user;

    @OneToMany(mappedBy = "dashboard", orphanRemoval = true)
    private Set<DashboardBox> dashboardBoxes;

    public Dashboard() {
    }

    public Dashboard(Dashboard dashboard) {
        this(dashboard.getId(),dashboard.getName(),dashboard.getIcon(),dashboard.getUser());
    }

    public Dashboard(Long id, String name, String icon, User user) {
        super(id);
        this.name = name;
        this.icon = icon;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<DashboardBox> getDashboardBoxes() {
        return dashboardBoxes;
    }

    public void setDashboardBoxes(Set<DashboardBox> dashboardBoxes) {
        this.dashboardBoxes = dashboardBoxes;
    }

    public void addDasboardBox(DashboardBox dashboardBox) {
        this.dashboardBoxes.add(dashboardBox);
    }

    public void removeDasboardBox(DashboardBox dashboardBox) {
        this.dashboardBoxes.remove(dashboardBox);
    }

    @Override
    public String toString() {
        return "Dashboard{" +
                "name='" + name + '\'' +
                ", icon='" + icon + '\'' +
                ", dashboardBoxes='" + dashboardBoxes + '\'' +
                "} " + super.toString();
    }
}
