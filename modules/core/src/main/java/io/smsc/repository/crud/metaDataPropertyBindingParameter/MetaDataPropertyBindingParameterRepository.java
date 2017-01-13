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

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link MetaDataPropertyBindingParameter} entities
 * and exporting them to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "meta-data-property-binding-parameters", path = "meta-data-property-binding-parameters")
@Transactional(readOnly = true)
public interface MetaDataPropertyBindingParameterRepository extends JpaRepository<MetaDataPropertyBindingParameter, Long>{

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    @RestResource(exported = false)
    MetaDataPropertyBindingParameter save(MetaDataPropertyBindingParameter metaDataPropertyBindingParameter);

    @Override
    @EntityGraph(attributePaths = {"operator","combineOperator"})
    MetaDataPropertyBindingParameter findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"operator","combineOperator"})
    Page<MetaDataPropertyBindingParameter> findAll(Pageable pageable);
}
