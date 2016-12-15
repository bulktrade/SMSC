package io.smsc.repository.crud.crudClassMetaData;

import io.smsc.model.crud.CrudClassMetaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-class-meta-data", path = "crud-class-meta-data")
@Transactional(readOnly = true)
public interface CrudClassMetaDataRepository extends JpaRepository<CrudClassMetaData, Long> {

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    CrudClassMetaData save(@RequestBody CrudClassMetaData crudClassMetaData);

    @Override
    CrudClassMetaData findOne(@Param("id") Long id);

    @RestResource(path = "findAll")
    List<CrudClassMetaData> findAllDistinctByOrderById();
}
