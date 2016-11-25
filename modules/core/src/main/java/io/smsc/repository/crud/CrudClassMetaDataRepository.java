package io.smsc.repository.crud;

import io.smsc.model.crud.CrudClassMetaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-class-meta-data", path = "crud-class-meta-data")
@Transactional(readOnly = true)
public interface CrudClassMetaDataRepository extends JpaRepository<CrudClassMetaData, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    CrudClassMetaData save(CrudClassMetaData crudClassMetaData);

    @Override
    CrudClassMetaData findOne(Long id);

    @Override
    @Query("SELECT c FROM CrudClassMetaData c ORDER BY c.id")
    List<CrudClassMetaData> findAll();
}
