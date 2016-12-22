package io.smsc.controller;

import io.smsc.model.customer.Customer;
import io.smsc.repository.customer.customer.CustomerRepository;
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
@RequestMapping("/rest/repository/customers")
public class CustomerRestController {

    @Autowired
    private CustomerRepository customerRepository;

    private final Logger log = LoggerFactory.getLogger(CustomerRestController.class);

    @GetMapping(value = "/addUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> addUser(@Param("customerId")long customerId, @Param("userId")long userId, HttpServletResponse response) throws IOException {
        log.info("add user with id = " + userId + " to customer with id = " + customerId);
        try {
            Customer customer = customerRepository.addUser(customerId,userId);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer with id = " + customerId + " or user with id = " + userId + " was not found");
        return null;
    }

    @GetMapping(value = "/removeUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> removeUser(@Param("customerId")long customerId, @Param("userId")long userId, HttpServletResponse response) throws IOException {
        log.info("remove user with id = " + userId + " from customer with id = " + customerId);
        try {
            Customer customer = customerRepository.removeUser(customerId,userId);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer with id = " + customerId + " or user with id = " + userId + " was not found");
        return null;
    }
}
