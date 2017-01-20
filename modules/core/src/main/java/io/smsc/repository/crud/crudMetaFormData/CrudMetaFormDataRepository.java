package io.smsc.repository.crud.crudMetaFormData;

import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.projections.CrudMetaFormDataProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link CrudMetaFormData} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "crud-meta-form-data", path = "crud-meta-form-data", excerptProjection = CrudMetaFormDataProjection.class)
@Transactional(readOnly = true)
public interface CrudMetaFormDataRepository extends JpaRepository<CrudMetaFormData, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    CrudMetaFormData save(CrudMetaFormData crudMetaFormData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData", "bindingParameters"})
    CrudMetaFormData findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData", "bindingParameters"})
    Page<CrudMetaFormData> findAll(Pageable pageable);

}
