package io.smsc.controller;

import io.smsc.model.Role;
import io.smsc.repository.role.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/rest/repository/roles")
public class RoleRestController {

    @Autowired
    private RoleRepository roleRepository;

    private final Logger log = LoggerFactory.getLogger(RoleRestController.class);

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
