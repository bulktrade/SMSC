package io.smsc.repository.crud.crudMetaGridData;

import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-meta-grid-data", path = "crud-meta-grid-data")
@Transactional(readOnly = true)
public interface CrudMetaGridDataRepository extends JpaRepository<CrudMetaGridData, Long>, CrudMetaGridDataRepositoryCustom {

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    CrudMetaGridData save(@RequestBody CrudMetaGridData crudMetaGridData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    CrudMetaGridData findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    @RestResource(path = "findAll")
    List<CrudMetaGridData> findAllDistinctByOrderById();
}
