package io.smsc.repository.crud;

import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-meta-grid-data", path = "crud-meta-grid-data")
@Transactional(readOnly = true)
public interface CrudMetaGridDataRepository extends JpaRepository<CrudMetaGridData, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    CrudMetaGridData save(CrudMetaGridData crudMetaGridData);

    @Override
    CrudMetaGridData findOne(Long id);

    @Override
    @Query("SELECT c FROM CrudClassMetaData c ORDER BY c.id")
    List<CrudMetaGridData> findAll();
}
