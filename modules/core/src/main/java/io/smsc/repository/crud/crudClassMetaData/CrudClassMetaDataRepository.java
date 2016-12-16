package io.smsc.repository.crud.crudClassMetaData;

import io.smsc.model.crud.CrudClassMetaData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-class-meta-data", path = "crud-class-meta-data")
@Transactional(readOnly = true)
public interface CrudClassMetaDataRepository extends JpaRepository<CrudClassMetaData, Long> {

    @Override
    void delete(Long id);

    @Override
    CrudClassMetaData save(CrudClassMetaData crudClassMetaData);

    @Override
    CrudClassMetaData findOne(Long id);

    // /rest/repository/crud-class-meta-data/search/findAll
    @RestResource(path = "findAll")
    List<CrudClassMetaData> findAllDistinctByOrderById();

    // Prevents GET /crud-class-meta-data
    @Override
    @RestResource(exported = false)
    Page<CrudClassMetaData> findAll(Pageable pageable);
}
