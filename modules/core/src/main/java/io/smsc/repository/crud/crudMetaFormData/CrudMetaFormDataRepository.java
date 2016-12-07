package io.smsc.repository.crud.crudMetaFormData;

import io.smsc.model.crud.CrudMetaFormData;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-meta-form-data", path = "crud-meta-form-data")
@Transactional(readOnly = true)
public interface CrudMetaFormDataRepository extends JpaRepository<CrudMetaFormData, Long>, CrudMetaFormDataRepositoryCustom {

    @Override
    void delete(Long id);

    @Override
    CrudMetaFormData save(CrudMetaFormData crudMetaGridData);

    @Override
    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    CrudMetaFormData findOne(Long id);

    @EntityGraph(attributePaths = {"crudClassMetaData","bindingParameters"})
    List<CrudMetaFormData> findAllDistinctByOrderById();
}
