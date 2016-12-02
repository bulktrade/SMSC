package io.smsc.repository.crud.metaDataPropertyBindingParameter;

import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "meta_data_property_binding_parameter", path = "meta_data_property_binding_parameter")
@Transactional(readOnly = true)
public interface MetaDataPropertyBindingParameterRepository extends JpaRepository<MetaDataPropertyBindingParameter, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    MetaDataPropertyBindingParameter save(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter);

    @Override
    @Query("SELECT m FROM MetaDataPropertyBindingParameter m JOIN FETCH m.operator WHERE m.id=:id")
    MetaDataPropertyBindingParameter findOne(@Param("id") Long id);

    @Override
    @Query("SELECT m FROM MetaDataPropertyBindingParameter m JOIN FETCH m.operator ORDER BY m.id")
    List<MetaDataPropertyBindingParameter> findAll();
}
