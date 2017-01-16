package io.smsc.controller;

import io.smsc.model.Permission;
import io.smsc.repository.permission.PermissionRepository;
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
 * and updating {@link Permission} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.permission.PermissionRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/permissions")
public class PermissionController {

    @Autowired
    private PermissionRepository permissionRepository;

    private final Logger log = LoggerFactory.getLogger(PermissionController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('PERMISSION_CREATE')")
    public ResponseEntity<Permission> create(@Valid @RequestBody Permission permission, HttpServletResponse response) throws IOException {
        log.info("create Permission");
        try {
            Permission created = permissionRepository.save(permission);
            Permission newPermission = permissionRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newPermission);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Permission with this name already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('PERMISSION_UPDATE')")
    public ResponseEntity<Permission> update(@Valid @RequestBody Permission permission, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update Permission with id " + id);
        try {
            Permission updated = permissionRepository.findOne(id);
            if(!updated.getName().equals(permission.getName()) && permissionRepository.findByName(permission.getName()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "Permission with this name already exists");
                return null;
            }
            updated.setName(permission.getName());
            permissionRepository.save(updated);
            return new ResponseEntity<>(permissionRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Permission with id = " + id + " was not found");
        return null;
    }
}
