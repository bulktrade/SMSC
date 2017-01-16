package io.smsc.controller;

import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository;
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
 * and updating {@link DashboardBoxType} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/dashboard-box-types")
public class DashboardBoxTypeController {

    @Autowired
    private DashboardBoxTypeRepository dashboardBoxTypeRepository;

    private final Logger log = LoggerFactory.getLogger(DashboardBoxTypeController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_BOX_TYPE_CREATE')")
    public ResponseEntity<DashboardBoxType> create(@Valid @RequestBody DashboardBoxType dashboardBoxType, HttpServletResponse response) throws IOException {
        log.info("create DashboardBoxType");
        try {
            DashboardBoxType created = dashboardBoxTypeRepository.save(dashboardBoxType);
            DashboardBoxType newDashboardBoxType = dashboardBoxTypeRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newDashboardBoxType);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "DashboardBoxType with this name already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('DASHBOARD_BOX_TYPE_UPDATE')")
    public ResponseEntity<DashboardBoxType> update(@Valid @RequestBody DashboardBoxType dashboardBoxType, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update Dashboard with id " + id);
        try {
            DashboardBoxType updated = dashboardBoxTypeRepository.findOne(id);
            if(!updated.getName().equals(dashboardBoxType.getName()) && dashboardBoxTypeRepository.findByName(dashboardBoxType.getName()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "DashboardBoxType with this name already exists");
                return null;
            }
            updated.setName(dashboardBoxType.getName());
            updated.setType(dashboardBoxType.getType());
            updated.setKind(dashboardBoxType.getKind());
            dashboardBoxTypeRepository.save(updated);
            return new ResponseEntity<>(dashboardBoxTypeRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "DashboardBoxType with id = " + id + " was not found");
        return null;
    }
}
