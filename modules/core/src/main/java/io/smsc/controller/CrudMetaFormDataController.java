package io.smsc.controller;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.repository.crud.crudMetaFormData.CrudMetaFormDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * and updating {@link CrudMetaFormData} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.crud.crudMetaFormData.CrudMetaFormDataRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/crud-meta-form-data")
public class CrudMetaFormDataController {

    @Autowired
    private CrudMetaFormDataRepository crudMetaFormDataRepository;

    private final Logger log = LoggerFactory.getLogger(CrudMetaFormDataController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_META_FORM_DATA_CREATE')")
    public ResponseEntity<CrudMetaFormData> create(@Valid @RequestBody CrudMetaFormData crudMetaFormData, HttpServletResponse response) throws IOException {
        log.info("create CrudMetaFormData");
        try {
            CrudMetaFormData created = crudMetaFormDataRepository.save(crudMetaFormData);
            CrudMetaFormData newCrudMetaFormData = crudMetaFormDataRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newCrudMetaFormData);
        }
        catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Something went wrong");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_META_FORM_DATA_UPDATE')")
    public ResponseEntity<CrudMetaFormData> update(@Valid @RequestBody CrudMetaFormData crudMetaFormData, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update CrudMetaFormData with id " + id);
        try {
            CrudMetaFormData updated = crudMetaFormDataRepository.findOne(id);
            updated.setProperty(crudMetaFormData.getProperty());
            updated.setEditable(crudMetaFormData.getEditable());
            updated.setVisible(crudMetaFormData.getVisible());
            updated.setOrder(crudMetaFormData.getOrder());
            if(crudMetaFormData.getFieldLayoutGridPosition() != null) {
                updated.setFieldLayoutGridPosition(crudMetaFormData.getFieldLayoutGridPosition());
            }
            if(crudMetaFormData.getDecorator() != null) {
                updated.setDecorator(crudMetaFormData.getDecorator());
            }
            if(crudMetaFormData.getCrudClassMetaData() != null) {
                updated.setCrudClassMetaData(crudMetaFormData.getCrudClassMetaData());
            }
            crudMetaFormDataRepository.save(updated);
            return new ResponseEntity<>(crudMetaFormDataRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, " CrudMetaFormData with id = " + id + " was not found");
        return null;
    }
}
