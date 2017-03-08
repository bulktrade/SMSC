package io.smsc.model.dashboard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies DashboardBox class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @see Dashboard
 * @see DashboardBoxType
 * @see Width
 * @see Height
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "DASHBOARD_BOX")
public class DashboardBox extends BaseEntity {

    @Id
    @SequenceGenerator(name = "dashboard_box_seq", sequenceName = "dashboard_box_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "dashboard_box_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "WIDTH", nullable = false)
    @NotNull(message = "{dashboardBox.width.validation}")
    private Width width;

    @Enumerated(EnumType.STRING)
    @Column(name = "HEIGHT", nullable = false)
    @NotNull(message = "{dashboardBox.height.validation}")
    private Height height;

    // order is reserved keyword in postgreSQL
    @Column(name = "ORDER_NUMBER", nullable = false)
    @NotNull(message = "{dashboardBox.order.validation}")
    private Integer order;

    @Column(name = "NAME", nullable = false)
    @NotEmpty(message = "{dashboardBox.name.validation}")
    private String name;

    @Column(name = "DESCRIPTION", nullable = false)
    @NotEmpty(message = "{dashboardBox.description.validation}")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
    @JoinColumn(name = "DASHBOARD_ID", nullable = false)
    private Dashboard dashboard;

    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
    @JoinColumn(name = "DASHBOARD_BOX_TYPE_ID", nullable = false)
    private DashboardBoxType dashboardBoxType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Width getWidth() {
        return width;
    }

    public void setWidth(Width width) {
        this.width = width;
    }

    public Height getHeight() {
        return height;
    }

    public void setHeight(Height height) {
        this.height = height;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Dashboard getDashboard() {
        return dashboard;
    }

    public void setDashboard(Dashboard dashboard) {
        this.dashboard = dashboard;
    }

    public DashboardBoxType getDashboardBoxType() {
        return dashboardBoxType;
    }

    public void setDashboardBoxType(DashboardBoxType dashboardBoxType) {
        this.dashboardBoxType = dashboardBoxType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DashboardBox that = (DashboardBox) o;

        if (!getId().equals(that.getId())) return false;
        if (getWidth() != that.getWidth()) return false;
        if (getHeight() != that.getHeight()) return false;
        if (!getOrder().equals(that.getOrder())) return false;
        if (!getName().equals(that.getName())) return false;
        return getDescription().equals(that.getDescription());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getWidth());
        result = 31 * result + Objects.hashCode(getHeight());
        result = 31 * result + Objects.hashCode(getOrder());
        result = 31 * result + Objects.hashCode(getName());
        result = 31 * result + Objects.hashCode(getDescription());
        return result;
    }

    @Override
    public String toString() {
        return "id=" + id +
                "width=" + width +
                ", height=" + height +
                ", order=" + order +
                ", name=" + name +
                ", description='" + description + '\'' +
                ", version='" + version + '\'' +
                ", lastModifiedDate='" + lastModifiedDate + '\'' +
                "}";
    }
}
