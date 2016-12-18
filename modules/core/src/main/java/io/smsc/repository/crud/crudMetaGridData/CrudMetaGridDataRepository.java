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

@RepositoryRestResource(collectionResourceRel = "crud-meta-grid-data", path = "crud-meta-grid-data")
@Transactional(readOnly = true)
public interface CrudMetaGridDataRepository extends JpaRepository<CrudMetaGridData, Long>, CrudMetaGridDataRepositoryCustom {

    @Override
    void delete(Long id);

    @Override
    CrudMetaGridData save(CrudMetaGridData crudMetaGridData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    CrudMetaGridData findOne(Long id);

    // /rest/repository/crud-meta-grid-data/search/findAll
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    @RestResource(path = "findAll")
    List<CrudMetaGridData> findAllDistinctByOrderById();

    // Prevents GET /crud-meta-grid-data
    @Override
    @RestResource(exported = false)
    Page<CrudMetaGridData> findAll(Pageable pageable);
}
