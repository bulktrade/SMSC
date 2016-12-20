package io.smsc.repository.crud.crudMetaFormData;

import io.smsc.model.crud.CrudMetaFormData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-meta-form-data", path = "crud-meta-form-data")
@Transactional(readOnly = true)
public interface CrudMetaFormDataRepository extends JpaRepository<CrudMetaFormData, Long>, CrudMetaFormDataRepositoryCustom {

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    CrudMetaFormData save(CrudMetaFormData crudMetaGridData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    CrudMetaFormData findOne(Long id);

    // /rest/repository/crud-meta-form-data/search/findAll
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    @RestResource(path = "findAll")
    List<CrudMetaFormData> findAllDistinctByOrderById();

    // Prevents GET /crud-meta-form-data
    @Override
    @RestResource(exported = false)
    Page<CrudMetaFormData> findAll(Pageable pageable);
}
