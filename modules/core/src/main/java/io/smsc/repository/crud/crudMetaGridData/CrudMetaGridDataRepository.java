package io.smsc.repository.crud.crudMetaGridData;

import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link CrudMetaGridData} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "crud-meta-grid-data", path = "crud-meta-grid-data")
@Transactional(readOnly = true)
public interface CrudMetaGridDataRepository extends JpaRepository<CrudMetaGridData, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    CrudMetaGridData save(CrudMetaGridData crudMetaGridData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData", "bindingParameters"})
    CrudMetaGridData findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData", "bindingParameters"})
    Page<CrudMetaGridData> findAll(Pageable pageable);
}
