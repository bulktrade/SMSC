package io.smsc.controller;

import io.smsc.model.Role;
import io.smsc.repository.role.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.query.Param;
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
 * The RoleRestController class is used for mapping HTTP requests for creating and
 * updating {@link Role} entities and for adding and removing {@link io.smsc.model.Permission}
 * from {@link Role} onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.role.RoleRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    private final Logger log = LoggerFactory.getLogger(RoleController.class);

    /**
     * Method to add specific {@link io.smsc.model.Permission} to specific {@link Role}
     *
     * @param  roleId       long value which identifies {@link io.smsc.model.Role} in database
     * @param  permissionId long value which identifies {@link io.smsc.model.Permission} in database
     * @param  response     the {@link HttpServletResponse} to provide HTTP-specific
     *                      functionality in sending a response
     * @return              updated {@link io.smsc.model.Role} entity
     * @throws IOException  on input error
     */
    @GetMapping(value = "/addPermission", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Role> addPermission(@Param("roleId")long roleId, @Param("permissionId")long permissionId, HttpServletResponse response) throws IOException {
        log.info("add permission with id = " + permissionId + " to role with id = " + roleId);
        try {
            Role role = roleRepository.addPermission(roleId,permissionId);
            return new ResponseEntity<>(role, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Role with id = " + roleId + " or permission with id = " + permissionId + " was not found");
        return null;
    }

    /**
     * Method to remove specific {@link io.smsc.model.Permission} from specific {@link Role}
     *
     * @param  roleId       long value which identifies {@link io.smsc.model.Role} in database
     * @param  permissionId long value which identifies {@link io.smsc.model.Permission} in database
     * @param  response     the {@link HttpServletResponse} to provide HTTP-specific
     *                      functionality in sending a response
     * @return              updated {@link io.smsc.model.Role} entity
     * @throws IOException  on input error
     */
    @GetMapping(value = "/removePermission", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Role> removePermission(@Param("roleId")long roleId, @Param("permissionId")long permissionId, HttpServletResponse response) throws IOException {
        log.info("remove permission with id = " + permissionId + " from role with id = " + roleId);
        try {
            Role role = roleRepository.removePermission(roleId,permissionId);
            return new ResponseEntity<>(role, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Role with id = " + roleId + " or permission with id = " + permissionId + " was not found");
        return null;
    }
}
