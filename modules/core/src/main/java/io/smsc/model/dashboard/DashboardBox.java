package io.smsc.model.dashboard;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

@Entity
@Table(name = "DASHBOARD_BOX")
public class DashboardBox extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "DASHBOARD_BOX_WIDTH", joinColumns = @JoinColumn(name = "DASHBOARD_BOX_ID"))
    @Column(name = "WIDTH", nullable = false)
    @Embedded
    private Width width;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "DASHBOARD_BOX_HEIGHT", joinColumns = @JoinColumn(name = "DASHBOARD_BOX_ID"))
    @Column(name = "HEIGHT", nullable = false)
    @Embedded
    private Height height;

    @Column(name = "ORDER", nullable = false)
    @NotEmpty(message = "{dashboardBox.order.validation}")
    private Integer order;

    @Column(name = "DESCRIPTION", nullable = false)
    @NotEmpty(message = "{dashboardBox.description.validation}")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="DASHBOARD", nullable = false)
    private Dashboard dashboard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="DASHBOARD_BOX_TYPE", nullable = false)
    private DashboardBoxType dashboardBoxType;

    public DashboardBox() {
    }

    public DashboardBox(Long id, Width width, Height height, Integer order, String description, Dashboard dashboard, DashboardBoxType dashboardBoxType) {
        super(id);
        this.width = width;
        this.height = height;
        this.order = order;
        this.description = description;
        this.dashboard = dashboard;
        this.dashboardBoxType = dashboardBoxType;
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
                ", description='" + description + '\'' +
                ", dashboard=" + dashboard +
                ", dashboardBoxType=" + dashboardBoxType +
                "} " + super.toString();
    }
}
