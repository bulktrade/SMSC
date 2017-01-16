package io.smsc.controller;

import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.repository.crud.crudMetaGridData.CrudMetaGridDataRepository;
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
 * and updating {@link CrudMetaGridData} entities onto specific methods.
 * <p>
 * Methods in this class extend default {@link org.springframework.data.jpa.repository.JpaRepository}
 * methods in {@link io.smsc.repository.crud.crudMetaGridData.CrudMetaGridDataRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RestController
@RequestMapping("/rest/repository/crud-meta-grid-data")
public class CrudMetaGridDataController {

    @Autowired
    private CrudMetaGridDataRepository crudMetaGridDataRepository;

    private final Logger log = LoggerFactory.getLogger(CrudMetaGridDataController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_META_GRID_DATA_CREATE')")
    public ResponseEntity<CrudMetaGridData> create(@Valid @RequestBody CrudMetaGridData crudMetaGridData, HttpServletResponse response) throws IOException {
        log.info("create CrudMetaGridData");
        try {
            CrudMetaGridData created = crudMetaGridDataRepository.save(crudMetaGridData);
            CrudMetaGridData newCrudMetaGridData = crudMetaGridDataRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newCrudMetaGridData);
        }
        catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Something went wrong");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_META_GRID_DATA_UPDATE')")
    public ResponseEntity<CrudMetaGridData> update(@Valid @RequestBody CrudMetaGridData crudMetaFormData, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update CrudMetaGridData with id " + id);
        try {
            CrudMetaGridData updated = crudMetaGridDataRepository.findOne(id);
            updated.setProperty(crudMetaFormData.getProperty());
            updated.setEditable(crudMetaFormData.getEditable());
            updated.setVisible(crudMetaFormData.getVisible());
            updated.setOrder(crudMetaFormData.getOrder());
            updated.setColumnWidth(crudMetaFormData.getColumnWidth());
            if(crudMetaFormData.getBindingParameters() != null) {
                updated.setBindingParameters(crudMetaFormData.getBindingParameters());
            }
            if(crudMetaFormData.getDecorator() != null) {
                updated.setDecorator(crudMetaFormData.getDecorator());
            }
            if(crudMetaFormData.getCrudClassMetaData() != null) {
                updated.setCrudClassMetaData(crudMetaFormData.getCrudClassMetaData());
            }
            crudMetaGridDataRepository.save(updated);
            return new ResponseEntity<>(crudMetaGridDataRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, " CrudMetaGridData with id = " + id + " was not found");
        return null;
    }
}
