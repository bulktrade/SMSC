package io.smsc.controller;

import io.smsc.model.User;
import io.smsc.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/rest/repository/users")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(UserRestController.class);

    @GetMapping(value = "/findAll",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getAll() {
        log.info("get All Users");
        return userRepository.getAllWithRolesAndDecryptedPassword();
    }

    @GetMapping(value = "/findOne/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getOne(@PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("get User with id " + id);
        try {
            User user = userRepository.getOneWithRolesAndDecryptedPassword(id);
            String username = user.getUsername();
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + id + " was not found");
        return null;
    }

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@Valid @RequestBody User user, HttpServletResponse response) throws IOException {
        log.info("create User");
        try {
            User created = userRepository.saveOneWithEncryptedPassword(user);
            User newUser = userRepository.getOneWithRolesAndDecryptedPassword(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("findOne/{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newUser);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "User with this username or email already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> update(@Valid @RequestBody User user, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update User with id " + id);
        try {
            User updatedUser = userRepository.getOneWithRolesAndDecryptedPassword(id);
            if(!updatedUser.getUsername().equals(user.getUsername()) && userRepository.getOneByUserNameWithDecryptedPassword(user.getUsername()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "User with this username already exists");
                return null;
            }
            updatedUser.setUsername(user.getUsername());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setFirstname(user.getFirstname());
            updatedUser.setSurname(user.getSurname());
            if(!updatedUser.getEmail().equals(user.getEmail()) && userRepository.getOneByEmailWithDecryptedPassword(user.getEmail()) != null){
                response.sendError(HttpServletResponse.SC_CONFLICT, "User with this email already exists");
                return null;
            }
            updatedUser.setEmail(user.getEmail());
            updatedUser.setActive(user.isActive());
            updatedUser.setBlocked(user.isBlocked());
            userRepository.saveOneWithEncryptedPassword(updatedUser);
            return new ResponseEntity<>(userRepository.getOneWithRolesAndDecryptedPassword(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + id + " was not found");
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("delete User with id = " + id);
        try {
            userRepository.delete(id);
            response.setStatus(204);
        }
        catch (EmptyResultDataAccessException ex) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + id + " was not found");
        }
    }

    @GetMapping(value = "/addRole", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> addRole(@Param("userId")long userId, @Param("roleId")long roleId, HttpServletResponse response) throws IOException {
        log.info("add role with id = " + roleId + " to user with id = " + userId);
        try {
            User user = userRepository.addRole(userId, roleId);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + userId + " or role with id = " + roleId + " was not found");
        return null;
    }

    @GetMapping(value = "/removeRole", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> removeRole(@Param("userId")long userId, @Param("roleId")long roleId, HttpServletResponse response) throws IOException {
        log.info("remove role with id = " + roleId + " from user with id = " + userId);
        try {
            User user = userRepository.removeRole(userId, roleId);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + userId + " or role with id = " + roleId + " was not found");
        return null;
    }
}
