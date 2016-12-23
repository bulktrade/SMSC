package io.smsc.controller;

import io.smsc.model.customer.Customer;
import io.smsc.repository.customer.customer.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            Double customer_id = customer.getCustomerId();
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
            Double customer_id = customer.getCustomerId();
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
        catch (NullPointerException ex){
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer with id = " + customerId + " or user with id = " + userId + " was not found");
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("delete Customer with id = " + id);
        try {
            Customer customer = customerRepository.findOne(id);
            for(Customer customer1 : customerRepository.findAll()) {
                if(customer.equals(customer1.getParentCustomer())) {
                    customer1.setParentCustomer(null);
                }
            }
            customerRepository.delete(id);
            response.setStatus(204);
        }
        catch (Exception ex) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Customer with id = " + id + " was not found");
        }
    }
}
