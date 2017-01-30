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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;

/**
 * The UserRestController class is used for mapping HTTP requests concerning {@link User} entities
 * onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.user.UserRepository}.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    /**
     * Method to get all {@link io.smsc.model.User} entities from database.
     * <p>
     * This method extends default {@link UserRepository#findAll()} method
     *
     * @return list with {@link io.smsc.model.User} entities
     */
    @GetMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    public List<User> getAll() {
        log.info("get All Users");
        return userRepository.getAllWithRolesAndDecryptedPassword();
    }

    /**
     * Method to find specific {@link io.smsc.model.User} in database.
     * <p>
     * This method extends default
     * {@link io.smsc.repository.user.UserRepository#findOne(Long)} method.
     *
     * @param  id          long value which identifies {@link io.smsc.model.User} in database
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @return             {@link io.smsc.model.User} entity
     * @throws IOException on input error
     */
    @GetMapping(value = "/findOne/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    public ResponseEntity<User> getOne(@PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("get User with id " + id);
        try {
            User user = userRepository.getOneWithRolesAndDecryptedPassword(id);
            user.getUsername();
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "User with id = " + id + " was not found");
        return null;
    }

    /**
     * Method to create and save {@link io.smsc.model.User} in database.
     * <p>
     * This method extends default
     * {@link io.smsc.repository.user.UserRepository#save(User)} method.
     *
     * @param  user        valid {@link io.smsc.model.User} entity
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @return             created {@link io.smsc.model.User} entity
     * @throws IOException on input error
     */
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_CREATE')")
    public ResponseEntity<User> create(@Valid @RequestBody User user, HttpServletResponse response) throws IOException {
        log.info("create User");
        try {
            if(user.getUsername().matches("^[Rr][Oo][Ll][Ee]_?")){
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Username cannot start with 'ROLE'");
                return null;
            }
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

    /**
     * Method to update specific {@link io.smsc.model.User} in database.
     * <p>
     * This method extends default
     * {@link io.smsc.repository.user.UserRepository#save(User)} method.
     *
     * @param  user        valid {@link io.smsc.model.User} entity
     * @param  id          long value which identifies {@link io.smsc.model.User} in database
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @return             updated {@link io.smsc.model.User} entity
     * @throws IOException on input error
     */
    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_UPDATE')")
    public ResponseEntity<User> update(@Valid @RequestBody User user, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update User with id " + id);
        try {
            User updatedUser = userRepository.getOneWithRolesAndDecryptedPassword(id);
            if(!updatedUser.getUsername().equals(user.getUsername()) && userRepository.getOneByUserNameWithDecryptedPassword(user.getUsername()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "User with this username already exists");
                return null;
            }
            if(user.getUsername().matches("^[Rr][Oo][Ll][Ee]_?")){
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Username cannot start with 'ROLE'");
                return null;
            }
            updatedUser.setUsername(user.getUsername());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setFirstname(user.getFirstname());
            updatedUser.setSurname(user.getSurname());
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

    /**
     * Method to remove specific {@link io.smsc.model.User} from database.
     * <p>
     * This method extends default
     * {@link io.smsc.repository.user.UserRepository#delete(Long)} method.
     *
     * @param  id          long value which identifies {@link io.smsc.model.User} in database
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @throws IOException on input error
     */
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_DELETE')")
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

    /**
     * Method to add specific {@link io.smsc.model.Role} to specific {@link io.smsc.model.User}.
     *
     * @param  userId      long value which identifies {@link io.smsc.model.User} in database
     * @param  roleId      long value which identifies {@link io.smsc.model.Role} in database
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @return             updated {@link io.smsc.model.User} entity
     * @throws IOException on input error
     */
    @GetMapping(value = "/addRole", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> addRole(@Param("userId") long userId, @Param("roleId") long roleId, HttpServletResponse response) throws IOException {
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

    /**
     * Method to remove specific {@link io.smsc.model.Role} from specific {@link io.smsc.model.User}.
     *
     * @param  userId      long value which identifies {@link io.smsc.model.User} in database
     * @param  roleId      long value which identifies {@link io.smsc.model.Role} in database
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     *                     functionality in sending a response
     * @return             updated {@link io.smsc.model.User} entity
     * @throws IOException on input error
     */
    @GetMapping(value = "/removeRole", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> removeRole(@Param("userId") long userId, @Param("roleId") long roleId, HttpServletResponse response) throws IOException {
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
