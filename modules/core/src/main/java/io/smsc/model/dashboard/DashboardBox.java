package io.smsc.model.dashboard;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    public DashboardBox() {
    }

    public DashboardBox(DashboardBox dashboardBox) {
        this(dashboardBox.getId(), dashboardBox.getWidth(), dashboardBox.getHeight(), dashboardBox.getOrder(), dashboardBox.getName(),
                dashboardBox.getDescription(), dashboardBox.getDashboard(), dashboardBox.getDashboardBoxType());
    }

    public DashboardBox(Long id, Width width, Height height, Integer order, String name, String description, Dashboard dashboard, DashboardBoxType dashboardBoxType) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.order = order;
        this.name = name;
        this.description = description;
        this.dashboard = dashboard;
        this.dashboardBoxType = dashboardBoxType;
    }

    @JsonIgnore
    public boolean isNew() {
        return (getId() == null);
    }

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
    public String toString() {
        return "DashboardBox{" +
                "width=" + width +
                ", height=" + height +
                ", order=" + order +
                ", name=" + name +
                ", description='" + description + '\'' +
                "} " + super.toString();
    }
}
