package io.smsc.repository.crud.crud_meta_form_data;

import io.smsc.model.crud.CrudMetaFormData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "crud-meta-form-data", path = "crud-meta-form-data")
@Transactional(readOnly = true)
public interface CrudMetaFormDataRepository extends JpaRepository<CrudMetaFormData, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    CrudMetaFormData save(CrudMetaFormData crudMetaGridData);

    @Override
    @Query("SELECT c FROM CrudMetaFormData c LEFT JOIN FETCH c.bindingParameters WHERE c.id=:id")
    CrudMetaFormData findOne(@Param("id") Long id);

    @Override
    @Query("SELECT c FROM CrudMetaFormData c LEFT JOIN FETCH c.bindingParameters ORDER BY c.id")
    List<CrudMetaFormData> findAll();
}
