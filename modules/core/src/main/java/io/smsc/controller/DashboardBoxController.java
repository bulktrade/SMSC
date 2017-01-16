package io.smsc.controller;

import io.smsc.model.dashboard.DashboardBox;
import io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

/**
 * The DashboardBoxController class is used for mapping HTTP requests for creating
 * and updating {@link DashboardBox} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/dashboard-boxes")
public class DashboardBoxController {

    @Autowired
    private DashboardBoxRepository dashboardBoxRepository;

    private final Logger log = LoggerFactory.getLogger(DashboardBoxController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_BOX_CREATE')")
    public ResponseEntity<DashboardBox> create(@Valid @RequestBody DashboardBox dashboardBox, HttpServletResponse response) throws IOException {
        log.info("create DashboardBox");
        try {
            DashboardBox created = dashboardBoxRepository.save(dashboardBox);
            DashboardBox newDashboardBox = dashboardBoxRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newDashboardBox);
        }
        catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Something went wrong");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_BOX_UPDATE')")
    public ResponseEntity<DashboardBox> update(@Valid @RequestBody DashboardBox dashboardBox, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update DashboardBox with id " + id);
        try {
            DashboardBox updated = dashboardBoxRepository.findOne(id);
            updated.setName(dashboardBox.getName());
            updated.setDescription(dashboardBox.getDescription());
            updated.setOrder(dashboardBox.getOrder());
            updated.setWidth(dashboardBox.getWidth());
            updated.setHeight(dashboardBox.getHeight());
            updated.setDashboard(dashboardBox.getDashboard());
            updated.setDashboardBoxType(dashboardBox.getDashboardBoxType());
            dashboardBoxRepository.save(updated);
            return new ResponseEntity<>(dashboardBoxRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "DashboardBox with id = " + id + " was not found");
        return null;
    }
}
