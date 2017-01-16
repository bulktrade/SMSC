package io.smsc.controller;

import io.smsc.model.customer.CustomerContact;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
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
 * The CrudMetaFormDataController class is used for mapping HTTP requests for creating
 * and updating {@link CustomerContact} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.customer.customerContact.CustomerContactRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/customer-contacts")
public class CustomerContactController {

    @Autowired
    private CustomerContactRepository customerContactRepository;

    private final Logger log = LoggerFactory.getLogger(CustomerContactController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CUSTOMER_CONTACT_CREATE')")
    public ResponseEntity<CustomerContact> create(@Valid @RequestBody CustomerContact customerContact, HttpServletResponse response) throws IOException {
        log.info("create CustomerContact");
        try {
            CustomerContact created = customerContactRepository.save(customerContact);
            CustomerContact newCustomerContact = customerContactRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newCustomerContact);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "CustomerContact with this email address already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CUSTOMER_CONTACT_UPDATE')")
    public ResponseEntity<CustomerContact> update(@Valid @RequestBody CustomerContact customerContact, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update CustomerContact with id " + id);
        try {
            CustomerContact updated = customerContactRepository.findOne(id);
            if(!updated.getEmailAddress().equals(customerContact.getEmailAddress()) && customerContactRepository.findByEmailAddress(customerContact.getEmailAddress()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "CustomerContact with this email address already exists");
                return null;
            }
            updated.setFirstname(customerContact.getFirstname());
            updated.setSurname(customerContact.getSurname());
            updated.setPhone(customerContact.getPhone());
            updated.setMobilePhone(customerContact.getMobilePhone());
            updated.setFax(customerContact.getFax());
            updated.setEmailAddress(customerContact.getEmailAddress());
            updated.setType(customerContact.getType());
            updated.setSalutation(customerContact.getSalutation());
            if(customerContact.getCustomer() != null) {
                updated.setCustomer(customerContact.getCustomer());
            }
            customerContactRepository.save(updated);
            return new ResponseEntity<>(customerContactRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "CustomerContact with id = " + id + " was not found");
        return null;
    }
}
