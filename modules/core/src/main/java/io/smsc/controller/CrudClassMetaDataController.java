package io.smsc.controller;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.repository.crud.crudClassMetaData.CrudClassMetaDataRepository;
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

@RestController
@RequestMapping("/rest/repository/crud-class-meta-data")
public class CrudClassMetaDataController {

    @Autowired
    private CrudClassMetaDataRepository crudClassMetaDataRepository;

    private final Logger log = LoggerFactory.getLogger(CrudClassMetaDataController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_CLASS_META_DATA_CREATE')")
    public ResponseEntity<CrudClassMetaData> create(@Valid @RequestBody CrudClassMetaData crudMetaFormData, HttpServletResponse response) throws IOException {
        log.info("create CrudClassMetaData");
        try {
            CrudClassMetaData created = crudClassMetaDataRepository.save(crudMetaFormData);
            CrudClassMetaData newCrudMetaFormData = crudClassMetaDataRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newCrudMetaFormData);
        }
        catch (DataIntegrityViolationException ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "CrudClassMetaData with this className already exists");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('CRUD_CLASS_META_DATA_UPDATE')")
    public ResponseEntity<CrudClassMetaData> update(@Valid @RequestBody CrudClassMetaData crudClassMetaData, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update CrudClassMetaData with id " + id);
        try {
            CrudClassMetaData updated = crudClassMetaDataRepository.findOne(id);
            if(!updated.getClassName().equals(crudClassMetaData.getClassName()) && crudClassMetaDataRepository.findByClassName(crudClassMetaData.getClassName()) != null) {
                response.sendError(HttpServletResponse.SC_CONFLICT, "CrudClassMetaData with this className already exists");
                return null;
            }
            updated.setClassName(crudClassMetaData.getClassName());
            updated.setTitleColumns(crudClassMetaData.getTitleColumns());
            updated.setEditable(crudClassMetaData.getEditable());
            if(crudClassMetaData.getQuery() != null) {
                updated.setQuery(crudClassMetaData.getQuery());
            }
            crudClassMetaDataRepository.save(updated);
            return new ResponseEntity<>(crudClassMetaDataRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "CrudClassMetaData with id = " + id + " was not found");
        return null;
    }
}
