package io.smsc.controller;

import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.crud.metaDataPropertyBindingParameter.MetaDataPropertyBindingParameterRepository;
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

@RestController
@RequestMapping("/rest/repository/meta-data-property-binding-parameters")
public class MetaDataPropertyBindingParameterController {

    @Autowired
    private MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    private final Logger log = LoggerFactory.getLogger(MetaDataPropertyBindingParameterController.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('META_DATA_PROPERRY_BINDING_PARAMETER_CREATE')")
    public ResponseEntity<MetaDataPropertyBindingParameter> create(@Valid @RequestBody MetaDataPropertyBindingParameter metaDataPropertyBindingParameter, HttpServletResponse response) throws IOException {
        log.info("create MetaDataPropertyBindingParameter");
        try {
            MetaDataPropertyBindingParameter created = metaDataPropertyBindingParameterRepository.save(metaDataPropertyBindingParameter);
            MetaDataPropertyBindingParameter newMetaDataPropertyBindingParameter = metaDataPropertyBindingParameterRepository.findOne(created.getId());
            URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("{id}")
                    .buildAndExpand(created.getId()).toUri();
            return ResponseEntity.created(uriOfNewResource).body(newMetaDataPropertyBindingParameter);
        }
        catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_CONFLICT, "Something went wrong");
        return null;
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('META_DATA_PROPERRY_BINDING_PARAMETER_UPDATE')")
    public ResponseEntity<MetaDataPropertyBindingParameter> update(@Valid @RequestBody MetaDataPropertyBindingParameter metaDataPropertyBindingParameter, @PathVariable("id") long id, HttpServletResponse response) throws IOException {
        log.info("update MetaDataPropertyBindingParameter with id " + id);
        try {
            MetaDataPropertyBindingParameter updated = metaDataPropertyBindingParameterRepository.findOne(id);
            updated.setFromProperty(metaDataPropertyBindingParameter.getFromProperty());
            updated.setToProperty(metaDataPropertyBindingParameter.getToProperty());
            updated.setCombineOperator(metaDataPropertyBindingParameter.getCombineOperator());
            updated.setOperator(metaDataPropertyBindingParameter.getOperator());
            if(metaDataPropertyBindingParameter.getCrudMetaFormData() != null) {
                updated.setCrudMetaFormData(metaDataPropertyBindingParameter.getCrudMetaFormData());
            }
            if(metaDataPropertyBindingParameter.getCrudMetaGridData() != null) {
                updated.setCrudMetaGridData(metaDataPropertyBindingParameter.getCrudMetaGridData());
            }
            metaDataPropertyBindingParameterRepository.save(updated);
            return new ResponseEntity<>(metaDataPropertyBindingParameterRepository.getOne(id), HttpStatus.OK);
        }
        catch (NullPointerException ex) {
            ex.printStackTrace();
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "MetaDataPropertyBindingParameter with id = " + id + " was not found");
        return null;
    }
}
