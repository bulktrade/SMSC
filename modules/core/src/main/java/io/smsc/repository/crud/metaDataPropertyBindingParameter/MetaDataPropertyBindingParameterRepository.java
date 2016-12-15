package io.smsc.repository.crud.metaDataPropertyBindingParameter;

import io.smsc.model.crud.MetaDataPropertyBindingParameter;
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

@RepositoryRestResource(collectionResourceRel = "meta-data-property-binding-parameters", path = "meta-data-property-binding-parameters")
@Transactional(readOnly = true)
public interface MetaDataPropertyBindingParameterRepository extends JpaRepository<MetaDataPropertyBindingParameter, Long>, MetaDataPropertyBindingParameterRepositoryCustom {

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    MetaDataPropertyBindingParameter save(@RequestBody MetaDataPropertyBindingParameter metaDataPropertyBindingParameter);

    @Override
    @EntityGraph(attributePaths = {"combineOperator"})
    MetaDataPropertyBindingParameter findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"combineOperator"})
    @RestResource(path = "findAll")
    List<MetaDataPropertyBindingParameter> findAllDistinctByOrderById();
}
