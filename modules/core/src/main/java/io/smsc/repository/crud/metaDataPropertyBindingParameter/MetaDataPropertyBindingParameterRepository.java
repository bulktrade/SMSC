package io.smsc.repository.crud.metaDataPropertyBindingParameter;

import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "meta-data-property-binding-parameters", path = "meta-data-property-binding-parameters")
@Transactional(readOnly = true)
public interface MetaDataPropertyBindingParameterRepository extends JpaRepository<MetaDataPropertyBindingParameter, Long>, MetaDataPropertyBindingParameterRepositoryCustom {

    @Override
    void delete(Long id);

    @Override
    MetaDataPropertyBindingParameter save(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter);

    @Override
    @EntityGraph(attributePaths = {"combineOperator"})
    MetaDataPropertyBindingParameter findOne(Long id);

    @EntityGraph(attributePaths = {"combineOperator"})
    List<MetaDataPropertyBindingParameter> findAllDistinctByOrderById();
}
