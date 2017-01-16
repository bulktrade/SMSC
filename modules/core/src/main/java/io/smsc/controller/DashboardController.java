package io.smsc.controller;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
 * The DashboardBoxTypeController class is used for mapping HTTP requests for creating
 * and updating {@link Dashboard} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.dashboard.dashboard.DashboardRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/dashboards")
public class DashboardController {

    @Autowired
    private DashboardRepository dashboardRepository;

    private final Logger log = LoggerFactory.getLogger(DashboardController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_CREATE')")
    public ResponseEntity<Dashboard> create(@Valid @RequestBody Dashboard dashboard, HttpServletResponse response) throws IOException {
        log.info("create Dashboard");
        try {
            Dashboard created = dashboardRepository.save(dashboard);
            Dashboard newDashboard = dashboardRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newDashboard);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Dashboard with this name already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_UPDATE')")
    public ResponseEntity<Dashboard> update(@Valid @RequestBody Dashboard dashboard, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update Dashboard with id " + id);
        try {
            Dashboard updated = dashboardRepository.findOne(id);
            if(!updated.getName().equals(dashboard.getName()) && dashboardRepository.findByName(dashboard.getName()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "Dashboard with this name already exists");
                return null;
            }
            updated.setName(dashboard.getName());
            updated.setIcon(dashboard.getIcon());
            updated.setUser(dashboard.getUser());
            dashboardRepository.save(updated);
            return new ResponseEntity<>(dashboardRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Dashboard with id = " + id + " was not found");
        return null;
    }
}
