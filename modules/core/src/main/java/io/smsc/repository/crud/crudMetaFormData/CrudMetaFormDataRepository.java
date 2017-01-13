package io.smsc.repository.crud.crudMetaFormData;

import io.smsc.model.crud.CrudMetaFormData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link CrudMetaFormData} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "crud-meta-form-data", path = "crud-meta-form-data")
@Transactional(readOnly = true)
public interface CrudMetaFormDataRepository extends JpaRepository<CrudMetaFormData, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    @RestResource(exported = false)
    CrudMetaFormData save(CrudMetaFormData crudMetaFormData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    CrudMetaFormData findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    Page<CrudMetaFormData> findAll(Pageable pageable);

}
