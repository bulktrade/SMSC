package io.smsc.repository.crud.crudMetaGridData;

import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
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

    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    List<CrudMetaGridData> findAllDistinctByOrderById();
}
