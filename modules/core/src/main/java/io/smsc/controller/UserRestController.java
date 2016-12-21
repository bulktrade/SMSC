package io.smsc.controller;

import io.smsc.model.User;
import io.smsc.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/rest/repository/users")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    protected final Logger log = LoggerFactory.getLogger(UserRestController.class);

    @GetMapping(value = "/findAll",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAll() {
        log.info("get All Users");
        return new ResponseEntity<>(userRepository.getAllWithRolesAndDecryptedPassword(),HttpStatus.OK);
    }

    @GetMapping(value = "/findOne/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getOne(@PathVariable("id") long id) throws IOException {
        log.info("get User with id " + id);
        User user = userRepository.getOneWithRolesAndDecryptedPassword(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/create",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@Valid @RequestBody User user) {
        log.info("create User");
        User created = userRepository.saveOneWithEncryptedPassword(user);
        User newUser = userRepository.getOneWithRolesAndDecryptedPassword(created.getId());
        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/{id}")
                .buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(uriOfNewResource).body(newUser);
    }
}
