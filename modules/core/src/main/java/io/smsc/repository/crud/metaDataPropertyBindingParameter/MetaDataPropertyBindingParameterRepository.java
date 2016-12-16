package io.smsc.repository.crud.metaDataPropertyBindingParameter;

import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "meta-data-property-binding-parameters", path = "meta-data-property-binding-parameters")
@Transactional(readOnly = true)
public interface MetaDataPropertyBindingParameterRepository extends JpaRepository<MetaDataPropertyBindingParameter, Long>{

    @Override
    void delete(Long id);

    @Override
    MetaDataPropertyBindingParameter save(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter);

    @Override
    @EntityGraph(attributePaths = {"operator","combineOperator"})
    MetaDataPropertyBindingParameter findOne(Long id);

    // /rest/repository/meta-data-property-binding-parameters/search/findAll
    @EntityGraph(attributePaths = {"operator","combineOperator"})
    @RestResource(path = "findAll")
    List<MetaDataPropertyBindingParameter> findAllDistinctByOrderById();

    // Prevents GET /meta-data-property-binding-parameters
    @Override
    @RestResource(exported = false)
    Page<MetaDataPropertyBindingParameter> findAll(Pageable pageable);
}
